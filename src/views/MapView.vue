<template>
    <div class="container mt-5">
        <h1 class="text-center mb-4">地图应用</h1>
        <div class="row justify-content-center">
            <div class="col-md-6">
                <!-- 输入框用于搜索地点 -->
                <div class="mb-3">
                    <input type="text" class="form-control" v-model="searchQuery" placeholder="输入你感兴趣的地点" />
                </div>
                <div class="d-flex justify-content-center">
                    <button @click="searchLocation" class="btn btn-primary" :disabled="isLoading">搜索</button>
                </div>
            </div>
        </div>

        <!-- 加载地图状态 -->
        <div v-if="isLoading" class="text-center mt-4">
            <p>地图加载中...</p>
        </div>

        <!-- 显示错误信息 -->
        <div v-if="errorMessage" class="text-center mt-4 alert alert-danger">
            <p>{{ errorMessage }}</p>
        </div>

        <!-- Mapbox 地图容器 -->
        <div v-if="!isLoading" id="map" class="map-container"></div>

        <!-- 显示导航按钮 -->
        <div v-if="showDirections" class="mt-4 text-center">
            <h3>从 {{ start }} 到 {{ destination }} 的导航</h3>
            <button @click="getDirections" class="btn btn-secondary">获取路线</button>
        </div>

        <!-- 显示路线信息 -->
        <div v-if="routeInfo" class="mt-4 text-center">
            <p><strong>距离:</strong> {{ routeInfo.distance }} 米</p>
            <p><strong>预估时间:</strong> {{ routeInfo.duration }} 分钟</p>
        </div>
    </div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import axios from 'axios';

export default {
    name: 'MapView',
    data() {
        return {
            searchQuery: '',
            map: null,
            isLoading: false,
            errorMessage: '',
            start: null,
            destination: null,
            routeInfo: null,
            showDirections: false,
        };
    },
    mounted() {
        this.initializeMap();
    },
    methods: {
        // 初始化 Mapbox 地图
        initializeMap() {
            // 使用你提供的 Mapbox Token
            mapboxgl.accessToken = 'pk.eyJ1IjoiamlheXVhbmNoZW4iLCJhIjoiY20yNjB2dGJmMDUzOTJtcHZkcmFxczM3eCJ9.5-OtCLUJcB8-mWvEanj-_Q';
            this.map = new mapboxgl.Map({
                container: 'map', // 地图容器 ID
                style: 'mapbox://styles/mapbox/streets-v11', // 地图样式
                center: [0, 0], // 地图初始中心
                zoom: 2, // 地图初始缩放级别
            });

            // 为地图添加导航控件
            this.map.addControl(new mapboxgl.NavigationControl());
        },
        // 搜索地点并将地图居中显示搜索结果
        async searchLocation() {
            if (!this.searchQuery) {
                this.errorMessage = '请输入一个地点名称。';
                return;
            }

            this.isLoading = true;
            this.errorMessage = '';

            try {
                const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.searchQuery}.json`, {
                    params: {
                        access_token: mapboxgl.accessToken,
                    },
                });

                const coordinates = response.data.features[0].center;
                const placeName = response.data.features[0].place_name;

                // 将地图居中到搜索结果的位置
                this.map.flyTo({ center: coordinates, zoom: 12 });

                // 设置导航的起始和目标地点
                if (!this.start) {
                    this.start = placeName;
                } else {
                    this.destination = placeName;
                    this.showDirections = true;
                }
            } catch (error) {
                this.errorMessage = '搜索地点时出错，请重试。';
                console.error(error);
            } finally {
                this.isLoading = false;
            }
        },
        // 获取两点之间的导航路线
        async getDirections() {
            if (!this.start || !this.destination) return;

            const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${this.start};${this.destination}`;
            try {
                const response = await axios.get(url, {
                    params: {
                        access_token: mapboxgl.accessToken,
                    },
                });

                const route = response.data.routes[0];
                this.routeInfo = {
                    distance: route.distance,
                    duration: route.duration / 60, // 将秒数转换为分钟
                };

                // 在地图上显示路线
                const routeCoordinates = route.geometry.coordinates;
                const routeGeoJSON = {
                    type: 'Feature',
                    geometry: {
                        type: 'LineString',
                        coordinates: routeCoordinates,
                    },
                };

                this.map.addLayer({
                    id: 'route',
                    type: 'line',
                    source: {
                        type: 'geojson',
                        data: routeGeoJSON,
                    },
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'round',
                    },
                    paint: {
                        'line-color': '#3887be',
                        'line-width': 5,
                    },
                });
            } catch (error) {
                this.errorMessage = '获取路线时出错，请重试。';
                console.error(error);
            }
        },
    },
};
</script>

<style scoped>
.map-container {
    width: 100%;
    height: 400px;
}

.mt-5 {
    margin-top: 3rem;
}

.mb-3 {
    margin-bottom: 1rem;
}
</style>