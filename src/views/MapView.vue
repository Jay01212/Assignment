<template>
    <div class="map-container">
        <!-- 顶部搜索框 -->
        <div class="search-bar">
            <input type="text" v-model="searchLocation" placeholder="在此处搜索地点" />
            <button @click="searchLocationHandler">搜索</button> <!-- 新增搜索按钮 -->
        </div>

        <!-- 地图容器 -->
        <div id="map"></div>

        <!-- 地点信息和路线 -->
        <div class="info-container" v-if="destinationName">
            <h2>选择的地点: {{ destinationName }}</h2>
            <button @click="getRoute">获取路线</button>
        </div>
    </div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxSdk from '@mapbox/mapbox-sdk';

export default {
    name: 'MapView',
    data() {
        return {
            map: null,
            geocoder: null, // 新增 geocoder 属性
            searchLocation: '', // 用户输入的搜索地点
            destinationCoords: null, // 目的地坐标
            destinationName: '', // 选择的地点名称
            startCoords: [144.9631, -37.8136], // 默认出发地点：墨尔本的坐标
        };
    },
    mounted() {
        // 设置 Mapbox 访问 token
        mapboxgl.accessToken = 'pk.eyJ1IjoiamlheXVhbmNoZW4iLCJhIjoiY20yNjB2dGJmMDUzOTJtcHZkcmFxczM3eCJ9.5-OtCLUJcB8-mWvEanj-_Q'; // 替换为你的 Mapbox token

        // 初始化地图
        this.map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: this.startCoords,
            zoom: 12,
        });

        // 添加缩放控件
        this.map.addControl(new mapboxgl.NavigationControl());

        // 添加 Geocoder 控件用于搜索地点
        this.geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl,
            marker: true,
            placeholder: '在此处搜索地点',
            bbox: [144.5, -38.0, 145.5, -37.5], // 限制搜索区域
            countries: 'AU', // 限制搜索国家
        });

        // 将 Geocoder 添加到地图
        this.map.addControl(this.geocoder); // 使用 this.geocoder

        // 监听搜索结果
        this.geocoder.on('result', (e) => {
            const coordinates = e.result.geometry.coordinates;
            this.destinationCoords = coordinates; // 更新目的地坐标
            this.destinationName = e.result.text; // 更新目的地名称
            this.map.flyTo({
                center: coordinates,
                zoom: 14,
            });

            // 添加标记到地图
            new mapboxgl.Marker()
                .setLngLat(coordinates)
                .addTo(this.map);
        });
    },
    methods: {
        async searchLocationHandler() {
            if (!this.searchLocation) {
                alert('请输入一个地点！');
                return;
            }
            // 使用 Geocoder 搜索用户输入的地点
            this.geocoder.query(this.searchLocation, (err, data) => {
                if (data && data.features.length) {
                    const coordinates = data.features[0].geometry.coordinates;
                    this.destinationCoords = coordinates; // 更新目的地坐标
                    this.destinationName = data.features[0].place_name; // 更新目的地名称
                    this.map.flyTo({
                        center: coordinates,
                        zoom: 14,
                    });

                    // 添加标记到地图
                    new mapboxgl.Marker()
                        .setLngLat(coordinates)
                        .addTo(this.map);
                } else {
                    alert('没有找到该地点，请重试。');
                }
            });
        },

        async getRoute() {
            if (!this.destinationCoords) {
                alert('请选择一个目的地！');
                return;
            }

            // 使用 Mapbox SDK 进行路线规划
            const mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
            const directionsClient = mapboxClient.directions;

            try {
                // 获取从用户选择的出发地到目的地的路线
                const response = await directionsClient
                    .getDirections({
                        waypoints: [
                            { coordinates: this.startCoords }, // 起点
                            { coordinates: this.destinationCoords }, // 终点
                        ],
                        profile: 'driving', // 导航类型
                        geometries: 'geojson',
                    })
                    .send();

                const route = response.body.routes[0].geometry;

                // 添加路线到地图
                this.map.addLayer({
                    id: 'route',
                    type: 'line',
                    source: {
                        type: 'geojson',
                        data: {
                            type: 'Feature',
                            properties: {},
                            geometry: route,
                        },
                    },
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'round',
                    },
                    paint: {
                        'line-color': '#3887be',
                        'line-width': 5,
                        'line-opacity': 0.75,
                    },
                });

                // 缩放地图以适应路线
                const bounds = route.coordinates.reduce(function (bounds, coord) {
                    return bounds.extend(coord);
                }, new mapboxgl.LngLatBounds(route.coordinates[0], route.coordinates[0]));

                this.map.fitBounds(bounds, {
                    padding: 20,
                });
            } catch (error) {
                console.error('获取路线时出错:', error);
                alert('获取路线时出错，请重试。');
            }
        },
    },
};
</script>

<style scoped>
.map-container {
    width: 100%;
    height: 100vh;
    position: relative;
}

.search-bar {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    display: flex;
    /* 使用 flexbox */
}

.search-bar input {
    margin-right: 5px;
    /* 输入框与按钮之间的间距 */
}

#map {
    width: 100%;
    height: 100%;
}

.info-container {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: white;
    padding: 15px;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    z-index: 1;
}

h2 {
    margin: 0 0 10px 0;
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
