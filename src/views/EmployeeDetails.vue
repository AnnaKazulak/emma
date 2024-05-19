<template>
    <v-container fluid>
        <EmployeeCard v-if="employee" :employee="employee" />
        <div v-else class="text-center">
            Employee details not found.
        </div>
        <Tabs :tabs="tabs" :initialTab="initialTab" @update:activeTab="handleActiveTabChange" />
        <div class="tab-content">
            <div v-if="activeTab === 'personal-info'">
                <h3>Hallo Personal Info</h3>
            </div>
            <div v-if="activeTab === 'salary'">
                <h3>Hallo Salary</h3>
            </div>
            <div v-if="activeTab === 'notes'">
                <h3>Hallo Notes</h3>
            </div>
        </div>
    </v-container>
</template>

<script setup>
import { computed, ref, inject } from 'vue';
import { useRoute } from 'vue-router';
import EmployeeCard from '@/components/EmployeeCard.vue';
import Tabs from '@/components/Tabs.vue';

const employees = inject('employeesKey');
const route = useRoute();
const employeeId = route.params.id;

const employee = computed(() => employees.value.find(emp => emp.id === parseInt(employeeId)));

const tabs = ref([
    { name: 'personal-info', icon: 'mdi-account-circle', label: 'Personal Info' },
    { name: 'salary', icon: 'mdi-cash', label: 'Salary' },
    { name: 'notes', icon: 'mdi-note-multiple', label: 'Notes' }
]);

const initialTab = ref('personal-info');
const activeTab = ref(initialTab.value);

const handleActiveTabChange = (newTab) => {
    activeTab.value = newTab;
};
</script>

<style scoped>
.v-container {
    max-width: 100%;
    padding: 0;
    /* Ensure container has no padding */
}

.v-card {
    width: 100%;
    border: none;
    padding-top: 20px;
}

.text-h5 {
    font-weight: bold;
    font-size: 24px;
    /* Enhanced readability */
    line-height: 1.4;
}

.caption {
    color: #757575;
}

.v-chip {
    transform: translateY(-20%);
    /* Position adjustment */
}
</style>
