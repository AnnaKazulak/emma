<template>
  <router-view />
</template>

<script lang="ts" setup>
import { provide, ref } from 'vue';
import { employees as initialEmployees } from './data/employees';  

// Create a reactive reference for employees data
const employees = ref(initialEmployees);

// Provide the employees data under a specific key
provide('employeesKey', employees);
</script>
