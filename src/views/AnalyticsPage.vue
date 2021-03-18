<template>
  <base-body
    class="capitalize overflow-hidden transition duration-200 transform-gpu text-black-light-15"
  >
    <template v-slot:title> </template>

    <template v-slot:subtitles> </template>

    <template v-slot:topRight> </template>

    <template v-slot:content>
      <div class="w-full p-2 h-96 bg-black-light-5">
        <apexchart
          height="350"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
      <!-- <apexchart width="500" type="line" :options="options" :series="series"></apexchart> -->
    </template>
  </base-body>
</template>

<script>
import BaseBody from "../components/BaseComponent/BaseBody";
import VueApexCharts from "vue3-apexcharts";
import { mapActions } from "vuex";
export default {
  name: "AnalyticsPage",
  components: {
    BaseBody,
    apexchart: VueApexCharts,
  },
  props: ["GroupId"],
  data() {
    return {
      series: [
        {
          name: "SAMPLE A",
          type: "line",
          data: [],
        },
      ],
      chartOptions: {
        chart: {
          type: "line",
          zoom: {
            enabled: true,
            type: "xy",
          },
        },
        xaxis: {
          tickAmount: 10,
          categories: [],
          labels: {
            style: {
              colors: "#fff",
            },
          },
        },
        yaxis: {
          tickAmount: 7,
          labels: {
            style: {
              colors: "#fff",
            },
          },
        },
        annotations: {
          position: "back",
          yaxis: [
            {
              y: 12,
              y2: null,
              borderColor: "#00ff00",
              fillColor: "#00ff00",
              opacity: 0.3  ,
              offsetX: 0,
              offsetY: -3,
              width: "100%",
              yAxisIndex: 0,
              label: {
                borderColor: "#c2c2c2",
                borderWidth: 1,
                borderRadius: 2,
                text: 'Validation',
                textAnchor: "start",
                position: "left",
                style: {
                  background: "#00ff00",
                  color: "#000",
                  fontSize: "1rem",
                  fontWeight: 400,
                  fontFamily: undefined,
                },
              },
            },
            {
              y: 8,
              y2: 0,
              borderColor: "#ff0000",
              fillColor: "#ff0000",
              opacity: 0.3  ,
              offsetX: 0,
              offsetY: -3,
              width: "100%",
              yAxisIndex: 0,
              label: {
                borderColor: "#c2c2c2",
                borderWidth: 1,
                borderRadius: 2,
                text: 'Eliminatoire',
                textAnchor: "start",
                position: "left",
                style: {
                  background: "#ff0000",
                  color: "#000",
                  fontSize: "1rem",
                  fontWeight: 400,
                  fontFamily: undefined,
                },
              },
            },
          ],
        },
        markers: {
          size: 10,
          colors: "#fff",
          strokeColors: "#fff",
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
      },
    };
  },
  computed: {},
  methods: {
    ...mapActions(["getGroupAnalytics"]),
    async populateChart() {
      console.log("here");
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
        for (const testStats of Object.values(
          grpAnalytics.mods[modKey].tests
        )) {
          // console.log(values);
          avgData.push(testStats.avg);
          minData.push(testStats.min);
          maxData.push(testStats.max);
          categories.push(i++);
        }
      }
      console.log(avgData);
      console.log(categories);

      let chartOptions = Object.assign({}, this.chartOptions);
      chartOptions.xaxis.categories = categories;
      this.chartOptions = Object.assign({}, chartOptions);

      this.series = [
        {
          name: "average",
          type: "line",
          data: avgData,
        },
        {
          name: "min",
          type: "line",
          data: minData,
        },
        {
          name: "max",
          type: "line",
          data: maxData,
        },
      ];
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