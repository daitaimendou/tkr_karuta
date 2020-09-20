<template>
  <div id="app" class="bg-red p-2">
    <div class="bg-white">
      <Header/>
      <Quiz/>
      <Footer/>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Quiz from './components/Quiz.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Quiz,
    Footer,
  }
}
</script>

<style>
</style>
