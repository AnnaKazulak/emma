<script setup>
import { ref, onMounted, watch , computed, onBeforeUnmount} from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const props = defineProps({
    data: Array,
    category: String,
    title: String,
    chartType: String
});

const chartContainer = ref(null);
let chartInstance = null;

// Create a reactive data object for the chart
const chartData = computed(() => {
    const counts = props.data.reduce((acc, curr) => {
        const key = curr[props.category];
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {});
    return {
        labels: Object.keys(counts),
        datasets: [{
            label: props.title,
            data: Object.values(counts),
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    };
});

onMounted(() => {
    if (chartContainer.value) {
        const ctx = chartContainer.value.getContext('2d');
        chartInstance = new Chart(ctx, {
            type: props.chartType || 'bar',
            data: chartData.value,
            options: { responsive: true, maintainAspectRatio: false }
        });
    }
});

watch(chartData, (newData) => {
    if (chartInstance) {
        chartInstance.data = newData;
        chartInstance.update();
    }
}, { deep: true });

onBeforeUnmount(() => {
    if (chartInstance) {
        chartInstance.destroy();
    }
});
</script>

<template>
  <canvas ref="chartContainer"></canvas>
</template>


  