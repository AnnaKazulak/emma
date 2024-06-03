<template>
  <v-container>
    <v-row align="center" justify="space-between" no-gutters>
      <v-col cols="12" sm="2" md="2">
        <v-select label="Status" v-model="statusFilter" :items="props.statusOptions" outlined dense multiple
          chips></v-select>
      </v-col>
      <v-col cols="12" sm="2" md="2">
        <v-text-field label="Position" v-model="positionFilter" outlined dense></v-text-field>
      </v-col>
      <v-col cols="12" sm="2" md="2">
        <v-select label="Department" v-model="departmentFilter" :items="props.departmentOptions" outlined dense multiple
          chips></v-select>
      </v-col>
      <v-col cols="12" sm="2" md="2">
        <v-text-field v-model="startDateFilter" label="Start Date" type="date" outlined dense
          @input="handleDateChange"></v-text-field>
      </v-col>
      <v-col cols="12" sm="2" md="2" class="d-flex align-center">
        <v-btn color="primary" @click="$emit('resetFilters')" class="ma-2">
          Reset Filters
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
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
