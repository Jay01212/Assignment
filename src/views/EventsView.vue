<template>
    <div class="events-view container">
        <h2 class="mb-4">Mental Health Events</h2>

        <div class="row mb-3">
            <div class="col-md-6">
                <input v-model="searchQuery" @input="handleSearch" class="form-control" placeholder="Search events...">
            </div>
            <div class="col-md-3">
                <select v-model="statusFilter" @change="handleSearch" class="form-select">
                    <option value="">All Statuses</option>
                    <option value="Open">Open</option>
                    <option value="Full">Full</option>
                    <option value="Canceled">Canceled</option>
                </select>
            </div>
            <div class="col-md-3">
                <button @click="clearFilters" class="btn btn-secondary w-100">Clear Filters</button>
            </div>
        </div>

        <div class="table-responsive">
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th @click="sort('eventName')">Event Name <i class="bi bi-arrow-down-up"></i></th>
                        <th @click="sort('details')">Details <i class="bi bi-arrow-down-up"></i></th>
                        <th @click="sort('date')">Date <i class="bi bi-arrow-down-up"></i></th>
                        <th @click="sort('location')">Location <i class="bi bi-arrow-down-up"></i></th>
                        <th @click="sort('status')">Status <i class="bi bi-arrow-down-up"></i></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="event in paginatedEvents" :key="event.id">
                        <td>{{ event.eventName }}</td>
                        <td>{{ event.details }}</td>
                        <td>{{ formatDate(event.date) }}</td>
                        <td>{{ event.location }}</td>
                        <td>
                            <span :class="getStatusClass(event.status)">{{ event.status }}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <nav aria-label="Events pagination">
            <ul class="pagination justify-content-center">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">Previous</a>
                </li>
                <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: currentPage === page }">
                    <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                    <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">Next</a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
    name: 'EventsView',
    setup() {
        const events = ref([
            { id: 1, eventName: 'Mental Health Webinar', details: 'An online webinar discussing mental wellness', date: '2024-10-25', location: 'Online (Zoom)', status: 'Open' },
            { id: 2, eventName: 'Wellness Workshop', details: 'A hands-on workshop on mindfulness practices', date: '2024-11-10', location: 'Community Center', status: 'Open' },
            { id: 3, eventName: 'Depression Awareness', details: 'Seminar focusing on recognizing depression', date: '2024-11-15', location: 'City Hall', status: 'Full' },
            { id: 4, eventName: 'Anxiety Support Group', details: 'Weekly support group for managing anxiety', date: '2024-10-20', location: 'Therapy Center', status: 'Open' },
            { id: 5, eventName: 'Stress Relief Yoga', details: 'Guided yoga session for stress relief', date: '2024-10-18', location: 'Park Pavilion', status: 'Canceled' },
            // Add more events as needed
        ]);

        const searchQuery = ref('');
        const statusFilter = ref('');
        const sortKey = ref('date');
        const sortOrder = ref('asc');
        const currentPage = ref(1);
        const itemsPerPage = 10;

        const filteredEvents = computed(() => {
            return events.value.filter(event => {
                const matchesSearch = event.eventName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                    event.details.toLowerCase().includes(searchQuery.value.toLowerCase());
                const matchesStatus = !statusFilter.value || event.status === statusFilter.value;
                return matchesSearch && matchesStatus;
            });
        });

        const sortedEvents = computed(() => {
            return [...filteredEvents.value].sort((a, b) => {
                let aValue = a[sortKey.value];
                let bValue = b[sortKey.value];

                if (sortKey.value === 'date') {
                    aValue = new Date(aValue);
                    bValue = new Date(bValue);
                }

                if (aValue < bValue) return sortOrder.value === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortOrder.value === 'asc' ? 1 : -1;
                return 0;
            });
        });

        const totalPages = computed(() => Math.ceil(sortedEvents.value.length / itemsPerPage));

        const paginatedEvents = computed(() => {
            const start = (currentPage.value - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            return sortedEvents.value.slice(start, end);
        });

        const handleSearch = () => {
            currentPage.value = 1;
        };

        const clearFilters = () => {
            searchQuery.value = '';
            statusFilter.value = '';
            sortKey.value = 'date';
            sortOrder.value = 'asc';
            currentPage.value = 1;
        };

        const sort = (key) => {
            if (sortKey.value === key) {
                sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
            } else {
                sortKey.value = key;
                sortOrder.value = 'asc';
            }
        };

        const changePage = (page) => {
            if (page >= 1 && page <= totalPages.value) {
                currentPage.value = page;
            }
        };

        const formatDate = (dateString) => {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        };

        const getStatusClass = (status) => {
            switch (status) {
                case 'Open': return 'badge bg-success';
                case 'Full': return 'badge bg-warning';
                case 'Canceled': return 'badge bg-danger';
                default: return 'badge bg-secondary';
            }
        };

        return {
            searchQuery,
            statusFilter,
            currentPage,
            totalPages,
            paginatedEvents,
            handleSearch,
            clearFilters,
            sort,
            changePage,
            formatDate,
            getStatusClass
        };
    }
};
</script>

<style scoped>
.events-view {
    font-family: Arial, sans-serif;
}

.table th {
    cursor: pointer;
}

.badge {
    font-size: 0.8rem;
}
</style>