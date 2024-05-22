<template>
    <v-card>
      <v-card-title>
        Bar Chart
      </v-card-title>
      <v-card-text>
        <canvas ref="canvas"></canvas>
      </v-card-text>
    </v-card>
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
        default: () => {}
      }
    },
    mounted() {
      Chart.register(...registerables);
      this.renderChart();
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
  