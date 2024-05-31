<template>
  <v-select label="Filter by Status" v-model="statusFilter" :items="props.statusOptions" outlined dense multiple
    chips></v-select>

  <v-text-field label="Filter by Position" v-model="positionFilter" outlined dense></v-text-field>

  <v-select label="Filter by Department" v-model="departmentFilter" :items="props.departmentOptions" outlined dense
    multiple chips></v-select>

  <v-text-field v-model="startDateFilter" label="Filter by Start Date" type="date" outlined dense
    @input="handleDateChange"></v-text-field>

  <v-btn color="primary" @click="$emit('resetFilters')" class="ma-2" text>
    Reset Filters
  </v-btn>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue';

const props = defineProps({
  statusOptions: Array,
  departmentOptions: Array,
  initialFilters: Object
});

const emit = defineEmits(['updateFilters', 'resetFilters', 'dateChange']);

const statusFilter = ref<string[]>([]);
const positionFilter = ref<string>('');
const departmentFilter = ref<string[]>([]);
const startDateFilter = ref<string | null>(null);

const handleDateChange = () => {
  console.log("User selected date:", startDateFilter.value);
  emit('dateChange', startDateFilter.value);
};

// Immediate watch to handle changes in initial filters
watch(
  () => props.initialFilters,
  (newFilters) => {
    if (newFilters) {
      statusFilter.value = newFilters.status || [];
      positionFilter.value = newFilters.position || '';
      departmentFilter.value = newFilters.department || [];
      startDateFilter.value = newFilters.startDate || null;
    }
  },
  { deep: true, immediate: true }
);

watch(
  [statusFilter, positionFilter, departmentFilter, startDateFilter],
  () => {
    emit('updateFilters', {
      status: statusFilter.value,
      position: positionFilter.value,
      department: departmentFilter.value,
      startDate: startDateFilter.value
    });
  },
  { deep: true }
);
</script>
