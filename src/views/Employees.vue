<template>
  <v-container>
    <h1>Hallo Employee Page</h1>
    <EmployeeToolbar @update:search="search = $event" :addNewItem="addNewItem" />

    <!-- Tabs Component -->
    <Tabs :tabs="tabs" initial-tab="EmployeeList">
      <!-- Tab 1: Employee List -->
      <Tab name="EmployeeList">
        <EmployeeList :employees="filteredEmployees" :selected="selected" :headers="headers" @editItem="editItem"
          @deleteItem="openDeleteDialog" />
        <EmployeeDialog :dialog="dialog" :editedItem="editedItem" @save="handleSave" @close="close" />
        <DeleteEmployeeDialog :dialog="dialogDelete" :employee="selectedEmployee" @update:dialog="updateDeleteDialog"
          @delete="deleteEmployee" />
      </Tab>

      <!-- Tab 2: Just a placeholder text -->
      <Tab name="two">
        <div>This is the second tab.</div>
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
import { Employee } from "@/types/types";
import { employees as employeeData } from "@/data/employees";
import EmployeeDialog from "@/components/EmployeeDialog.vue";
import DeleteEmployeeDialog from "@/components/DeleteEmployeeDialog.vue";
import EmployeeToolbar from "@/components/EmployeeToolbar.vue";
import EmployeeList from "@/components/EmployeeList.vue";
import Tabs from "@/components/Tabs.vue";
import Tab from "@/components/Tab.vue";


const employees = ref<Employee[]>(employeeData)

const search = ref('');

const tabs = ref([
  { name: 'EmployeeList', label: 'Employee List', icon: 'mdi-account-group' },
  { name: 'two', label: 'Item Two', icon: 'mdi-card-account-details-outline' },
  { name: 'three', label: 'Item Three', icon: 'mdi-camera-image' }
]);

const activeTab = ref(tabs.value[0].name);

function selectTab(tabName: string) {
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
  department: "",
  status: ""
});

const editItem = (item: Employee) => {
  editedIndex.value = employees.value.findIndex((emp) => emp.firstName === item.firstName && emp.lastName === item.lastName);
  editedItem.value = { ...item };
  dialog.value = true;
};

const close = () => {
  dialog.value = false;
  editedIndex.value = -1;
  editedItem.value = { firstName: "", lastName: "", position: "", department: "", status: "" };
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
  editedItem.value = { firstName: "", lastName: "", position: "", department: "", status: "" };
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

<style scoped>
/* Ensure the container takes full width */
.v-container {
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}

/* Full width tabs and toolbar */
.tabs, .employee-toolbar {
  width: 100%;
}

/* List responsiveness */
.employee-list {
  width: 100%;
  overflow-x: auto; /* Allows table to scroll on small screens */
}

/* Responsive Table */
.table {
  width: 100%;
  min-width: 600px; /* Ensures table has a minimum width but can scroll on smaller screens */
}

/* Dialogs should be centered and responsive */
.dialog {
  width: 90%;
  max-width: 600px;
}

/* Media queries for different screen sizes */
@media (max-width: 768px) {
  .dialog, .tabs, .employee-toolbar {
    padding: 10px;
  }
}

@media (max-width: 480px) {
  .tabs, .employee-toolbar {
    flex-direction: column;
  }
}
</style>
