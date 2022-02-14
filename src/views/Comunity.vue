<template>
  <main v-if="!loading" class="flex flex-col w-screen p-3 md:p-10 h-screen bg-gray-100 font-mono overflow-y-scroll scrollbar-hide">
      <h2 class="text-xl mt-1 md:mt-10 mb-3">Comunity</h2>
      <div v-if="!text" @click="textOn()" class="flex flex-row bg-white px-5 pt-3 rounded-md shadow-md hover:bg-gray-200 cursor-pointer transition duration-150">
        <h3 class="text-lg mt-3 mb-5">Click here to share Covid-19 information in your country<font-awesome-icon icon="pen" class="ml-3" /></h3>
      </div>
      <div v-else class="flex flex-col bg-white p-5 rounded-md shadow-md">
        <div @click="textOff()" class="hover:bg-gray-200 cursor-pointer rounded-md text-center mb-2 py-1">
          <font-awesome-icon icon="times-circle" class="text-red-400"/>
        </div>
        <form class="flex flex-col md:flex-row gap-5" @submit.prevent="addPost()">
          <div id="infoArea" class="flex flex-col space-y-3 w-full md:w-1/4">
            <div class="flex flex-col">
                <span class="text-sm">Title</span>
                <input type="text" id="title" maxlength="20" v-model="titleValue" class="border-b-2 border-gray-700 focus:outline-none text-lg" placeholder="up to 20 characters" required/>
            </div>
            <div class="flex flex-col">
                <span class="text-sm">Name</span>
                <input type="text" id="name" maxlength="10" v-model="nameValue" class="border-b-2 border-gray-700 focus:outline-none text-lg" placeholder="up to 10 characters" required/>
            </div>
            <div class="flex flex-col">
                <span class="text-sm">Country</span>
                <select @change="onChange()" v-model="selected" id="country" class="border-b-2 border-gray-700 focus:outline-none text-lg" required>
                  <option v-for="country in countries" :value="country.Country">{{ country.Country }}</option>
                </select>
            </div>
          </div>
          <div id="messageAre" class="flex flex-col flex-grow">
              <div>
                <span class="text-sm">Message</span>
                <span class="text-sm text-gray-400 float-right">{{ totalLength }} characters</span>
              </div>
              <textarea v-model="message" type="text" maxlength="400" class="h-44 md:h-full border-2 border-gray-700 text-lg p-2" @keyup="charCounter()" placeholder="up to 400 characters" required></textarea>
          </div>
          <div id="buttonArea" class="flex flex-shrink-1 justify-center items-center">
            <button type="submit" class="py-2 md:py-4 px-3 md:px-5 h-auto bg-blue-300 rounded-full shadow-sm text-white text-xl md:text-2xl hover:bg-blue-500"><font-awesome-icon icon="paper-plane" /></button>
          </div>
        </form>
      </div>
      <div>
      <h3 class="text-lg mt-5 mb-3">{{ boardData.length }} information from {{ count.length }} Countries</h3>
      <ul class="flex flex-col-reverse gap-5">
          <li v-for="(board, index) in boardData" class="flex flex-col md:flex-row bg-white p-5 rounded-md shadow-md items-center">
              <span class="hidden md:flex">{{ index + 1 }}</span>
              <div class="flex flex-row md:flex-col w-full md:w-auto md:mx-7 items-center">
                <span class="text-sm text-gray-400 mr-3 md:mr-0 w-12 md:w-auto">Date</span>
                <span>{{ board.boardDate }}</span>
              </div>
              <div class="flex flex-row md:flex-col w-full md:w-1/12 items-center">
                <span class="text-sm text-gray-400 mr-3 md:mr-0 w-12 md:w-auto">Name</span>
                <span>{{ board.boardName }}</span>
              </div>
              <div class="flex flex-row md:flex-col w-full md:w-2/12 items-center">
                <span class="text-sm text-gray-400 mr-3 md:mr-0 w-12 md:w-auto">Title</span>
                <span>{{ board.boardTitle }}</span>
              </div>
              <div class="flex flex-row md:flex-col w-full md:w-5/12 items-center">
                <span class="text-sm text-gray-400 mr-3 md:mr-0 w-12 md:w-auto">Message</span>
                <span class="break-all mt-2 mb-2 md:mt-0 md:mb-0">{{ board.boardMessage }}</span>
              </div>
              <div class="flex flex-row md:flex-col ml-auto items-center">
                <span class="text-sm text-gray-400 text-right mr-3 md:mr-0 md:ml-auto">from</span>
                <span class="ml-auto">{{ board.boardCountry }}</span>
              </div>
          </li>
      </ul>
      </div>
  </main>

  <main v-else class="flex p-10 flex-grow h-screen align-center justify-center items-center bg-gray-100">
    <img :src="loadingImage" class="w-14 h-14">
  </main>
</template>

<script>
import moment from 'moment'
import db from '../firebase/index'
import { collection, doc, addDoc, getDocs, serverTimestamp, query, orderBy } from "firebase/firestore";
import { defineComponent, computed, reactive } from 'vue'
import { useHead } from '@vueuse/head'

export default {
  name: 'Comunity',
  setup() {
    const siteData = reactive({
      title: `Realtime Covid-19 Information | Comunity`,
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
      message: null,
      totalLength: 400,
      countries: [],
      text:false,
      selected: null,
      titleValue: null,
      nameValue: null,
      countryValue : null,
      loading:true,
      boardTitle: {},
      boardName: {},
      boardMessage: {},
      boardDate: {},
      boardCountry: {},
      boardData: [],
      count: [],
      loadingImage: require('/src/assets/loader.gif'),
    }
  },
  // computed: {
  //   timestamp: function() {
  //       return moment(this.boardDate).format('YYYY-MM-DD')
  //   }
  // },
  methods: {
  async addPost() {
    await addDoc(collection(db, "comunity"), {
      message: this.message,
      title: this.titleValue,
      name: this.nameValue,
      country : this.selected,
      timestamp: serverTimestamp()
    })
    this.message = null;
    this.titleValue = null;
    this.nameValue = null;
    this.selected = null;
    this.$router.go()
  },
  async getBoardData() {
      const boardRef = getDocs(query(collection(db, "comunity"), orderBy("timestamp", "asc")));
      return boardRef
  },
  async fecthCovidData() {
    const res = await fetch('https://api.covid19api.com/summary')
    const data = await res.json()
    return data
  },
  getCountryData(country) {
    this.stats = country
    this.title = counrty.Country
  },
  onChange() {
    const country = this.countries.find((item) => item.Country === this.selected)
    this.$emit('get-country', country)
  },
  charCounter() {
    this.totalLength = 400 - this.message.length
  },
  textOn() {
    this.text=true
  },
  textOff() {
    this.text=false
  },
  },
  async created() {
    const data = await this.fecthCovidData()
    this.countries = data.Countries
    const boardDatas = await this.getBoardData()
    this.boardData = boardDatas.docs.map((item) => {
        return {
            boardDate:moment(item.data().timestamp.toDate()).format('YYYY-MM-DD'),
            boardMessage:item.data().message,
            boardCountry:item.data().country,
            boardName:item.data().name,
            boardTitle:item.data().title,
        }
    });
    this.loading = false
    const length = this.boardData.length
    for (var i = 0; i < length; i++) {
      const number = this.boardData[i].boardCountry
      this.count = [...new Set(this.count.concat(number))]
    }
  },
}
</script>
