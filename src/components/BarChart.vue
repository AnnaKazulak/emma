<template>
    <!-- <v-card> -->
        <canvas ref="canvas" style="width: 100%; height: 100%;"></canvas>
    <!-- </v-card> -->
</template>

<script>
import { Chart, registerables } from 'chart.js';

export default {
    name: 'BarChart',
    props: {
        chartData: {
            type: Object,
            required: true
        },
        options: {
            type: Object,
            default: () => { }
        }
    },
    mounted() {
        Chart.register(...registerables);
        this.renderChart();
        window.addEventListener('resize', this.renderChart);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.renderChart);
    },
    methods: {
        renderChart() {
            const ctx = this.$refs.canvas.getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: this.chartData,
                options: this.options
            });
        }
    }
}
</script>

<style scoped>
.v-card {
    margin-bottom: 30px;
    width: 100%;
    height: auto;
}

.v-card-text {
    position: relative;
    padding: 16px;
    height: 350px;
    width: 100%;
}

@media (max-width: 600px) {
    .v-card-text {
        height: 250px;
    }
}
</style>