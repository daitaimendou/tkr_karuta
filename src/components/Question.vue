<template>
    <div class="question text-center my-3">
        <YoutubePlayer ref="youtube_player" :video_id="video_id" v-on:changeIsPlaying="changeIsPlaying" class="d-none"/>
        <button v-if="is_playing" class="btn btn-primary" @click="stopVideo"><font-awesome-icon :icon="['fas', 'stop']"/> 問題を停止</button>
        <button v-else class="btn btn-primary" @click="playVideo"><font-awesome-icon :icon="['fas', 'play']"/> 問題を再生</button>
    </div>
</template>

<script>
import YoutubePlayer from './YoutubePlayer.vue'

export default {
    components: {
        YoutubePlayer,
    },
    props: ['video_id'],
    data() {
        return {
            is_playing: false,
        }
    },
    methods: {
        playVideo: function() {
            this.$refs.youtube_player.stopVideo();
            this.$refs.youtube_player.playVideo();
            setTimeout(this.stopVideo, 15000);
        },
        stopVideo: function() {
            this.$refs.youtube_player.stopVideo();
            this.is_playing = false;
        },
        changeIsPlaying: function() {
            this.is_playing = true;
        },
    },
}
</script>
