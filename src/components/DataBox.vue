<template>
    <div v-if="$route.path == '/global'" class="flex flex-col h-full">
        <div class="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 pt-5 md:pt-10">   
            <div class="flex flex-col w-full md:w-1/3 space-y-0 md:space-y-3 bg-white p-3 rounded-md shadow-md">
                <h3>Confirmed</h3>
                <span>New Confirmed : {{ numberWithCommas(stats.NewConfirmed) }}</span>
                <span>Total Confirmed : {{ numberWithCommas(stats.TotalConfirmed) }}</span>
            </div>
            <div class="flex flex-col w-full md:w-1/3 space-y-0 md:space-y-3 bg-white p-3 rounded-md shadow-md">
                <h3>Deaths</h3>
                <span>New Deaths : {{ numberWithCommas(stats.NewDeaths) }}</span>
                <span>Total Deaths : {{ numberWithCommas(stats.TotalDeaths) }}</span>
            </div>
            <div class="flex flex-col w-full md:w-1/3 space-y-0 md:space-y-3 bg-white p-3 rounded-md shadow-md">
                <h3>Recovered</h3>
                <span>New Recovered : {{ numberWithCommas(stats.NewRecovered) }}</span>
                <span>Total Recovered : {{ numberWithCommas(stats.TotalRecovered) }}</span>
            </div>
        </div>
        <div class="flex flex-col text-center">
            <h2 class="mt-5 md:mt-10 text-xl text-gray-800 text-center">Global Chart</h2>
        </div>
        <div class="flex flex-grow h-full bg-white p-3 mt-3 rounded-md shadow-md">
            <GlobalChart />
        </div>
    </div>
    <div v-else class="flex flex-col h-full">
        <div class="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 pt-5 md:pt-10">           
            <div class="flex flex-col w-full md:w-1/3 space-y-0 md:space-y-3 bg-white p-3 rounded-md shadow-md">
                <h3>Confirmed</h3>
                <span class="pt-1 md:pt-0">New Confirmed : {{ numberWithCommas(countries.NewConfirmed) }}</span>
                <span>Total Confirmed : {{ numberWithCommas(countries.TotalConfirmed) }}</span>
            </div>
            <div class="flex flex-col w-full md:w-1/3 space-y-0 md:space-y-3 bg-white p-3 rounded-md shadow-md">
                <h3>Deaths</h3>
                <span class="pt-1 md:pt-0">New Deaths : {{ numberWithCommas(countries.NewDeaths) }}</span>
                <span>Total Deaths : {{ numberWithCommas(countries.TotalDeaths) }}</span>
            </div>
            <div class="flex flex-col w-full md:w-1/3 space-y-0 md:space-y-3 bg-white p-3 rounded-md shadow-md">
                <h3>Recovered</h3>
                <span class="pt-1 md:pt-0">New Recovered : {{ numberWithCommas(countries.NewRecovered) }}</span>
                <span>Total Recovered : {{ numberWithCommas(countries.TotalRecovered) }}</span>
            </div>
        </div>
        <div class="flex flex-grow h-full bg-white p-3 mt-3 rounded-md shadow-md">
            <Chart />
        </div>
    </div>
</template>

<script>
import Chart from '@/components/Chart'
import GlobalChart from '@/components/GlobalChart'

export default {
    name: 'DataBox',
    components: { Chart, GlobalChart },
    props: ['stats', 'countries', 'countriesAll'],
    data() {
        return{
        }
    },
    methods: {
        numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        },
    },
}
</script>
