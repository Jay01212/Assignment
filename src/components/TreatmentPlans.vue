<template>
    <div class="treatment-plans">
        <h2>治疗计划</h2>
        <div class="mb-3">
            <input v-model="search" class="form-control" placeholder="搜索...">
        </div>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th @click="sort('id')">ID</th>
                    <th @click="sort('patientName')">患者姓名</th>
                    <th @click="sort('therapist')">治疗师</th>
                    <th @click="sort('startDate')">开始日期</th>
                    <th @click="sort('status')">状态</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="plan in paginatedPlans" :key="plan.id">
                    <td>{{ plan.id }}</td>
                    <td>{{ plan.patientName }}</td>
                    <td>{{ plan.therapist }}</td>
                    <td>{{ plan.startDate }}</td>
                    <td>{{ plan.status }}</td>
                </tr>
            </tbody>
        </table>
        <nav>
            <ul class="pagination">
                <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: page === currentPage }">
                    <a class="page-link" href="#" @click.prevent="currentPage = page">{{ page }}</a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
    name: 'TreatmentPlans',
    setup() {
        const plans = ref([
            { id: 1, patientName: '张三', therapist: '李四', startDate: '2023-01-01', status: '进行中' },
            { id: 2, patientName: '王五', therapist: '赵六', startDate: '2023-02-15', status: '已完成' },
            // Add more mock data here
        ]);

        const search = ref('');
        const currentPage = ref(1);
        const itemsPerPage = 10;
        const sortKey = ref('id');
        const sortOrder = ref('asc');

        const filteredPlans = computed(() => {
            return plans.value.filter(plan =>
                Object.values(plan).some(value =>
                    value.toString().toLowerCase().includes(search.value.toLowerCase())
                )
            );
        });

        const sortedPlans = computed(() => {
            return [...filteredPlans.value].sort((a, b) => {
                let modifier = sortOrder.value === 'asc' ? 1 : -1;
                if (a[sortKey.value] < b[sortKey.value]) return -1 * modifier;
                if (a[sortKey.value] > b[sortKey.value]) return 1 * modifier;
                return 0;
            });
        });

        const paginatedPlans = computed(() => {
            const start = (currentPage.value - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            return sortedPlans.value.slice(start, end);
        });

        const totalPages = computed(() =>
            Math.ceil(filteredPlans.value.length / itemsPerPage)
        );

        function sort(key) {
            if (sortKey.value === key) {
                sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
            } else {
                sortKey.value = key;
                sortOrder.value = 'asc';
            }
        }

        return {
            search,
            currentPage,
            paginatedPlans,
            totalPages,
            sort
        };
    }
};
</script>