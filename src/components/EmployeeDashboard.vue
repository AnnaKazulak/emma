<template>
  <v-container>
    <v-row>
      <v-col v-for="item in draggableItems.items" :key="item.title" cols="12" sm="12" md="6" lg="6" draggable="true"
        @dragstart="dragStart($event, item)" @drop="drop($event, item)" @dragover.prevent>
        <template v-if="item.type === 'numberCard'">
          <NumberCardContainer :cards="numberCards" />
        </template>
        <template v-else-if="item.type === 'chart'">
          <template v-if="item.chartType === 'doughnut'">
            <DoughnutChart :key="forceUpdate" :data="employees" :category="item.dataKey" :title="item.title" />
          </template>
          <template v-else-if="item.chartType === 'bar'">
            <BarChart :key="forceUpdate" :data="employees" :category="item.dataKey" :title="item.title" />
          </template>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed, ref, watch, reactive } from 'vue';
import NumberCardContainer from './NumberCardContainer.vue';
import DoughnutChart from './DoughnutChart.vue';
import BarChart from './BarChart.vue';
import { Employee } from '@/types/types';

const props = defineProps<{ employees: Employee[] }>();

const forceUpdate = ref(0);

watch(props.employees, (newVal) => {
  console.log("Employees data passed to EmployeeDashboard:", newVal);
  forceUpdate.value++;  // Increment to trigger update
}, { deep: true });

const draggableItems = reactive({
  items: [
    { type: 'numberCard', label: 'Number Cards' },
    { type: 'chart', dataKey: 'gender', title: 'Gender Distribution', chartType: 'doughnut' },
    { type: 'chart', dataKey: 'status', title: 'Status Distribution', chartType: 'doughnut' },
    { type: 'chart', dataKey: 'department', title: 'Department Distribution', chartType: 'doughnut' },
    { type: 'chart', dataKey: 'department', title: 'Bar Department Distribution', chartType: 'bar' }
  ]
});

const numberCards = computed(() => [
  { icon: 'mdi-account-group', count: props.employees.length, label: 'Total Employees' },
  { icon: 'mdi-gender-female', count: props.employees.filter(emp => emp.gender === "Female").length, label: 'Female' },
  { icon: 'mdi-gender-male', count: props.employees.filter(emp => emp.gender === "Male").length, label: 'Male' },
  { icon: 'mdi-gender-non-binary', count: props.employees.filter(emp => emp.gender === "Divers").length, label: 'Divers' }
]);

const draggedItem = ref(null);

function dragStart(event, item) {
  draggedItem.value = item;
  event.dataTransfer.effectAllowed = 'move';
}

function drop(event, targetItem) {
  const draggedIndex = draggableItems.items.indexOf(draggedItem.value);
  const targetIndex = draggableItems.items.indexOf(targetItem);
  if (draggedIndex !== targetIndex) {
    draggableItems.items.splice(targetIndex, 0, draggableItems.items.splice(draggedIndex, 1)[0]);
  }
}
</script>
