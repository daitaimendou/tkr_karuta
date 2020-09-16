<template>
    <div class="youtube_player">
        <youtube class="d-none" :video-id="videoId" ref="youtube"/>
        <button class="btn btn-primary" @click="playVideo">play</button>
        <button class="btn btn-primary" @click="stopVideo">stop</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            videoId: 'Xmrue0acU3M'
        }
    },
    methods: {
        playVideo: function() {
            this.player.playVideo()
            setTimeout(this.stopVideo, 15000);
        },
        stopVideo: function() {
            this.player.stopVideo()
        },
    },
    computed: {
        player() {
            return this.$refs.youtube.player
        }
    }
}
</script>
