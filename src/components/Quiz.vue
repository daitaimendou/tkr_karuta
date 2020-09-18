<template>
  <div class="quiz">
    <div class="container">
        <YoutubePlayer/>
        <button class="btn btn-primary" v-on:click="get_random_playlist">プレイリストを取得</button>
        <div class="row">
            <div v-for="(value, key) in this.choice_videos" :key="key" class="col col-lg-4 col-sm-6 col-12 p-1">
                <ChoiceCard @answer="check_anser" :title="value['title']" :image_url="value['image_url']"/>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import YoutubePlayer from './YoutubePlayer.vue'
import ChoiceCard from './ChoiceCard.vue'
import all_videos from '../assets/all_videos.json'

export default {
    components: {
        YoutubePlayer,
        ChoiceCard
    },
    data() {
      return {
          all_videos: all_videos,
          choice_videos: '',
          hoge: 'yaho'
      }
    },
    created() {
        this.get_random_playlist()
    },
    methods: {
        get_all_videos: function() {
            // var api_url = 'https://www.googleapis.com/youtube/v3/search'
            // this.$axios
            //     .get(api_url, {
            //         params: {
            //             part: 'snippet',
            //             type: 'video',
            //             channelId: 'UClSsb_e0HDQ-w7XuwNPgGqQ',
            //             maxResults: 50,
            //             // key: 'AIzaSyBS958fwoujmju4U9xhrFlV08X3zDLoIf4'
            //             key: 'AIzaSyCARTQFBV1AvSGvzd24uYyiekkWYzO28UU',
            //         }
            //     }).then(response => {
            //         console.log(response);
            //         this.all_videos = response['data']['items'].map(function(item){
            //             return {
            //                 'videoId': item['id']['videoId'],
            //                 'title': item['snippet']['title'],
            //                 'image_url': item['snippet']['thumbnails']['high']['url'],
            //             }
            //         });
            //     })
            this.all_videos = all_videos
        },
        get_random_playlist: function () {
            console.log("get_random_playlist")
            this.choice_videos = this.choose_at_random(this.all_videos, 6)
        },
        check_anser: function(){
            alert('hoge')
        },
        choose_at_random: function(arrayData, count) {
            // countが設定されていない場合は1にする
            count = count || 1;
            var result = [];
            for (var i = 0; i < count; i++) {
                if (arrayData.length == 0){
                    break;
                }
                var arrayIndex = Math.floor(Math.random() * arrayData.length);
                result[i] = arrayData[arrayIndex];
                // 1回選択された値は削除して再度選ばれないようにする
                arrayData.splice(arrayIndex, 1);
            }
            return result;
        }
    }
}
</script>
