<template>
    <div class="card h-100" @click="answer">
        <img class="img bd-placeholder-img card-img-top" :src="image_url">
        <div class="card-body">
            <p class="card-text">{{title}}</p>
        </div>
    </div>
</template>
<script>
export default {
    props: [
        'title',
        'image_url',
    ],
    methods: {
        answer(){
            this.$emit('answer');
        }
    }
}
</script>