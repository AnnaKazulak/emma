<template>
  <v-container class="mt-5">
    <EmployeeToolbar @update:search="search = $event" :addNewItem="addNewItem" />

    <Tabs :tabs="tabs" initial-tab="dashboard">
      <Tab name="dashboard">
        <EmployeeDashboard :employees="employees" />
      </Tab>
      <Tab name="EmployeeList">
        <EmployeeList :employees="filteredEmployees" :selected="selected" :headers="headers" @editItem="editItem"
          @deleteItem="openDeleteDialog" />
        <EmployeeDialog :dialog="dialog" :editedItem="editedItem" @save="handleSave" @close="close" />
        <DeleteEmployeeDialog :dialog="dialogDelete" :employee="selectedEmployee" @update:dialog="updateDeleteDialog"
          @delete="deleteEmployee" />
      </Tab>
      <Tab name="three">
        <div>This is the third tab.</div>
      </Tab>
    </Tabs>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { Employee } from '@/types/types';
import EmployeeDialog from '@/components/EmployeeDialog.vue';
import DeleteEmployeeDialog from '@/components/DeleteEmployeeDialog.vue';
import EmployeeToolbar from '@/components/EmployeeToolbar.vue';
import EmployeeList from '@/components/EmployeeList.vue';
import Tabs from '@/components/Tabs.vue';
import Tab from '@/components/Tab.vue';
import EmployeeDashboard from '@/components/EmployeeDashboard.vue';
import { getEmployees, addEmployee, updateEmployee, deleteEmployee as deleteEmployeeFromFirestore } from '@/services/firestoreService';

const employees = ref<Employee[]>([]);
const search = ref('');
const tabs = ref([
  { name: 'dashboard', label: 'Dashboard', icon: 'mdi-card-account-details-outline' },
  { name: 'EmployeeList', label: 'Employee List', icon: 'mdi-account-group' },
  { name: 'three', label: 'Item Three', icon: 'mdi-camera-image' }
]);
const activeTab = ref(tabs.value[0].name);

onMounted(async () => {
  await fetchEmployees();
});

const fetchEmployees = async () => {
  employees.value = await getEmployees();
};

const filteredEmployees = computed(() => {
  return employees.value.filter(employee => {
    return (employee.firstName.toLowerCase().includes(search.value.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(search.value.toLowerCase()) ||
      employee.position.toLowerCase().includes(search.value.toLowerCase()) ||
      employee.department.toLowerCase().includes(search.value.toLowerCase()) ||
      employee.status.toLowerCase().includes(search.value.toLowerCase()) ||
      `${employee.address.street} ${employee.address.houseNumber} ${employee.address.city} ${employee.address.zipCode}`.toLowerCase().includes(search.value.toLowerCase()));
  });
});

watch(filteredEmployees, (newVal) => {
  console.log("Filtered Employees Updated:", newVal);
}, { deep: true });

const selected = ref<Employee[]>([]);
const dialogDelete = ref(false);
const dialog = ref(false);
const editedIndex = ref(-1);

const editedItem = ref<Employee>({
  // id: '',
  firstName: '',
  lastName: '',
  position: '',
  department: '',
  status: '',
  dateOfBirth: '',
  startDate: '',
  address: {
    street: '',
    houseNumber: '',
    zipCode: '',
    city: '',
  },
  gender: ''
});

const editItem = (item: Employee) => {
  editedIndex.value = employees.value.findIndex(emp => emp.id === item.id);
  editedItem.value = { ...item };
  dialog.value = true;
};

const close = () => {
  dialog.value = false;
  editedIndex.value = -1;
  editedItem.value = {
    // id: '',
    firstName: '',
    lastName: '',
    position: '',
    department: '',
    status: '',
    dateOfBirth: '',
    startDate: '',
    address: {
      street: '',
      houseNumber: '',
      zipCode: '',
      city: '',
    },
    gender: ''
  };
};

const handleSave = async (newData: Employee) => {
  if (editedIndex.value > -1) {
    // Update existing employee
    await updateEmployee(newData.id, newData);
    employees.value[editedIndex.value] = { ...newData };
  } else {
    // Add new employee
    const newId = await addEmployee(newData);
    newData.id = newId; // Assign the Firestore-generated ID to the new employee
    employees.value.unshift({ ...newData });
    console.log("New employee added:", newData);
  }
  dialog.value = false; // Close the dialog
  await fetchEmployees(); // Refresh the list after save
};

const selectedEmployee = ref<Employee | null>(null);

const openDeleteDialog = (employee: Employee) => {
  selectedEmployee.value = { ...employee }; // Ensure a proper copy is made
  console.log("Selected employee for deletion:", selectedEmployee.value);
  dialogDelete.value = true;
};

const updateDeleteDialog = (value: boolean) => {
  dialogDelete.value = value;
};

const deleteEmployee = async () => {
  if (!selectedEmployee.value || !selectedEmployee.value.id) {
    console.error("Invalid employee ID:", selectedEmployee.value);
    return;
  }

  const index = employees.value.findIndex(e => e.id === selectedEmployee.value.id);
  if (index !== -1) {
    console.log("Deleting employee:", selectedEmployee.value);
    console.log("Employee ID:", selectedEmployee.value.id);
    try {
      await deleteEmployeeFromFirestore(selectedEmployee.value.id);
      employees.value.splice(index, 1);
      console.log("Employee successfully deleted from Firestore");
      await fetchEmployees(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting employee from Firestore:", error);
    }
  } else {
    console.error("Employee not found or ID is invalid:", selectedEmployee.value);
  }
  dialogDelete.value = false; // Close the dialog after deleting the employee
};

const addNewItem = () => {
  editedIndex.value = -1; // Indicates a new employee
  editedItem.value = {
    // id: '',
    firstName: '',
    lastName: '',
    position: '',
    department: '',
    status: '',
    dateOfBirth: '',
    startDate: '',
    address: {
      street: '',
      houseNumber: '',
      zipCode: '',
      city: '',
    },
    gender: ''
  };
  dialog.value = true;
};

const headers = [
  { title: 'First Name', value: 'firstName' },
  { title: 'Last Name', value: 'lastName' },
  { title: 'Status', value: 'status' },
  { title: 'Position', value: 'position' },
  { title: 'Department', value: 'department' },
  { title: 'Id', value: 'id' },
  { title: 'Actions', value: 'actions', sortable: false }
];
</script>

<style scoped>
.v-container {
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.tabs,
.employee-toolbar {
  width: 100%;
}

.employee-list {
  width: 100%;
  overflow-x: auto;
}

.table {
  width: 100%;
  min-width: 600px;
}

.dialog {
  width: 90%;
  max-width: 600px;
}

@media (max-width: 768px) {
  .dialog,
  .tabs,
  .employee-toolbar {
    padding: 10px;
  }
}

@media (max-width: 480px) {
  .tabs,
  .employee-toolbar {
    flex-direction: column;
  }
}
</style>
