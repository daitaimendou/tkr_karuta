<template>
  <div class="quiz">
    <button v-on:click="get_random_playlist">プレイリストを取得</button>
    <div>{{playlist_result}}</div>
  </div>
</template>

<script>
export default {
  data() {
      return {
          playlist_result: 'first'
      }
  },
  methods: {
    get_random_playlist: function () {
        this.playlist_result = 'hugahuga'
        var api_url = 'https://www.googleapis.com/youtube/v3/playlistItems'
        this.$axios
            .get(api_url, {
                params: {
                    part: 'id,snippet',
                    playlistId: 'PLwL8OTDdmtk1CpllAwXsRx1CO8eIk_fcI',
                    maxResults: 3,
                    key: 'AIzaSyDFYvSWSlfrDeS-92coInYlUHpgPqbTSmY'
                }
            }).then(response => {
                console.log(response);
                this.playlist_result = response
            })
    }
  }
}
</script>
