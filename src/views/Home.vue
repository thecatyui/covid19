<template>
  <main v-if="!loading" class="flex flex-col w-screen p-3 md:p-10 h-screen bg-gray-100 font-mono overflow-y-scroll scrollbar-hide">
    <DataTitle :text="title" :dataDate="dataDate" />
    <DataBox :countries="countries" :dataDate="dataDate" />
  </main>

  <main v-else class="flex p-10 flex-grow h-screen align-center justify-center items-center bg-gray-100 scrollbar-hide">
    <img :src="loadingImage" class="w-14 h-14">
  </main>
</template>

<script>
import DataTitle from '@/components/DataTitle'
import DataBox from '@/components/DataBox'
import CountrySelect from '@/components/CountrySelect'
import LineChart from '@/components/Chart'
import moment from 'moment'
import db from '../firebase/index'
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { defineComponent, computed, reactive } from 'vue'
import { useHead } from '@vueuse/head'

export default {
  name: 'Home',
  components: {
    DataTitle,
    DataBox,
    CountrySelect,
    LineChart
  },
  setup() {
    const siteData = reactive({
      title: `Realtime Covid-19 Information`,
      description: `Check out the Global/Japan realtime covid-19 information here. Also you can get the latest news and recent condition from another country.`,
      keywords: `covid, covid19, corona, corona19, corona virus, covid-19, virus, omicron, vaccine, booster shot, covid news, covid information`
    })

    useHead({
      // Can be static or computed
      title: computed(() => siteData.title),
      meta: [
        {
          name: `description`,
          content: computed(() => siteData.description),
        },
        {
          name: `keywords`,
          content: computed(() => siteData.keywords),
        },
        {
          name: `meta`,
          content: `website`,
        },
        {
          name: `robots`,
          content: `index, follow`,
        }
      ],
    })
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
    async fecthCovidNews() {
      const resNews = await fetch('https://api.nytimes.com/svc/search/v2/articlesearch.json?q=japan%20covid&api-key=BvHpcDXrwppSYKGRIgtALKjg5Te2zAU0')
      const newsData = await resNews.json()
      return newsData
    },
    getCountryData(country) {
      this.stats = country
      this.title = counrty.Country
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
    const newsData = await this.fecthCovidNews()
    this.covidNews = newsData.response.docs
    this.dataDate = data.Date
    this.stats = data.Global
    this.countries = data.Countries.find((item) => item.Country === "Japan")
    this.loading = false
    const docName = moment(this.dataDate).format('YYYY-MM-DD')
    await setDoc(doc(db, "covid19", docName), {
      Country: this.countries.Country,
      NewConfirmed: this.countries.NewConfirmed,
      NewDeaths: this.countries.NewDeaths,
      NewRecovered: this.countries.NewRecovered,
      TotalConfirmed: this.countries.TotalConfirmed,
      TotalConfirmed: this.countries.TotalConfirmed,
      TotalRecovered: this.countries.TotalRecovered,
      Date : docName,
      ServerTime : this.countries.Date
    }, { merge: true }, { capital: true })
    await setDoc(doc(db, "global19", docName), {
      NewConfirmed: data.Global.NewConfirmed,
      NewDeaths: data.Global.NewDeaths,
      NewRecovered: data.Global.NewRecovered,
      TotalConfirmed: data.Global.TotalConfirmed,
      TotalConfirmed: data.Global.TotalConfirmed,
      TotalRecovered: data.Global.TotalRecovered,
      Date : docName,
      ServerTime : data.Global.Date
    }, { merge: true }, { capital: true })
  },
}
</script>
