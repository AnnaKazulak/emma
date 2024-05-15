<template>
  <v-container>
    <h1>Hallo Employee Page</h1>
    <EmployeeToolbar @update:search="search = $event" :addNewItem="addNewItem" />

    <Tabs :tabs="tabs" initial-tab="EmployeeList">

      <Tab name="EmployeeList">
        <EmployeeList :employees="filteredEmployees" :selected="selected" :headers="headers" @editItem="editItem"
          @deleteItem="openDeleteDialog" />
        <EmployeeDialog :dialog="dialog" :editedItem="editedItem" @save="handleSave" @close="close" />
        <DeleteEmployeeDialog :dialog="dialogDelete" :employee="selectedEmployee" @update:dialog="updateDeleteDialog"
          @delete="deleteEmployee" />
      </Tab>

      <Tab name="EmployeeCard">
        <v-row>
          <v-col cols="12" md="6" lg="4" v-for="employee in filteredEmployees" :key="employee.firstName">
            <EmployeeCard :employee="employee" @edit="editItem" @delete="openDeleteDialog" />
          </v-col>
        </v-row>
      </Tab>

      <!-- Tab 3: Just a placeholder text -->
      <Tab name="three">
        <div>This is the third tab.</div>
      </Tab>
    </Tabs>

  </v-container>
</template>


<script setup lang="ts">
import { computed, ref } from "vue";
import { Employee } from "@/types/Employee";
import EmployeeDialog from "@/components/EmployeeDialog.vue";
import DeleteEmployeeDialog from "@/components/DeleteEmployeeDialog.vue";
import EmployeeToolbar from "@/components/EmployeeToolbar.vue";
import EmployeeList from "@/components/EmployeeList.vue";
import Tabs from "@/components/Tabs.vue";
import Tab from "@/components/Tab.vue";
import EmployeeCard from "@/components/EmployeeCard.vue";


const employees = ref<Employee[]>([
  { firstName: "Evelyn", lastName: "Fredowska", position: "Software Developer", department: "IT", image: "https://picsum.photos/id/237/200/300" },
  { firstName: "John", lastName: "Doe", position: "Project Manager", department: "Management", image: "https://picsum.photos/id/1/200/300" },
  { firstName: "Alice", lastName: "Smith", position: "UI/UX Designer", department: "Design", image: "https://picsum.photos/id/22/200/300" },
  { firstName: "Michael", lastName: "Johnson", position: "Database Administrator", department: "IT", image: "https://picsum.photos/id/40/200/300" },
  { firstName: "Emily", lastName: "Brown", position: "Software Engineer", department: "IT", image: "https://picsum.photos/id/64/200/300" },
  { firstName: "David", lastName: "Jones", position: "Quality Assurance Engineer", department: "QA", image: "https://picsum.photos/id/65/200/300" },
  { firstName: "Sophia", lastName: "Garcia", position: "Data Analyst", department: "Analytics", image: "https://picsum.photos/id/169/200/300" },
  { firstName: "Daniel", lastName: "Martinez", position: "Network Engineer", department: "IT", image: "https://picsum.photos/id/177/200/300" },
  { firstName: "Olivia", lastName: "Wilson", position: "Systems Analyst", department: "IT", image: "https://picsum.photos/id/200/200/300" },
  { firstName: "James", lastName: "Taylor", position: "Frontend Developer", department: "IT", image: "https://picsum.photos/id/219/200/300" },
  { firstName: "Emma", lastName: "Anderson", position: "Backend Developer", department: "IT", image: "https://picsum.photos/id/225/200/300" },
  { firstName: "William", lastName: "Thomas", position: "Business Analyst", department: "Business", image: "https://picsum.photos/id/342/200/300" },
  { firstName: "Ava", lastName: "Hernandez", position: "Product Manager", department: "Management", image: "https://picsum.photos/id/375/200/300" },
  { firstName: "Alexander", lastName: "Lopez", position: "DevOps Engineer", department: "IT", image: "https://picsum.photos/id/399/200/300" },
  { firstName: "Mia", lastName: "Hill", position: "Technical Writer", department: "Documentation", image: "https://picsum.photos/id/453/200/300" },
  { firstName: "Benjamin", lastName: "Scott", position: "Security Analyst", department: "IT", image: "https://picsum.photos/id/550/200/300" },
  { firstName: "Charlotte", lastName: "Green", position: "Scrum Master", department: "Agile", image: "https://picsum.photos/id/582/200/300" },
  { firstName: "Ethan", lastName: "Adams", position: "Machine Learning Engineer", department: "AI", image: "https://picsum.photos/id/593/200/300" },
  { firstName: "Isabella", lastName: "Baker", position: "Software Tester", department: "QA", image: "https://picsum.photos/id/633/200/300" },
  { firstName: "Liam", lastName: "Gonzalez", position: "Systems Administrator", department: "IT", image: "https://picsum.photos/id/646/200/300" }
]);

const search = ref('');

const tabs = ref([
  { name: 'EmployeeList', label: 'Employee List', icon: 'mdi-account-group' },
  { name: 'EmployeeCard', label: 'Employee Card', icon: 'mdi-card-account-details-outline' },
  { name: 'three', label: 'Item Three', icon: 'mdi-camera-image' }
]);

const activeTab = ref(tabs.value[0].name);

function selectTab(tabName) {
  activeTab.value = tabName;
}

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
  console.log("open add employ dialog");
};

const headers = [
  { title: "First Name", value: "firstName" },
  { title: "Last Name", value: "lastName" },
  { title: "Position", value: "position" },
  { title: "Department", value: "department" },
  { title: "Actions", value: "actions", sortable: false }
];
</script>
