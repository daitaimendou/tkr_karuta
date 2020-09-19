<template>
    <div class="question text-center my-3">
        <YoutubePlayer ref="youtube_player" :video_id="video_id" class="d-none"/>
        <button class="btn btn-primary" @click="playVideo"><font-awesome-icon :icon="['fas', 'play']"/> 問題を再生</button>
    </div>
</template>

<script>
import YoutubePlayer from './YoutubePlayer.vue'

export default {
    components: {
        YoutubePlayer,
    },
    props: ['video_id'],
    methods: {
        playVideo: function() {
            this.$refs.youtube_player.playVideo();
            setTimeout(this.$refs.youtube_player.stopVideo, 15000);
        },
        stopVideo: function() {
            this.$refs.youtube_player.stopVideo();
        },
    },
}
</script>
