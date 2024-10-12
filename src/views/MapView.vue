<template>
    <div class="map-container">
        <div class="search-bar">
            <input type="text" v-model="startLocation" class="form-control" placeholder="设置起点"
                @keyup.enter="setStartLocation" />
            <input type="text" v-model="endLocation" class="form-control" placeholder="设置终点"
                @keyup.enter="setEndLocation" />
            <button class="btn btn-primary" @click="getRoute">获取路线</button>
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
            geocoder: null,
            startLocation: '',
            endLocation: '',
            startCoords: [144.9631, -37.8136], // 默认起点：墨尔本的坐标
            endCoords: null,
            startLocationName: '墨尔本',
            endLocationName: '',
            directionsClient: null,
            routeInfo: null,
        };
    },
    async mounted() {
        await this.initializeMap();
    },
    methods: {
        async initializeMap() {
            mapboxgl.accessToken = 'pk.eyJ1IjoiamlheXVhbmNoZW4iLCJhIjoiY20yNjB2dGJmMDUzOTJtcHZkcmFxczM3eCJ9.5-OtCLUJcB8-mWvEanj-_Q'; // 请替换为您的实际token

            this.map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v11',
                center: this.startCoords,
                zoom: 12,
            });

            await new Promise(resolve => this.map.on('load', resolve));

            // 确保地图加载完成后再添加控件
            this.map.addControl(new mapboxgl.NavigationControl(), 'top-right');

            const mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
            this.directionsClient = MapboxDirections(mapboxClient);

            this.map.on('click', this.handleMapClick);

            // 添加起点标记
            new mapboxgl.Marker({ color: '#3887be' })
                .setLngLat(this.startCoords)
                .addTo(this.map);
        },
        async setStartLocation() {
            const coords = await this.geocodeLocation(this.startLocation);
            if (coords) {
                this.startCoords = coords;
                this.startLocationName = this.startLocation;
                this.updateMap();
            }
        },
        async setEndLocation() {
            const coords = await this.geocodeLocation(this.endLocation);
            if (coords) {
                this.endCoords = coords;
                this.endLocationName = this.endLocation;
                this.updateMap();
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
        updateMap() {
            // 清除之前的标记和路线
            this.map.getSource('start') && this.map.removeLayer('start') && this.map.removeSource('start');
            this.map.getSource('end') && this.map.removeLayer('end') && this.map.removeSource('end');
            this.map.getSource('route') && this.map.removeLayer('route') && this.map.removeSource('route');

            // 添加起点标记
            this.map.addSource('start', {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: this.startCoords
                    }
                }
            });
            this.map.addLayer({
                id: 'start',
                type: 'circle',
                source: 'start',
                paint: {
                    'circle-radius': 10,
                    'circle-color': '#3887be'
                }
            });

            // 如果有终点，添加终点标记
            if (this.endCoords) {
                this.map.addSource('end', {
                    type: 'geojson',
                    data: {
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: this.endCoords
                        }
                    }
                });
                this.map.addLayer({
                    id: 'end',
                    type: 'circle',
                    source: 'end',
                    paint: {
                        'circle-radius': 10,
                        'circle-color': '#f30'
                    }
                });

                // 调整地图视图以包含起点和终点
                const bounds = new mapboxgl.LngLatBounds()
                    .extend(this.startCoords)
                    .extend(this.endCoords);
                this.map.fitBounds(bounds, { padding: 100 });
            } else {
                // 如果只有起点，将地图中心设置为起点
                this.map.flyTo({
                    center: this.startCoords,
                    zoom: 12
                });
            }
        },
        async getRoute() {
            if (!this.endCoords || !this.directionsClient) {
                this.showToast('请设置终点并确保方向服务已初始化！');
                return;
            }

            try {
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
        formatDuration(seconds) {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            return `${hours}小时 ${minutes}分钟`;
        },
        formatDistance(meters) {
            return `${(meters / 1000).toFixed(2)} 公里`;
        },
        handleMapClick(e) {
            if (!this.endCoords) {
                this.endCoords = [e.lngLat.lng, e.lngLat.lat];
                this.reverseGeocode(this.endCoords);
            } else {
                this.startCoords = [e.lngLat.lng, e.lngLat.lat];
                this.reverseGeocode(this.startCoords, true);
            }
            this.updateMap();
        },
        async reverseGeocode(coords, isStart = false) {
            const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${coords[0]},${coords[1]}.json?access_token=${mapboxgl.accessToken}`);
            const data = await response.json();
            if (data.features && data.features.length > 0) {
                if (isStart) {
                    this.startLocationName = data.features[0].place_name;
                    this.startLocation = data.features[0].place_name;
                } else {
                    this.endLocationName = data.features[0].place_name;
                    this.endLocation = data.features[0].place_name;
                }
            } else {
                if (isStart) {
                    this.startLocationName = '未知地点';
                    this.startLocation = '未知地点';
                } else {
                    this.endLocationName = '未知地点';
                    this.endLocation = '未知地点';
                }
            }
        },
        showToast(message) {
            alert(message); // 您可以替换为更友好的toast通知
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

.search-bar {
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    z-index: 1;
    display: flex;
    gap: 10px;
}

.search-bar input {
    flex-grow: 1;
}

.info-container {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    background-color: white;
    padding: 15px;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    z-index: 1;
    text-align: center;
}

h2 {
    margin: 0 0 10px 0;
    font-size: 1.2em;
}

button {
    padding: 10px 15px;
    background-color: #3887be;
    color: white;
    border: none;
    cursor: pointer;
}

button:hover {
    background-color: #285f8a;
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