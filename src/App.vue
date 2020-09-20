<template>
  <div id="app" class="bg-red p-2">
    <div class="bg-white">
      <Header/>
      <Quiz/>
      <div class="bg-red py-3 text-center">
        <small class="text-white">
          制作者 <a href="https://twitter.com/daitaimendou" class="text-white" target="_brank">@daitaimendou</a>
           / 
          <a href="https://shinchoku.net/notes/54268" class="text-white" target="_brank">ご意見はこちらまで</a>
        </small>
      </div>
    </div>
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
