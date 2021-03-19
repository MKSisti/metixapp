<template>
  <base-body class="capitalize overflow-hidden transition duration-200 transform-gpu text-black-light-15">
    <template v-slot:title> </template>

    <template v-slot:subtitles> </template>

    <template v-slot:topRight> </template>

    <template v-slot:content>
      <div class="w-full h-full pt-28 flex flex-col justify-start items-start space-y-2 px-3 overflow-y-auto overflow-x-hidden">
        <!-- new student, adds an empty student or template student with edit flag true -->
        <div class="bg-black-light-1 flex justify-center items-center flex-row p-4 w-full">
          <apexchart width="1000" height="500" :options="chartOptions" :series="series"></apexchart>
        </div>
      </div>
      <!-- <apexchart width="500" type="line" :options="options" :series="series"></apexchart> -->
    </template>
  </base-body>
</template>

<script>
  import BaseBody from '../components/BaseComponent/BaseBody';
  import VueApexCharts from 'vue3-apexcharts';
  import { mapActions } from 'vuex';
  export default {
    name: 'AnalyticsPage',
    components: {
      BaseBody,
      apexchart: VueApexCharts,
    },
    props: ['GroupId'],
    data() {
      return {
        series: [
          {
            name: 'SAMPLE A',
            type: 'line',
            data: [],
          },
        ],
        chartOptions: {
          chart: {
            type: 'line',
            zoom: {
              enabled: true,
              type: 'xy',
            },
          },
          xaxis: {
            tickAmount: 10,
            categories: [],
            labels: {
              style: {
                colors: 'rgba(170, 170, 170,1)',
              },
            },
          },
          yaxis: {
            tickAmount: 7,
            labels: {
              style: {
                colors: 'rgba(170, 170, 170,1)',
              },
            },
          },
          noData: {
            text: 'Loading',
            align: 'center',
            verticalAlign: 'middle',
            offsetX: 0,
            offsetY: 0,
            style: {
              color: 'rgba(170, 170, 170,1)',
              fontSize: '14px',
            },
          },
          markers: {
            size: 10,
            colors: 'rgba(170, 170, 170,1)',
            strokeColors: 'rgba(170, 170, 170,1)',
            strokeWidth: 0,
            strokeOpacity: 0,
            strokeDashArray: 0,
            radius: 10,
            onClick: undefined,
            onDblClick: undefined,
            showNullDataPoints: false,
            hover: {
              size: undefined,
              sizeOffset: 4,
            },
          },
          grid: {
            show: true,
            padding: {
              top: 25,
              right: 25,
              bottom: 25,
              left: 25,
            },
          },
          legend: {
            show: true,
            showForSingleSeries: false,
            showForNullSeries: true,
            showForZeroSeries: true,
            position: 'bottom',
            horizontalAlign: 'center',
            floating: false,
            fontSize: '14px',
            fontFamily: 'Helvetica, Arial',
            fontWeight: 400,
            formatter: undefined,
            inverseOrder: false,
            width: undefined,
            height: undefined,
            tooltipHoverFormatter: undefined,
            offsetX: 0,
            offsetY: 0,
            labels: {
              colors: 'rgba(170, 170, 170,1)',
              useSeriesColors: false,
            },
            markers: {
              width: 12,
              height: 12,
              strokeWidth: 0,
              strokeColor: 'rgba(170, 170, 170,1)',
              fillColors: undefined,
              radius: 12,
              customHTML: undefined,
              onClick: undefined,
              offsetX: 0,
              offsetY: 0,
            },
            itemMargin: {
              horizontal: 5,
              vertical: 0,
            },
            onItemClick: {
              toggleDataSeries: true,
            },
            onItemHover: {
              highlightDataSeries: true,
            },
          },
        },
      };
    },
    computed: {},
    methods: {
      ...mapActions(['getGroupAnalytics']),
      async populateChart() {
        console.log('here');
        //bug fixed (☞ﾟヮﾟ)☞

        let avgData = [],
          minData = [],
          maxData = [],
          categories = [];

        let grpAnalytics = await this.getGroupAnalytics({
          id: this.GroupId,
        });
        var i = 0;
        for (const modKey in grpAnalytics.mods) {
          for (const testStats of Object.values(grpAnalytics.mods[modKey].tests)) {
            // console.log(values);
            avgData.push(testStats.avg);
            minData.push(testStats.min);
            maxData.push(testStats.max);
            categories.push(i++);
          }
        }

        const annotations = {
          position: 'back',
          yaxis: [
            {
              y: grpAnalytics.def.validation,
              y2: Math.max(...maxData),
              borderColor: 'rgba(40, 191, 103, 1)',
              fillColor: 'rgba(40, 191, 103, 1)',
              opacity: 0.3,
              offsetX: 0,
              offsetY: -3,
              width: '100%',
              yAxisIndex: 0,
              label: {
                borderColor: 'rgba(170, 170, 170,1)',
                borderWidth: 0,
                borderRadius: 0,
                text: 'Validation',
                textAnchor: 'start',
                position: 'left',
                style: {
                  background: 'rgba(40, 191, 103, 1)',
                  color: '#000',
                  fontSize: '1rem',
                  fontWeight: 400,
                  fontFamily: undefined,
                  padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                  },
                },
              },
            },
            {
              y: grpAnalytics.def.eliminatoir,
              y2: 0,
              borderColor: 'rgba(221, 43, 75, 1)',
              fillColor: 'rgba(221, 43, 75, 1)',
              opacity: 0.3,
              offsetX: 0,
              offsetY: -3,
              width: '100%',
              yAxisIndex: 0,
              label: {
                borderColor: 'rgba(170, 170, 170,1)',
                borderWidth: 0,
                borderRadius: 0,
                text: 'Eliminatoire',
                textAnchor: 'start',
                position: 'left',
                style: {
                  background: 'rgba(221, 43, 75, 1)',
                  color: '#000',
                  fontSize: '1rem',
                  fontWeight: 400,
                  fontFamily: undefined,
                  padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                  },
                },
              },
            },
          ],
        };

        let chartOptions = Object.assign({}, this.chartOptions);
        chartOptions.xaxis.categories = categories;
        chartOptions.annotations = annotations;
        this.chartOptions = Object.assign({}, chartOptions);

        this.series = [
          {
            name: 'average',
            type: 'line',
            data: avgData,
          },
          {
            name: 'min',
            type: 'line',
            data: minData,
          },
          {
            name: 'max',
            type: 'line',
            data: maxData,
          },
        ];

        delete this.chartOptions.noData;
      },
    },
    async created() {
      // console.log(this.$store.getters.getGroupMeta(this.GroupId));
      // console.log(
      //   await this.$store.dispatch({
      //     type: "getGroupAnalytics",
      //     id: this.GroupId,
      //   })
      // );
      await this.populateChart();
      // var T = [1, 2, 3, 5, 10, 5, 11, 2];
      // console.log(T.filter((a) => a >= 5).length);
    },
  };
</script>

<style scoped>
  .labelClass {
    color: azure !important;
  }
</style>
