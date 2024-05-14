<script setup lang="ts">
import { computed, ref } from "vue";
import { VDataTable } from "vuetify/labs/VDataTable";
import EmployeeDialog from "./EmployeeDialog.vue";
import DeleteEmployeeDialog from "./DeleteEmployeeDialog.vue";
import EmployeeToolbar from './EmployeeToolbar.vue';

interface Employee {
    firstName: string;
    lastName: string;
    position: string;
    department: string;
}


const employees = ref<Employee[]>([
    { firstName: "Evelyn", lastName: "Fredowska", position: "Software Developer", department: "IT" },
    { firstName: "John", lastName: "Doe", position: "Project Manager", department: "Management" },
    { firstName: "Alice", lastName: "Smith", position: "UI/UX Designer", department: "Design" },
    { firstName: "Michael", lastName: "Johnson", position: "Database Administrator", department: "IT" },
    { firstName: "Emily", lastName: "Brown", position: "Software Engineer", department: "IT" },
    { firstName: "David", lastName: "Jones", position: "Quality Assurance Engineer", department: "QA" },
    { firstName: "Sophia", lastName: "Garcia", position: "Data Analyst", department: "Analytics" },
    { firstName: "Daniel", lastName: "Martinez", position: "Network Engineer", department: "IT" },
    { firstName: "Olivia", lastName: "Wilson", position: "Systems Analyst", department: "IT" },
    { firstName: "James", lastName: "Taylor", position: "Frontend Developer", department: "IT" },
    { firstName: "Emma", lastName: "Anderson", position: "Backend Developer", department: "IT" },
    { firstName: "William", lastName: "Thomas", position: "Business Analyst", department: "Business" },
    { firstName: "Ava", lastName: "Hernandez", position: "Product Manager", department: "Management" },
    { firstName: "Alexander", lastName: "Lopez", position: "DevOps Engineer", department: "IT" },
    { firstName: "Mia", lastName: "Hill", position: "Technical Writer", department: "Documentation" },
    { firstName: "Benjamin", lastName: "Scott", position: "Security Analyst", department: "IT" },
    { firstName: "Charlotte", lastName: "Green", position: "Scrum Master", department: "Agile" },
    { firstName: "Ethan", lastName: "Adams", position: "Machine Learning Engineer", department: "AI" },
    { firstName: "Isabella", lastName: "Baker", position: "Software Tester", department: "QA" },
    { firstName: "Liam", lastName: "Gonzalez", position: "Systems Administrator", department: "IT" }
]);


const search = ref('');

const filteredEmployees = computed(() => {
    return employees.value.filter(employee => {
        return Object.values(employee).some(value =>
            value.toLowerCase().includes(search.value.toLowerCase())
        );
    });
});
const selected = ref<Employee[]>([]);
const dialogDelete = ref(false);
const dialog = ref(false);
const editedIndex = ref(-1);
const editedItem = ref<Employee>({
    firstName: "",
    lastName: "",
    position: "",
    department: ""
});


const editItem = (item: Employee) => {
    editedIndex.value = employees.value.findIndex((emp) => emp.firstName === item.firstName && emp.lastName === item.lastName);
    editedItem.value = { ...item };
    dialog.value = true;
};

const close = () => {
    dialog.value = false;
    editedIndex.value = -1;
    editedItem.value = { firstName: "", lastName: "", position: "", department: "" };
};


const handleSave = (newData: Employee) => {
    if (editedIndex.value > -1) {
        // Update existing employee
        employees.value[editedIndex.value] = { ...newData };
    } else {
        // Add new employee
        employees.value.unshift({ ...newData });
    }
    dialog.value = false; // Close the dialog
};


const selectedEmployee = ref<Employee | null>(null);


const openDeleteDialog = (employee: Employee) => {
    selectedEmployee.value = employee;
    dialogDelete.value = true; // Ensure this updates the state
    console.log("Open delete dialog:", dialogDelete.value); // Debug
};

const updateDeleteDialog = (value: boolean) => {
    console.log("Updating dialog visibility to:", value);
    dialogDelete.value = value;
};

const deleteEmployee = (employee: Employee) => {
    const index = employees.value.findIndex(e => e.firstName === employee.firstName && e.lastName === employee.lastName);
    if (index !== -1) {
        employees.value.splice(index, 1);
    }
    dialogDelete.value = false; // Close the dialog after deleting the employee
    console.log('Employee deleted:', employee);
};



const addNewItem = () => {
    editedIndex.value = -1; // Indicates a new employee
    editedItem.value = { firstName: "", lastName: "", position: "", department: "" };
    dialog.value = true;
    console.log("open add employ dialog")
};

const headers = [
    { title: "First Name", value: "firstName" },
    { title: "Last Name", value: "lastName" },
    { title: "Position", value: "position" },
    { title: "Department", value: "department" },
    { title: "Actions", value: "actions", sortable: false }
];




</script>

<template>
    <EmployeeToolbar @update:search="search = $event" :addNewItem="addNewItem" />

    <v-data-table v-model="selected" :headers="headers" :items="filteredEmployees" item-key="lastName">
        <template v-slot:item.actions="{ item }">
            <v-icon class="me-2" size="small" @click="editItem(item)">
                mdi-pencil
            </v-icon>
            <v-icon size="small" @click="openDeleteDialog(item)">
                mdi-delete
            </v-icon>
        </template>
    </v-data-table>
    <!-- Verwendung der EmployeeDialog-Komponente -->
    <EmployeeDialog :dialog="dialog" :editedItem="editedItem" @save="handleSave" @close="close" />
    <!-- Delete Employee Dialog Component -->
    <DeleteEmployeeDialog :dialog="dialogDelete" :employee="selectedEmployee" @update:dialog="updateDeleteDialog"
        @delete="deleteEmployee" />

</template>
