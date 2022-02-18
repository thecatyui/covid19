<template>
    <canvas class="block max-h-sm" width="100%" height="100%" id="chart"></canvas>
</template>

<script>
import Chart from 'chart.js/auto';
import db from '../firebase/index'
import { collection, doc, getDocs, query, orderBy } from "firebase/firestore";

export default {
    name : 'Chart',
    props: ['dataSet'],
    data() {
      return{
        abc: []
      }
    },
    methods: {
    async getChartData() {
        const docRef = getDocs(collection(db, "covid19"));
        return docRef
    },
    async renderLocalChart() {
    const chartData = await this.getChartData()
    const localData = chartData.docs.map((item) => {
        return {
            date:item.data().Date,
            newConfirmed:item.data().NewConfirmed,
            newRecovered:item.data().NewRecovered,
            newDeaths:item.data().NewDeaths,
        }
    });
    const localNewConfirmed = [localData[0].newConfirmed, localData[1].newConfirmed, localData[2].newConfirmed, localData[3].newConfirmed, localData[4].newConfirmed, localData[5].newConfirmed, localData[6].newConfirmed, localData[7].newConfirmed]
    const localDate = [localData[0].date, localData[1].date, localData[2].date, localData[3].date, localData[4].date, localData[5].date, localData[6].date, localData[7].date]

    const arrayNewConfirmed = localData.map((fullNewConfirmed) => fullNewConfirmed.newConfirmed).reverse().slice(0,14).reverse()
    const arrayNewDeaths = localData.map((fullNewConfirmed) => fullNewConfirmed.newDeaths).slice(0,13)
    const arrayDate = localData.map((fullDate) => fullDate.date).reverse().slice(0,14).reverse()

      let localCtx = document.getElementById("chart");
      new Chart(localCtx, {
        type: 'bar',
        data:{
          labels: arrayDate,
          datasets: [{
            label: 'New Confirmed (JP, 2 weeks)',
            data: arrayNewConfirmed,
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
    this.renderLocalChart();
  },
  async created() {

  },
};
</script>