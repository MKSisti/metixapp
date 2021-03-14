<template>
  <base-body class="capitalize overflow-hidden transition duration-200 transform-gpu text-black-light-15">
    <template v-slot:title> </template>

    <template v-slot:subtitles> </template>

    <template v-slot:topRight> </template>

    <template v-slot:content>
      <apexchart width="500" type="line" :options="options" :series="series"></apexchart>
    </template>
  </base-body>
</template>

<script>
  import BaseBody from '../components/BaseComponent/BaseBody';
  import VueApexCharts from 'vue3-apexcharts';
  export default {
    name: 'AnalyticsPage',
    components: {
      BaseBody,
      apexchart: VueApexCharts,
    },
    props: ['GroupId'],
    data() {
      return {
        options: {
          chart: {
            id: 'vuechart-example',
          },
          xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
            labels: {
              style: {
                colors:['#fff','#fff']
              },
            },
          },
          yaxis: {
            labels: {
              style: {
                colors:['#fff']
              },
            },
          },
        },
        series: [
          {
            name: 'series-1',
            data: [30, 40, 45, 50, 49, 60, 70, 91],
          },
          {
            name: 'series-2',
            data: [35, 15, 1, 25, 49, 66, 72, 100],
          },
        ],
      };
    },
    computed: {},
    methods: {},
    mounted() {
      console.log(this.$store.getters.getGroupMeta(this.GroupId));
    },
  };
</script>

<style scoped>
.labelClass{
  color: azure!important;
}
</style>