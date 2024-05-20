<script setup>
import { ref } from 'vue';
import "https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js";
import "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js";

const props = defineProps({
    photoSrc: String
});
</script>

<template>
    <a href="" data-toggle="modal" data-target="#myModal" style="height: 100%;">
        <img v-if="photoSrc != '@/assets/images/no-image.jpeg' " :src="photoSrc" style="width: 100%; height: 100%;" />
        <img v-else src="@/assets/images/no-image.jpeg" style="width: 100%; height: 100%;"  />
    </a>


</template>

<style scoped>
</style>
