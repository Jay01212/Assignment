<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <!-- 顶部搜索框 -->
                <div class="search-bar mb-3">
                    <input type="text" v-model="searchLocation" class="form-control" placeholder="在此处搜索地点"
                        @keyup.enter="searchLocationHandler" />
                    <button class="btn btn-primary" @click="searchLocationHandler">搜索</button>
                </div>
            </div>
        </div>

        <!-- 地图容器 -->
        <div id="map" class="col-12" style="height: 80vh;"></div>

        <!-- 地点信息和路线 -->
        <div class="info-container" v-if="destinationName">
            <h2>{{ destinationName }}</h2>
            <button class="btn btn-secondary" @click="getRoute">获取路线</button>
        </div>
    </div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxSdk from '@mapbox/mapbox-sdk/services/directions';

export default {
    name: 'MapView',
    data() {
        return {
            map: null,
            geocoder: null,
            searchLocation: '',
            destinationCoords: null,
            destinationName: '',
            startCoords: [144.9631, -37.8136], // 默认出发地点：墨尔本的坐标
            directionsClient: null,
        };
    },
    mounted() {
        mapboxgl.accessToken = 'pk.eyJ1IjoiamlheXVhbmNoZW4iLCJhIjoiY20yNjB2dGJmMDUzOTJtcHZkcmFxczM3eCJ9.5-OtCLUJcB8-mWvEanj-_Q';

        this.map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: this.startCoords,
            zoom: 12,
        });

        this.map.addControl(new mapboxgl.NavigationControl());

        this.geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl,
            marker: false,
            placeholder: '在此处搜索地点',
            bbox: [144.5, -38.0, 145.5, -37.5],
            countries: 'AU',
        });

        // 将 geocoder 添加到地图
        this.map.addControl(this.geocoder);

        // 直接为 geocoder 添加 result 事件监听器
        this.geocoder.on('result', this.handleGeocoderResult);

        // 初始化 directionsClient
        this.directionsClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
    },
    methods: {
        handleGeocoderResult(e) {
            const coordinates = e.result.geometry.coordinates;
            this.destinationCoords = coordinates;
            this.destinationName = e.result.place_name;
            this.searchLocation = e.result.place_name;
            this.updateMap(coordinates);
        },
        updateMap(coordinates) {
            this.map.flyTo({
                center: coordinates,
                zoom: 14,
            });

            // 移除之前的标记（如果有）
            const existingMarker = this.map.getLayer('destination-marker');
            if (existingMarker) {
                this.map.removeLayer('destination-marker');
                this.map.removeSource('destination-marker');
            }

            // 添加新的标记
            this.map.addSource('destination-marker', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: [{
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: coordinates
                        }
                    }]
                }
            });

            this.map.addLayer({
                id: 'destination-marker',
                type: 'circle',
                source: 'destination-marker',
                paint: {
                    'circle-radius': 10,
                    'circle-color': '#ff0000'
                }
            });
        },
        async searchLocationHandler() {
            if (!this.searchLocation) {
                alert('请输入一个地点！');
                return;
            }
            const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(this.searchLocation)}.json?access_token=${mapboxgl.accessToken}&country=AU`);
            const data = await response.json();

            if (data.features && data.features.length > 0) {
                const result = data.features[0];
                this.handleGeocoderResult({ result });
            } else {
                alert('没有找到该地点，请重试。');
            }
        },
        async getRoute() {
            if (!this.destinationCoords) {
                alert('请选择一个目的地！');
                return;
            }

            try {
                const response = await this.directionsClient.getDirections({
                    profile: 'driving-traffic',
                    geometries: 'geojson',
                    waypoints: [
                        { coordinates: this.startCoords },
                        { coordinates: this.destinationCoords },
                    ],
                }).send();

                if (response.body.routes.length === 0) {
                    alert('未找到可用的路线，请重试。');
                    return;
                }

                const route = response.body.routes[0].geometry;

                // 移除之前的路线（如果有）
                if (this.map.getSource('route')) {
                    this.map.removeLayer('route');
                    this.map.removeSource('route');
                }

                this.map.addSource('route', {
                    type: 'geojson',
                    data: {
                        type: 'Feature',
                        properties: {},
                        geometry: route
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

                const bounds = new mapboxgl.LngLatBounds(
                    this.startCoords,
                    this.destinationCoords
                );

                route.coordinates.forEach((coord) => {
                    bounds.extend(coord);
                });

                this.map.fitBounds(bounds, {
                    padding: 50
                });

            } catch (error) {
                console.error('获取路线时出错:', error);
                alert('获取路线时出错，请重试。');
            }
        }
    },
};
</script>

<style scoped>
#map {
    width: 100%;
    height: 80vh;
}

.search-bar {
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    z-index: 1;
    display: flex;
}

.search-bar input {
    flex-grow: 1;
    margin-right: 10px;
}

.info-container {
    position: fixed;
    bottom: 20px;
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
</style>