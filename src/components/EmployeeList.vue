<script setup lang="ts">
import { ref, computed } from "vue";
import { VDataTable } from "vuetify/labs/VDataTable";
import EmployeeFilters from "./EmployeeFilters.vue";
import { Employee } from "@/types/types";

const props = defineProps<{
  employees: Employee[];
  selected: Employee[];
  headers: any[];
}>();

const emit = defineEmits(['editItem', 'deleteItem']);


const handleEdit = (item: Employee) => {
  emit('editItem', item);
};

const handleDelete = (item: Employee) => {
  emit('deleteItem', item);
};

const filters = ref({
  status: [],
  position: '',
  department: []
});

const filteredEmployees = computed(() => {
  return props.employees.filter(employee => {
    return (
      (filters.value.status.length === 0 || filters.value.status.includes(employee.status)) &&
      employee.position.toLowerCase().includes(filters.value.position.toLowerCase()) &&
      (filters.value.department.length === 0 || filters.value.department.includes(employee.department))
    );
  });
});

const updateFilters = (newFilters) => {
  filters.value = newFilters;
};

const resetFilters = () => {
  filters.value = { status: [], position: '', department: [] };
  // Emit an event that the filters are reset, handled by child to reset form inputs
  updateFilters(filters.value);
};
</script>


<template>
  <!-- Employee Filters component usage -->
  <EmployeeFilters :status-options="['Active', 'Part-Time', 'Remote', 'On Leave', 'On Probation', 'Suspended']"
    :department-options="['HR', 'Engineering', 'Marketing', 'Sales', 'Customer Support', 'IT', 'Management', 'Analytics', 'Business', 'Documentation', 'Agile', 'AI', 'QA']"
    :initial-filters="filters" @updateFilters="updateFilters" @resetFilters="resetFilters" />

  <!-- Data Table Display -->
  <v-data-table v-model="props.selected" :headers="props.headers" :items="filteredEmployees" item-key="lastName">
    <template v-slot:item.actions="{ item }">
      <v-icon class="me-2" size="small" @click="handleEdit(item)">
        mdi-pencil
      </v-icon>
      <v-icon size="small" @click="handleDelete(item)">
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>
