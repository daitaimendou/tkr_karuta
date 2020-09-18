<template>
    <div class="card h-100">
        <img class="img bd-placeholder-img card-img-top" :src="image_url">
        <div class="card-body">
            <p class="card-text">{{title}}</p>
        </div>
    </div>
</template>
<script>
export default {
    props: [
        'videoId',
        'title',
        'image_url',
    ]
}
</script>