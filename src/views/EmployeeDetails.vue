<template>
    <v-container fluid>
        <EmployeeCard v-if="employee" :employee="employee" />
        <div v-else class="text-center">
            Employee details not found.
        </div>
        <Tabs :tabs="tabs" :initialTab="initialTab" @update:activeTab="handleTabChange" />
        <div class="tab-content">
            <div v-if="activeTab === 'personal-info'">
                <VerticalTabs :tabs="verticalTabs" :initialTab="initialVerticalTab"
                    @update:activeVerticalTab="handleVerticalTabChange">
                    <div v-if="activeVerticalTab === 'public-profile'">

                        <EmployeePublicProfile :employee="employee" @update-employee="handleEmployeeUpdate" />

                    </div>
                    <div v-if="activeVerticalTab === 'something'">
                        <h3>Hallo Something</h3>
                    </div>
                    <div v-if="activeVerticalTab === 'something-else'">
                        <h3>Hallo Something Else</h3>
                    </div>
                </VerticalTabs>
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
import VerticalTabs from '@/components/VerticalTabs.vue';
import EmployeePublicProfile from '@/components/EmployeePublicProfile.vue';

// Inject the shared employees state
const employees = inject('employeesKey');
const route = useRoute();
const employeeId = route.params.id;

// This computed property finds the specific employee based on the route parameter
const employee = computed(() => employees.value.find(emp => emp.id === parseInt(employeeId)));

const tabs = ref([
    { name: 'personal-info', icon: 'mdi-account-circle', label: 'Personal Info' },
    { name: 'salary', icon: 'mdi-cash', label: 'Salary' },
    { name: 'notes', icon: 'mdi-note-multiple', label: 'Notes' }
]);

const verticalTabs = ref([
    { name: 'public-profile', label: 'Public Profile' },
    { name: 'something', label: 'Something' },
    { name: 'something-else', label: 'Something Else' }
]);

const initialTab = ref('personal-info');
const initialVerticalTab = ref('public-profile');
const activeTab = ref(initialTab.value);
const activeVerticalTab = ref(initialVerticalTab.value);

const handleTabChange = (newTab) => {
    activeTab.value = newTab;
};

const handleVerticalTabChange = (newVerticalTab) => {
    console.log("Received new vertical tab:", newVerticalTab);
    activeVerticalTab.value = newVerticalTab;
};

// This function handles the update of the employee data; make sure it doesn't conflict with other declarations
function handleEmployeeUpdate(updatedEmployee) {
    const index = employees.value.findIndex(emp => emp.id === updatedEmployee.id);
    if (index !== -1) {
        employees.value[index] = { ...updatedEmployee };
    }
}
</script>


<style scoped>
.v-container {
    max-width: 100%;
    padding: 0;
}

.v-card {
    width: 100%;
    border: none;
    padding-top: 20px;
}

.text-h5 {
    font-weight: bold;
    font-size: 24px;
}

.caption {
    color: #757575;
}

.v-chip {
    transform: translateY(-20%);
}
</style>