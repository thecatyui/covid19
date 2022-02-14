<template>
    <canvas class="block max-h-sm" width="100%" height="100%" id="globalChart"></canvas>
</template>

<script>
import Chart from 'chart.js/auto';
import db from '../firebase/index'
import { collection, doc, getDocs } from "firebase/firestore";

export default {
    name : 'GlobalChart',
    props: ['dataSet'],
    data() {
      return{
      }
    },
    methods: {
    async getGlobalChartData() {
        const docGlobalRef = getDocs(collection(db, "global19"));
        return docGlobalRef
    },
    async renderGlobalChart() {
    const chartGlobalData = await this.getGlobalChartData()
    const globalData = chartGlobalData.docs.map((item) => {
        return {
            date:item.data().Date,
            newConfirmed:item.data().NewConfirmed,
            newRecovered:item.data().NewRecovered,
            newDeaths:item.data().NewDeaths,
        }
    });
    const globalNewConfirmed = [globalData[0].newConfirmed, globalData[1].newConfirmed, globalData[2].newConfirmed, globalData[3].newConfirmed, globalData[4].newConfirmed, globalData[5].newConfirmed, globalData[6].newConfirmed, globalData[7].newConfirmed]
    const globalDate = [globalData[0].date, globalData[1].date, globalData[2].date, globalData[3].date, globalData[4].date, globalData[5].date, globalData[6].date, globalData[7].date]

    const arrayGlobalConfirmed = globalData.map((fullNewConfirmed) => fullNewConfirmed.newConfirmed).slice(0,13)
    const arrayGlobalDate = globalData.map((fullDate) => fullDate.date).slice(0,13)

      let globalCtx = document.getElementById("globalChart");
      new Chart(globalCtx, {
        type: 'bar',
        responsive: true,
        data:{
          labels: arrayGlobalDate,
          datasets: [{
            label: 'Global New Confirmed',
            data: arrayGlobalConfirmed,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',

            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',

            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: {
              ticks: {
                beginAtZero:true
              }
            }
          }
        }
      });
    },
  },
  mounted() {
    this.renderGlobalChart();
  },
  async created() {

  },
};
</script>