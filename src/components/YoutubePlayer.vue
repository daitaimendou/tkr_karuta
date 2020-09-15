<template>
    <div class="youtube_player">
        <youtube :video-id="videoId" ref="youtube"/>
        <button class="btn btn-primary" @click="playVideo">play</button>
        <button class="btn btn-primary" @click="stopVideo">stop</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            videoId: 'M7lc1UVf-VE'
        }
    },
    methods: {
        playVideo() {
            this.player.playVideo()
        },
        stopVideo() {
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
