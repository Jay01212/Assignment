<template>
    <div class="map-container">
        <div class="search-bar" v-if="!showDirectionsInput">
            <input type="text" v-model="searchQuery" @keyup.enter="searchLocation" placeholder="搜索感兴趣的地点" />
            <button @click="searchLocation">搜索</button>
        </div>
        <div v-if="showDirectionsInput" class="directions-panel">
            <button class="back-button" @click="resetSearch">&larr; 返回</button>
            <div class="directions-input">
                <input type="text" v-model="startLocation" placeholder="起点" @keyup.enter="setStartLocation" />
                <input type="text" v-model="endLocation" placeholder="终点" @keyup.enter="setEndLocation" />
                <button @click="getRoute">获取路线</button>
            </div>
        </div>
        <div id="map"></div>
        <div class="info-container" v-if="routeInfo">
            <h2>路线信息</h2>
            <p>起点：{{ startLocationName }}</p>
            <p>终点：{{ endLocationName }}</p>
            <div class="route-info">
                <p>预计行驶时间：{{ routeInfo.duration }}</p>
                <p>总距离：{{ routeInfo.distance }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import mapboxSdk from '@mapbox/mapbox-sdk';
import MapboxDirections from '@mapbox/mapbox-sdk/services/directions';

export default {
    name: 'MapView',
    data() {
        return {
            map: null,
            searchQuery: '',
            startLocation: '',
            endLocation: '',
            startCoords: null,
            endCoords: null,
            startLocationName: '',
            endLocationName: '',
            directionsClient: null,
            routeInfo: null,
            showDirectionsInput: false,
        };
    },
    async mounted() {
        await this.initializeMap();
    },
    methods: {
        async initializeMap() {
            mapboxgl.accessToken = 'pk.eyJ1IjoiamlheXVhbmNoZW4iLCJhIjoiY20yNjB2dGJmMDUzOTJtcHZkcmFxczM3eCJ9.5-OtCLUJcB8-mWvEanj-_Q';

            this.map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [144.9631, -37.8136], // Melbourne coordinates
                zoom: 12,
            });

            await new Promise(resolve => this.map.on('load', resolve));

            this.map.addControl(new mapboxgl.NavigationControl(), 'top-right');

            const mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
            this.directionsClient = MapboxDirections(mapboxClient);

            this.map.on('click', this.handleMapClick);
        },
        async searchLocation() {
            try {
                const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(this.searchQuery)}.json?access_token=${mapboxgl.accessToken}&country=AU`);
                const data = await response.json();
                if (data.features && data.features.length > 0) {
                    const [lng, lat] = data.features[0].center;
                    this.map.flyTo({ center: [lng, lat], zoom: 14 });
                    this.addMarker([lng, lat]);
                    this.showDirectionsInput = true;
                    this.endLocation = data.features[0].place_name;
                    this.endCoords = [lng, lat];
                } else {
                    this.showToast('没有找到该地点，请重试。');
                }
            } catch (error) {
                console.error('搜索地点时出错:', error);
                this.showToast('搜索地点时出错，请重试。');
            }
        },
        addMarker(coords) {
            new mapboxgl.Marker()
                .setLngLat(coords)
                .addTo(this.map);
        },
        async setStartLocation() {
            const coords = await this.geocodeLocation(this.startLocation);
            if (coords) {
                this.startCoords = coords;
                this.startLocationName = this.startLocation;
                this.addMarker(coords);
            }
        },
        async setEndLocation() {
            const coords = await this.geocodeLocation(this.endLocation);
            if (coords) {
                this.endCoords = coords;
                this.endLocationName = this.endLocation;
                this.addMarker(coords);
            }
        },
        async geocodeLocation(location) {
            try {
                const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${mapboxgl.accessToken}&country=AU`);
                const data = await response.json();
                if (data.features && data.features.length > 0) {
                    return data.features[0].center;
                } else {
                    this.showToast('没有找到该地点，请重试。');
                    return null;
                }
            } catch (error) {
                console.error('地理编码出错:', error);
                this.showToast('地理编码出错，请重试。');
                return null;
            }
        },
        async getRoute() {
            if (!this.startCoords || !this.endCoords) {
                this.showToast('请设置起点和终点！');
                return;
            }

            try {
                this.removeExistingRoute();

                const response = await this.directionsClient.getDirections({
                    profile: 'driving-traffic',
                    geometries: 'geojson',
                    waypoints: [
                        { coordinates: this.startCoords },
                        { coordinates: this.endCoords },
                    ],
                }).send();

                if (response.body.routes.length === 0) {
                    this.showToast('未找到可用的路线，请重试。');
                    return;
                }

                const route = response.body.routes[0];

                this.map.addSource('route', {
                    type: 'geojson',
                    data: {
                        type: 'Feature',
                        properties: {},
                        geometry: route.geometry
                    }
                });

                this.map.addLayer({
                    id: 'route',
                    type: 'line',
                    source: 'route',
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    paint: {
                        'line-color': '#3887be',
                        'line-width': 5,
                        'line-opacity': 0.75
                    }
                });

                const bounds = new mapboxgl.LngLatBounds()
                    .extend(this.startCoords)
                    .extend(this.endCoords);

                this.map.fitBounds(bounds, { padding: 100 });

                this.routeInfo = {
                    duration: this.formatDuration(route.duration),
                    distance: this.formatDistance(route.distance),
                };

            } catch (error) {
                console.error('获取路线时出错:', error);
                this.showToast('获取路线时出错，请重试。');
            }
        },
        removeExistingRoute() {
            if (this.map.getLayer('route')) {
                this.map.removeLayer('route');
            }
            if (this.map.getSource('route')) {
                this.map.removeSource('route');
            }
        },
        formatDuration(seconds) {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            return `${hours}小时 ${minutes}分钟`;
        },
        formatDistance(meters) {
            return `${(meters / 1000).toFixed(2)} 公里`;
        },
        handleMapClick(e) {
            const [lng, lat] = [e.lngLat.lng, e.lngLat.lat];
            this.addMarker([lng, lat]);
            this.reverseGeocode([lng, lat]);
        },
        async reverseGeocode(coords) {
            const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${coords[0]},${coords[1]}.json?access_token=${mapboxgl.accessToken}`);
            const data = await response.json();
            if (data.features && data.features.length > 0) {
                const placeName = data.features[0].place_name;
                if (!this.startLocation) {
                    this.startLocation = placeName;
                    this.startCoords = coords;
                } else {
                    this.endLocation = placeName;
                    this.endCoords = coords;
                }
                this.showDirectionsInput = true;
            }
        },
        showToast(message) {
            alert(message); // 您可以替换为更友好的toast通知
        },
        resetSearch() {
            this.showDirectionsInput = false;
            this.searchQuery = '';
            this.startLocation = '';
            this.endLocation = '';
            this.startCoords = null;
            this.endCoords = null;
            this.startLocationName = '';
            this.endLocationName = '';
            this.routeInfo = null;
            this.removeExistingRoute();
            this.map.setZoom(12);
            this.map.setCenter([144.9631, -37.8136]); // Reset to Melbourne
        }
    },
};
</script>

<style scoped>
.map-container {
    position: relative;
    width: 100%;
    height: calc(100vh - 60px);
}

#map {
    width: 100%;
    height: 100%;
}

.search-bar,
.directions-panel {
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    z-index: 1;
    background-color: white;
    padding: 10px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.search-bar {
    display: flex;
    gap: 10px;
}

.directions-panel {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.directions-input {
    display: flex;
    gap: 10px;
}

.search-bar input,
.directions-input input {
    flex-grow: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.info-container {
    position: absolute;
    bottom: 40px;
    left: 10px;
    background-color: white;
    padding: 15px;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    z-index: 1;
    max-width: 300px;
}

button {
    padding: 10px 15px;
    background-color: #3887be;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    white-space: nowrap;
}

button:hover {
    background-color: #285f8a;
}

.back-button {
    align-self: flex-start;
    background-color: #f0f0f0;
    color: #333;
}

.back-button:hover {
    background-color: #e0e0e0;
}

.route-info {
    margin-top: 10px;
    font-size: 0.9em;
}

/* Mapbox控件样式 */
:deep(.mapboxgl-ctrl-bottom-left) {
    display: none !important;
}

:deep(.mapboxgl-ctrl-bottom-right) {
    bottom: 10px;
    right: 10px;
}

:deep(.mapboxgl-ctrl-attrib) {
    background: rgba(255, 255, 255, 0.7);
    padding: 0 5px;
    border-radius: 3px 3px 0 0;
    font-size: 10px;
}
</style>