<template>
    <select @change="onChange()" v-model="selected" class="border-solid border-2 p-1 border-gray-200 rounded-md max-w-xs">
        <option value="0">Select Country</option>
        <option v-for="country in countries" :value="country.ID">{{ country.Country }}</option>
    </select>
</template>

<script>
export default {
    name: 'CountrySelect',
    props: ['countries'],
    data() {
        return {
            selected: 0
        }
    },
    methods: {
        onChange() {
            const country = this.countries.find((item) => item.ID === this.selected)
            this.$emit('get-country', country)
        }
    }
}
</script>