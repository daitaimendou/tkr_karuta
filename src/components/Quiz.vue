<template>
  <div class="quiz">
    <YoutubePlayer/>
    <button v-on:click="get_random_playlist">プレイリストを取得</button>
    <div>{{playlist_result}}</div>
  </div>
</template>

<script>
import YoutubePlayer from './YoutubePlayer.vue'

export default {
    components: {
        YoutubePlayer
    },
    data() {
      return {
          playlist_result: 'first',
          all_videos: '',
      }
    },
    created() {
        this.get_all_videos()
    },
    methods: {
        get_all_videos: function() {
            var api_url = 'https://www.googleapis.com/youtube/v3/search'
            this.$axios
                .get(api_url, {
                    params: {
                        part: 'snippet',
                        type: 'video',
                        channelId: 'UClSsb_e0HDQ-w7XuwNPgGqQ',
                        maxResults: 50,
                        key: 'AIzaSyDFYvSWSlfrDeS-92coInYlUHpgPqbTSmY'
                    }
                }).then(response => {
                    console.log(response);
                    this.all_videos = response['data']['items'].map(function(item){
                        return {
                            'videoId': item['id']['videoId'],
                            'title': item['snippet']['title'],
                            'image_url': item['snippet']['thumbnails']['high']['url'],
                        }
                    });
                })
        },
        get_random_playlist: function () {
            console.log("get_random_playlist")
            console.log(this.all_videos)
        }
    }
}
</script>
