<template>
    <div class="card">
        <DataTable v-model:filters="filters" :value="events" paginator showGridlines :rows="10" dataKey="id"
            filterDisplay="menu" :loading="loading"
            :globalFilterFields="['title', 'date', 'location', 'organizer', 'status']">
            <template #header>
                <div class="flex justify-between mb-3">
                    <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="clearFilter()" />
                    <InputText v-model="filters['global'].value" placeholder="Keyword Search" class="w-30rem" />
                </div>
            </template>
            <template #empty> No events found. </template>
            <template #loading> Loading events data. Please wait. </template>
            <Column field="title" header="Title" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.title }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" placeholder="Search by title" />
                </template>
            </Column>
            <Column field="date" header="Date" dataType="date" style="min-width: 10rem">
                <template #body="{ data }">
                    {{ formatDate(data.date) }}
                </template>
                <template #filter="{ filterModel }">
                    <Calendar v-model="filterModel.value" dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" />
                </template>
            </Column>
            <Column field="location" header="Location" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.location }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" placeholder="Search by location" />
                </template>
            </Column>
            <Column field="organizer" header="Organizer" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.organizer }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" placeholder="Search by organizer" />
                </template>
            </Column>
            <Column header="Status" field="status" style="min-width: 12rem">
                <template #body="{ data }">
                    <Tag :value="data.status" :severity="getSeverity(data.status)" />
                </template>
                <template #filter="{ filterModel }">
                    <Select v-model="filterModel.value" :options="statuses" placeholder="Select One" showClear />
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import Calendar from 'primevue/calendar';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import Select from 'primevue/selectbutton';

const events = ref([
    { id: 1, title: 'Mental Health Awareness Workshop', date: new Date('2024-10-15'), location: 'Community Center', organizer: 'Mental Health Org', status: 'Upcoming' },
    { id: 2, title: 'Mindfulness Meditation Retreat', date: new Date('2024-11-01'), location: 'Nature Park', organizer: 'Wellness Center', status: 'Upcoming' },
    { id: 3, title: 'Support Group for Anxiety', date: new Date('2024-10-20'), location: 'Online', organizer: 'Counseling Service', status: 'Ongoing' },
    { id: 4, title: 'Depression Awareness Month Activities', date: new Date('2024-10-30'), location: 'Local Library', organizer: 'Health Awareness Group', status: 'Upcoming' },
]);

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    title: { operator: 'AND', constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    date: { operator: 'AND', constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
    location: { operator: 'AND', constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    organizer: { operator: 'AND', constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    status: { operator: 'OR', constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
});

const statuses = ref(['Upcoming', 'Ongoing', 'Completed']);
const loading = ref(false);

const formatDate = (value) => {
    return value.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};

const clearFilter = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        title: { operator: 'AND', constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        date: { operator: 'AND', constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        location: { operator: 'AND', constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        organizer: { operator: 'AND', constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        status: { operator: 'OR', constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    };
};

const getSeverity = (status) => {
    switch (status) {
        case 'Upcoming':
            return 'info';
        case 'Ongoing':
            return 'success';
        case 'Completed':
            return 'success';
        default:
            return 'info';
    }
};
</script>

<style scoped>
.card {
    padding: 20px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.mb-3 {
    margin-bottom: 1rem;
}

.w-30rem {
    width: 30rem;
}
</style>
