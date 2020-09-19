<template>
  <div id="app">
    <Header/>
    <Quiz/>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Quiz from './components/Quiz.vue'

export default {
  name: 'App',
  components: {
    Header,
    Quiz,
  }
}
</script>

<style>
</style>
