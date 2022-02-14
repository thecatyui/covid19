<template>
  <main v-if="!loading" class="flex flex-col w-screen p-3 md:p-10 h-screen bg-gray-100 font-mono">
    <div class="ml-auto flex flex-row">
      <button @click="clearCountryData" v-if="stats.Country" class="mr-3 py-1 px-2 bg-blue-300 rounded-md shadow-sm text-white hover:bg-blue-400">Clear</button>
      <CountrySelect @get-country="getCountryData" :countries="countries" />
    </div>
    <DataTitle :text="title" :dataDate="dataDate" />
    <DataBox :stats="stats" />
  </main>

  <main v-else class="flex p-10 flex-grow h-screen align-center justify-center items-center bg-gray-100">
    <img :src="loadingImage" class="w-14 h-14">
  </main>
</template>

<script>
import DataTitle from '@/components/DataTitle'
import DataBox from '@/components/DataBox'
import CountrySelect from '@/components/CountrySelect'
import LineChart from '@/components/Chart'

export default {
  name: 'Global',
  components: {
    DataTitle,
    DataBox,
    CountrySelect,
    LineChart
  },
  data() {
    return{
      loading:true,
      title:'Global',
      dataDate:'',
      stats: {},
      contries: [],
      loadingImage: require('/src/assets/loader.gif'),
    }
  },
  methods: {
    async fecthCovidData() {
      const res = await fetch('https://api.covid19api.com/summary')
      const data = await res.json()
      return data
    },
    getCountryData(country) {
      this.stats = country
      this.title = country.Country
    },
    async clearCountryData() {
      this.loading = true
      const data = await this.fecthCovidData()
      this.title = 'Global'
      this.stats = data.Global
      this.loading = false
    }
  },
  async created() {
    const data = await this.fecthCovidData()
    this.dataDate = data.Date
    this.stats = data.Global
    this.countries = data.Countries
    this.loading = false
  },
}
</script>
