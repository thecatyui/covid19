<template>
    <main v-if="!loading" class="flex flex-col w-screen p-3 md:p-10 h-screen bg-gray-100 font-mono overflow-scroll scrollbar-hide">
        <h2 class="text-xl mt-1 md:mt-10">News<span class="text-sm text-gray-500 ml-3">(by NYTimes API)</span></h2>
        <h3 class="text-md md:text-lg mt-1 md:mt-3 mb-3 md:mb-5">Latest 10 news headlines about Japan Covid-19</h3>
        <ul class="space-y-5">
            <li v-for="covidNew in orderedDate">
                <a target="_blank" :href="covidNew.web_url" class="bg-white p-5 rounded-md flex flex-col md:flex-row hover:bg-gray-100">
                    <img :src="`https://www.nytimes.com/` + covidNew.multimedia[0].url" class="rounded-md mr-5 w-full md:w-44 h-auto md:h-32">
                    <div class="flex flex-col">
                        <div class="text-gray-500 mt-2 md:mt-0">{{ dateTime(covidNew.pub_date) }}</div>
                        <div class="font-bold text-lg mb-1 md:mb-0">{{ covidNew.headline.main }}</div>
                        <div>{{ covidNew.abstract }}</div>
                        <div class="text-sm mt-3 text-gray-500 ml-auto md:ml-0">{{ covidNew.byline.original }} </div>
                    </div>
                </a>
            </li>
        </ul>
    </main>

    <main v-else class="flex p-10 flex-grow h-screen align-center justify-center items-center bg-gray-100">
        <img :src="loadingImage" class="w-14 h-14">
    </main>
</template>

<script>
import moment from 'moment'
import _ from 'lodash'

export default {
  name: 'News',
  data() {
    return{
      loading:true,
      covidNews: [],
      loadingImage: require('/src/assets/loader.gif'),
    }
  },
    computed:{
      orderedDate : function(){
          return _.orderBy(this.covidNews, 'pub_date', 'desc');
      }
  },
  methods: {
    async fecthCovidNews() {
      const resNews = await fetch('https://api.nytimes.com/svc/search/v2/articlesearch.json?q=japan%20covid&api-key=BvHpcDXrwppSYKGRIgtALKjg5Te2zAU0')
      const newsDatas = await resNews.json()
      return newsDatas
    },
    dateTime(value) {
        return moment(value).format('YYYY-MM-DD')
    }
  },
  async created() {
    const newsData = await this.fecthCovidNews()
    this.covidNews = newsData.response.docs
    this.loading = false
  },
}
</script>
