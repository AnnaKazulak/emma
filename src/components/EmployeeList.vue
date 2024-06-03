<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { VDataTable } from "vuetify/labs/VDataTable";
// import EmployeeFilters from "./EmployeeFilters.vue";
import { Employee } from "@/types/types";
import { useRouter } from 'vue-router';
import { parseISO, isEqual, isValid } from 'date-fns';
import {  statusOptions, departmentOptions } from '@/utils/selectOptions';

const props = defineProps<{
  employees: Employee[];
  selected: Employee[];
  headers: any[];
}>();

const router = useRouter();
const emit = defineEmits(['editItem', 'deleteItem']);
const handleEdit = (item: Employee) => {
  emit('editItem', item);
};

const handleDelete = (item: Employee) => {
  console.log("Employee to delete:", item);
  if (!item.id) {
    console.error("Employee ID is missing:", item);
  }
  emit('deleteItem', item);
};

const handleRowClick = (event: Event, data: { item: Employee }) => {
  const actualItem = data.item;
  console.log("Received actual item on row click:", actualItem);
  if (actualItem && actualItem.id) {
    router.push({ name: 'EmployeeDetails', params: { id: actualItem.id } });
  } else {
    console.error('Error: Employee ID is missing or undefined', actualItem);
  }
};

const filters = ref({
  status: [] as string[],
  position: '',
  department: [] as string[],
  startDate: null as string | null
});

const filteredEmployees = computed(() => {
  return props.employees.filter(employee => {
    if (filters.value.startDate) {
      const employeeStartDate = parseISO(employee.startDate);
      const filterStartDate = parseISO(filters.value.startDate);
      const startDateMatch = isValid(employeeStartDate) && isValid(filterStartDate) && isEqual(employeeStartDate, filterStartDate);
      
      return (
        startDateMatch &&
        (filters.value.status.length === 0 || filters.value.status.includes(employee.status)) &&
        employee.position.toLowerCase().includes(filters.value.position.toLowerCase()) &&
        (filters.value.department.length === 0 || filters.value.department.includes(employee.department))
      );
    }
    return (
      (filters.value.status.length === 0 || filters.value.status.includes(employee.status)) &&
      employee.position.toLowerCase().includes(filters.value.position.toLowerCase()) &&
      (filters.value.department.length === 0 || filters.value.department.includes(employee.department))
    );
  });
});

const updateFilters = (newFilters: typeof filters.value) => {
  filters.value = newFilters;
};

const resetFilters = () => {
  filters.value = { status: [], position: '', department: [], startDate: null };
  updateFilters(filters.value);
};

watch(filteredEmployees, (newVal) => {
  console.log("Filtered Employees Updated:", newVal);
}, { deep: true });

const selected = ref(props.selected);

watch(() => props.selected, (newVal) => {
  selected.value = newVal;
}, { deep: true });
</script>

<template>
  <!-- Employee Filters component usage -->
  <EmployeeFilters :status-options="statusOptions"
    :department-options="departmentOptions"
    :initial-filters="filters" @updateFilters="updateFilters" @resetFilters="resetFilters" />

  <!-- Data Table Display -->
  <v-data-table v-model="selected" :headers="props.headers" :items="filteredEmployees" item-key="id"
    @click:row="handleRowClick">
    <template  v-slot:[`item.actions`]="{ item }">
      <v-icon class="me-2" size="small" @click.stop="handleEdit(item)">
        mdi-pencil
      </v-icon>
      <v-icon size="small" @click.stop="handleDelete(item)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:[`item.id`]="{ item }">
      {{ item.id }}
    </template>
  </v-data-table>
</template>
