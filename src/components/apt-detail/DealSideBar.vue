<script setup>
const props = defineProps({
    sale: Object,
    complex: Object
});

</script>

<template>
    <div class="card w-100 p-3" style="width: 100%; margin: 0; padding-right: 0; ">
        <div class="card-body p-4" style="margin: 0;">
            <div class="mb-4" style="margin-right: 0;">
                <h3 class="fw-semibold">{{ complex.aptName }}</h3>
            </div>
            <div class="mb-4" style="margin-right: 0;">
                <h4 class="fw-semibold">매매 {{ sale.price }}</h4>
            </div>
            <div class="row w-90 m-2 mt-3">
                <div class="col-3 p-0 m-0 align-items-center w-100">
                    <button @click="" class="p-2 w-100 rounded-pill bg-light text-gray align-self-center" type="button"
                        style="font-size: 12px; border: none">
                        관심매물 추가
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>