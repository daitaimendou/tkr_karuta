<template>
    <div class="question">
        <YoutubePlayer ref="youtube_player" :video-id="video_id" class="d-none"/>
        <button class="btn btn-primary" @click="playVideo">play</button>
        <button class="btn btn-primary" @click="stopVideo">stop</button>
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
