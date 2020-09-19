<template>
  <div class="quiz m-2">
    <div class="container">
        <Question :video_id="anser_video_id"/>
        <div class="m-1">
            <div class="text-center text-secondary">正解を選択してください</div>
            <div class="row">
                <div v-for="(value, key) in this.choice_videos" :key="key" class="col col-lg-4 col-sm-6 col-12 p-2">
                    <ChoiceCard @answer="check_anser(value['videoId'])" :title="value['title']" :image_url="value['image_url']"/>
                </div>
            </div>
        </div>
        <div v-if="is_display_answer_modal">
            <div class="modal" style="display: block;" >
                <div class="modal-dialog modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-body">
                            <div class="text-center mb-1">
                                <div class="text-danger" v-if="is_correct_answer">
                                    <font-awesome-icon :icon="['far', 'circle']" size="5x"/><br>
                                    正解！
                                </div>
                                <div v-else class="text-info">
                                    <font-awesome-icon :icon="['fas', 'times']" size="5x"/><br>
                                    不正解
                                </div>
                            </div>
                            正解は...
                            <YoutubePlayer :video_id="anser_video_id"/>
                            <div v-if="!is_correct_answer" class="mt-1">
                                <hr>
                                あなたの回答
                                <YoutubePlayer :video_id="choice_video_id"/>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" v-on:click="show_result">結果を表示する</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-backdrop show"></div>
        </div>
        <div v-if="is_display_result_modal">
            <div class="modal" style="display: block;" >
                <div class="modal-dialog modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-body text-center my-4">
                            <div>
                                <div class="my-3"><font size="5">{{MAX_QUIZ_NUM}}問中n問正解！</font><br></div>
                                <!-- 結果をシェアする -->
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" v-on:click="get_question()">もう一回遊ぶ</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-backdrop show"></div>
        </div>
    </div>
  </div>
</template>

<script>
import YoutubePlayer from './YoutubePlayer.vue'
import Question from './Question.vue'
import ChoiceCard from './ChoiceCard.vue'
import all_videos from '../assets/all_videos.json'

export default {
    components: {
        YoutubePlayer,
        Question,
        ChoiceCard,
    },
    data() {
      return {
          MAX_QUIZ_NUM: 1,
          all_videos: all_videos,
          choice_videos: '',
          anser_video_id: '',
          choice_video_id: '',
          is_display_answer_modal: false,
          is_display_result_modal: false,
          is_correct_answer: false,
      }
    },
    created() {
        this.get_question()
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
        get_question: function() {
            this.all_videos = all_videos;
            this.is_display_result_modal = false;
            this.get_random_playlist()
            this.get_answer_video_id()
        },
        get_random_playlist: function () {
            this.choice_videos = this.choose_at_random_list(this.all_videos, 6)
        },
        get_answer_video_id: function() {
            this.anser_video_id = this.choice_videos[this.choose_at_random_index(this.choice_videos)]['videoId'];
        },
        check_anser: function(choice_video_id){
            this.is_display_answer_modal = true
            this.choice_video_id = choice_video_id

            if (choice_video_id == this.anser_video_id) {
                this.is_correct_answer = true
            } else {
                this.is_correct_answer = false
            }
        },
        show_result: function() {
            this.is_display_answer_modal = false
            this.is_display_result_modal = true
        },
        choose_at_random_list: function(arrayData, count) {
            // countが設定されていない場合は1にする
            count = count || 1;
            var result = [];
            for (var i = 0; i < count; i++) {
                if (arrayData.length == 0){
                    break;
                }
                var arrayIndex = this.choose_at_random_index(arrayData)
                result[i] = arrayData[arrayIndex]
                // 1回選択された値は削除して再度選ばれないようにする
                arrayData.splice(arrayIndex, 1);
            }
            return result;
        },
        choose_at_random_index: function(arrayData) {
            return Math.floor(Math.random() * arrayData.length);
        }
    }
}
</script>
