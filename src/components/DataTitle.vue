<template>
    <div v-if="$route.path == '/global'" class="text-center">
        <h2 class="mt-3 md:mt-10 text-xl text-gray-800 text-center">{{text}}</h2>
        <div>{{timestamp}}</div>
    </div>
    <div v-else class="text-center">
        <h2 class="mt-3 md:mt-10 text-xl text-gray-800 text-center">Realtime Covid-19 in Japan</h2>
        <div>{{timestamp}}</div>
    </div>
</template>

<script>
import moment from 'moment'

export default {
    name: 'DataTitle',
    props: ['text', 'dataDate'],
    computed: {
        timestamp: function() {
            return moment(this.dataDate).format('YYYY-MM-DD')
        }
    }
}
</script>