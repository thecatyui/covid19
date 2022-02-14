<template>
  <section class="flex flex-row md:flex-col flex-shrink-0 h-20 md:h-full md:w-72 pl-3 md:px-0 md:py-10 bg-gray-800 text-gray-50 font-mono">
    <router-link to="/" class="flex flex-row items-center mr-auto md:mx-auto md:my-10 w-auto md:w-52 hover:text-gray-300"><font-awesome-icon icon="viruses" class="text-2xl mr-3" /><h1 class="flex text-2xl">Covid-19</h1></router-link>
    <ul class="flex flex-row md:flex-col text-md w-auto md:w-52 h-min m-0 md:m-auto md:mt-10 space-x-2 md:space-x-0 space-y-0 md:space-y-5">
      <router-link to="/" class="flex flex-row items-center hover:text-gray-300 p-3 md:p-0"><font-awesome-icon icon="dna" class="w-auto md:w-6 mr-0 md:mr-3" /><li class="hidden md:block">Japan Realtime</li></router-link>
      <router-link to="../global" class="flex flex-row items-center hover:text-gray-300 p-3 md:p-0"><font-awesome-icon icon="globe-americas" class="w-auto md:w-6 mr-0 md:mr-3" /><li class="hidden md:block">Global Realtime</li></router-link>
      <router-link to="../comunity" class="flex flex-row items-center hover:text-gray-300 p-3 md:p-0"><font-awesome-icon icon="comments" class="w-auto md:w-6 mr-0 md:mr-3" /><li class="hidden md:block">Comunity</li></router-link>
      <router-link to="../news" class="flex flex-row items-center hover:text-gray-300 p-3 md:p-0"><font-awesome-icon icon="newspaper" class="w-auto md:w-6 mr-0 md:mr-3" /><li class="hidden md:block">News</li></router-link>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'SideBar',
}
</script>
