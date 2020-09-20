<template>
    <div>
        <div class="youtube_player embed-responsive embed-responsive-16by9">
            <youtube :video-id="video_id" ref="youtube" @playing="playing" class="embed-responsive-item"/>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'video_id',
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
        pauseVideo: function() {
            this.player.pauseVideo()
        },
        playing: function() {
            this.$emit('changeIsPlaying');
        }
    },
    computed: {
        player() {
            return this.$refs.youtube.player
        },
    }
}
</script>
