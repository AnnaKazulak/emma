<template>
    <v-card>
        <v-card-title>{{ title }}</v-card-title>
        <v-card-text>
            <div style="position: relative; height:40vh; width:80vw">
                <canvas ref="chartContainer"></canvas>
            </div>
        </v-card-text>
    </v-card>
</template>

<script setup>
import { ref, onMounted, watchEffect, onBeforeUnmount } from 'vue';
import { Chart, registerables } from 'chart.js';

// Register the necessary components for Chart.js
Chart.register(...registerables);

const props = defineProps({
    data: Array,
    category: String,
    title: String,
    chartType: {
        type: String,
        default: 'doughnut'
    },
    colors: {
        type: Array,
        default: () => ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40']
    },
    hoverColors: {
        type: Array,
        default: () => ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40']
    }
});

const chartData = ref({
    labels: [],
    datasets: []
});

const updateChartData = () => {
    const counts = {};
    props.data.forEach(item => {
        const value = item[props.category];
        if (counts[value]) {
            counts[value]++;
        } else {
            counts[value] = 1;
        }
    });

    chartData.value = {
        labels: Object.keys(counts),
        datasets: [{
            label: props.title,
            data: Object.values(counts),
            backgroundColor: props.colors,
            hoverBackgroundColor: props.hoverColors
        }]
    };
};

onMounted(updateChartData);

const chartContainer = ref(null);
let myChart = null;

onMounted(() => {
    if (chartContainer.value) {
        myChart = new Chart(chartContainer.value.getContext('2d'), {
            type: props.chartType,
            data: chartData.value,
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
});

watchEffect(() => {
    if (myChart) {
        myChart.data = chartData.value;
        myChart.update();
    }
});

onBeforeUnmount(() => {
    if (myChart) {
        myChart.destroy();
    }
});
</script>

<style scoped>

.v-card {
    margin-bottom: 30px;
}

</style>