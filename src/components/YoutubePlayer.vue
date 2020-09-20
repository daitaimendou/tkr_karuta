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
        playing: function() {
            this.$parent.is_playing = true;
        },
    },
    computed: {
        player() {
            return this.$refs.youtube.player
        },
    }
}
</script>
