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
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/init';
import EmployeeCard from '@/components/EmployeeCard.vue';
import Tabs from '@/components/Tabs.vue';
import VerticalTabs from '@/components/VerticalTabs.vue';
import EmployeePublicProfile from '@/components/EmployeePublicProfile.vue';

const route = useRoute();
const employeeId = route.params.id;

// State to hold the employee data
const employee = ref(null);

// Function to fetch employee data from Firebase
const fetchEmployee = async (id) => {
    try {
        const docRef = doc(db, "employees", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            employee.value = { id: docSnap.id, ...docSnap.data() };
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.error("Error fetching employee:", error);
    }
};

// Fetch the employee data when the component is mounted
onMounted(() => {
    fetchEmployee(employeeId);
});

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

// Function to handle employee data update and push changes to Firebase
const handleEmployeeUpdate = async (updatedEmployee) => {
    try {
        const docRef = doc(db, "employees", updatedEmployee.id);
        await updateDoc(docRef, updatedEmployee);
        employee.value = { ...updatedEmployee };
    } catch (error) {
        console.error("Error updating employee:", error);
    }
};
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
