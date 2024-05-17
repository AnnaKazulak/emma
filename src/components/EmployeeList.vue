<script setup lang="ts">
import { Employee } from "@/types/types";
import { defineProps, defineEmits, ref, computed } from "vue";
import { VDataTable } from "vuetify/labs/VDataTable";
import { VSelect, VBtn } from "vuetify/components";

// Define props and emits
const props = defineProps<{
  employees: Employee[];
  selected: Employee[];
  headers: any[];
}>();

const emit = defineEmits(['editItem', 'deleteItem']);

// Event handlers for editing and deleting
const handleEdit = (item: Employee) => {
  emit('editItem', item);
};

const handleDelete = (item: Employee) => {
  emit('deleteItem', item);
};

const statusFilter = ref<string[]>([]);
const positionFilter = ref('');
const departmentFilter = ref<string[]>([]);

const filteredEmployees = computed(() => {
  return props.employees.filter(employee => {
    return (
      (statusFilter.value.length === 0 || statusFilter.value.includes(employee.status)) &&
      employee.position.toLowerCase().includes(positionFilter.value.toLowerCase()) &&
      (departmentFilter.value.length === 0 || departmentFilter.value.includes(employee.department))
    );
  });
});

// Function to reset all filters
const resetFilters = () => {
  statusFilter.value = [];
  positionFilter.value = '';
  departmentFilter.value = [];
};
</script>

<template>
  <v-select label="Filter by Status" v-model="statusFilter"
    :items="['Active', 'Part-Time', 'Remote', 'On Leave', 'On Probation', 'Suspended']" outlined dense multiple chips>
  </v-select>

  <v-text-field label="Filter by Position" v-model="positionFilter" outlined dense></v-text-field>

  <v-select label="Filter by Department" v-model="departmentFilter"
    :items="['HR', 'Engineering', 'Marketing', 'Sales', 'Customer Support', 'IT', 'Management', 'Analytics', 'Business', 'Documentation', 'Agile', 'AI', 'QA']"
    outlined dense multiple chips>
  </v-select>

  <v-btn color="primary" @click="resetFilters" class="ma-2" text>Reset Filters</v-btn>

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
