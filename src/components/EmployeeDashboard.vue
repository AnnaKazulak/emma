<template>
  <v-container>
    <v-row>
      <v-col v-for="item in draggableItems.items" :key="item.label || item.title" :cols="12"
        :sm="item.type === 'numberCard' ? 6 : 12" :md="item.type === 'numberCard' ? 3 : 12"
        :lg="item.type === 'numberCard' ? 3 : 12" draggable="true" @dragstart="dragStart($event, item)"
        @drop="drop($event, item)" @dragover.prevent>
        <template v-if="item.type === 'numberCard'">
          <NumberCard :icon="item.icon" :count="item.count" :label="item.label" />
        </template>
        <!-- Check for doughnut chart specifically -->
        <template v-else-if="item.type === 'chart' && item.chartType === 'doughnut'">
          <DoughnutChart :data="employees" :category="item.dataKey" :title="item.title" />
        </template>
        <!-- Check for bar chart specifically -->
        <template v-else-if="item.type === 'chart' && item.chartType === 'bar'">
          <BarChart :chart-data="prepareBarChartData(item.dataKey)" :options="barChartOptions" />
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>




<script setup>
import { computed, inject, ref, reactive } from 'vue';
import NumberCard from './NumberCard.vue';
import DoughnutChart from './DoughnutChart.vue';
import BarChart from './BarChart.vue';


const employees = inject('employeesKey', ref([]));

const draggableItems = reactive({
  items: [
    { type: 'numberCard', icon: 'mdi-account-group', count: computed(() => employees.value.length), label: 'Total Employees' },
    { type: 'numberCard', icon: 'mdi-gender-female', count: computed(() => employees.value.filter(emp => emp.gender === "Female").length), label: 'Female' },
    { type: 'numberCard', icon: 'mdi-gender-male', count: computed(() => employees.value.filter(emp => emp.gender === "Male").length), label: 'Male' },
    { type: 'numberCard', icon: 'mdi-gender-non-binary', count: computed(() => employees.value.filter(emp => emp.gender === "Divers").length), label: 'Divers' },
    { type: 'chart', dataKey: 'status', title: 'Status Distribution', chartType: 'doughnut' },
    { type: 'chart', dataKey: 'department', title: 'Department Distribution', chartType: 'doughnut' },
    { type: 'chart', dataKey: 'department', title: 'Department Distribution', chartType: 'bar' }
  ]
});


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


const barChartOptions = {
  scales: {
    y: {
      beginAtZero: true
    }
  }
};

function prepareBarChartData(key) {
  const data = employees.value.reduce((acc, curr) => {
    acc[curr[key]] = (acc[curr[key]] || 0) + 1;
    return acc;
  }, {});

  return {
    labels: Object.keys(data),
    datasets: [{
      label: 'Employees',
      data: Object.values(data),
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  };
}

</script>
