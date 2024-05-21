<template>
    <div>
        <NumberCard icon="mdi-account-group" :count="employeeCount" label="Total Employees" />
        <NumberCard icon="mdi-gender-female" :count="countFemale" label="Female" />
        <NumberCard icon="mdi-gender-male" :count="countMale" label="Male" />
        <NumberCard icon="mdi-human-gender-other" :count="countDivers" label="Divers" />
        <DoughnutChart :data="employees" category="status" title="Status Distribution" />
        <DoughnutChart :data="employees" category="department" title="Department Distribution" />
    </div>
</template>

<script setup>
import { computed, inject, ref } from 'vue';
import NumberCard from './NumberCard.vue';
import DoughnutChart from './DoughnutChart.vue';

const employees = inject('employeesKey', ref([]));

const employeeCount = computed(() => employees.value.length);
const countMale = computed(() => employees.value.filter(emp => emp.gender === "Male").length);
const countDivers = computed(() => employees.value.filter(emp => emp.gender === "Divers").length);
const countFemale = computed(() => employees.value.filter(emp => emp.gender === "Female").length);
</script>