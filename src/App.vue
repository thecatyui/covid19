<template>
  <div class="flex flex-col md:flex-row h-screen w-screen">
    <SideBar />
    <router-view />
  </div>
</template>

<script>
import SideBar from './components/SideBar'
import Header from './components/Header'

export default {
  components: {
    SideBar,
    Header
  },
}
</script>