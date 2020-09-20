<template>
  <div class="quiz m-2">
    <div class="container">
        <div v-if="is_first" class="text-center p-3 bg-light mx-lg-5">
            匿名ラジオの冒頭15秒を聞いてどの回かを当てるクイズ<br>
            問題がうまく再生されない場合は数秒待って再度再生してください。<br>
            <small>※このクイズはファン作品です。公式とは一切関係ありません。</small><br>
        </div>
        <div class="text-center">
            <font size="7">{{now_quiz_num}}</font>
            <font size="5">/{{MAX_QUIZ_NUM}}問目</font>
        </div>
        <Question ref="question_player" :video_id="answer_video_id"/>
        <div class="m-1 py-3">
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
                                <div v-else class="text-times">
                                    <font-awesome-icon :icon="['fas', 'times']" size="5x"/><br>
                                    不正解
                                </div>
                            </div>
                            正解は...
                            <YoutubePlayer ref="correct_answer_player" :video_id="answer_video_id" v-on:changeIsPlaying="change_correct_answer_playing"/>
                            <div v-if="!is_correct_answer" class="mt-1">
                                <hr>
                                あなたの回答
                                <YoutubePlayer ref="choice_answer_player" :video_id="choice_video_id" v-on:changeIsPlaying="change_choice_answer_playing"/>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button v-if="now_quiz_num < MAX_QUIZ_NUM" type="button" class="btn btn-primary" v-on:click="get_question">次の問題</button>
                            <button v-else type="button" class="btn btn-primary" v-on:click="show_result">結果を表示する</button>
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
                                <div class="my-3"><font size="5">{{MAX_QUIZ_NUM}}問中{{correct_answer_num}}問正解！</font><br></div>
                                <button @click="twitter_share" class="btn btn-twitter btn-sm"><small><font-awesome-icon :icon="['fab', 'twitter']" class="mr-1"/>結果をツイート</small></button>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" v-on:click="set_start()">もう一回遊ぶ</button>
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
          MAX_QUIZ_NUM: 10,
          all_videos: all_videos.concat(),
          choice_videos: '',
          answer_video_id: '',
          choice_video_id: '',
          correct_answer_num: 0,
          now_quiz_num: 0,
          is_display_answer_modal: false,
          is_display_result_modal: false,
          is_correct_answer: false,
          is_first: true,
      }
    },
    created() {
        this.set_start()
    },
    methods: {
        set_start: function() {
            this.is_display_result_modal = false;
            this.correct_answer_num = 0;
            this.now_quiz_num = 0;
            this.is_first = true;
            this.all_videos = all_videos.concat();
            this.get_question();
        },
        get_question: function() {
            window.scrollTo({top: 0});
            this.now_quiz_num += 1;
            this.get_random_playlist()
            this.get_answer_video_id()
            this.is_display_answer_modal = false;
        },
        get_random_playlist: function () {
            this.choice_videos = this.choose_at_random_list(this.all_videos, 6)
        },
        get_answer_video_id: function() {
            this.answer_video_id = "";
            this.answer_video_id = this.choice_videos[this.choose_at_random_index(this.choice_videos)]['videoId'];
        },
        check_anser: function(choice_video_id){
            this.is_first = false;
            this.$refs.question_player.stopVideo();
            this.is_display_answer_modal = true
            this.choice_video_id = choice_video_id

            if (choice_video_id == this.answer_video_id) {
                this.is_correct_answer = true
                this.correct_answer_num += 1
            } else {
                this.is_correct_answer = false
            }
        },
        show_result: function() {
            this.is_display_answer_modal = false
            this.is_display_result_modal = true
        },
        change_correct_answer_playing: function() {
            this.$refs.choice_answer_player.pauseVideo();
            this.$refs.question_player.stopVideo();
        },
        change_choice_answer_playing: function() {
            this.$refs.correct_answer_player.pauseVideo();
            this.$refs.question_player.stopVideo();
        },
        twitter_share: function(){
            var text = "匿名ラジオイントロクイズに" + (this.MAX_QUIZ_NUM) + "問中" + this.correct_answer_num + "問正解しました！"
            var url = "https://daitaimendou.github.io/tkr_karuta"
            var share_url = 'https://twitter.com/intent/tweet?text=' + text + '&url=' + url;
            window.open(share_url, "_blank");
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
