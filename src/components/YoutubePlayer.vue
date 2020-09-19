<template>
    <div class="youtube_player">
        <youtube :video-id="videoId" ref="youtube"/>
    </div>
</template>

<script>
export default {
    props: [
        'videoId',
    ],
    // data() {
    // },
    methods: {
        playVideo: function() {
            this.player.playVideo()
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
