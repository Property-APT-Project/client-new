<script setup>
import { ref } from 'vue';

const pathString = ref(new URL('@/assets/images/no-image.jpeg', import.meta.url).href);

import "https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js";

import "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js";

</script>

<template>
    <a href="" data-toggle="modal" data-target="#myModal"><img :src="pathString" style="width: 100%;" /></a>

    <!-- Modal -->
    <div class="modal fade" id="myModal" role="dialog">
        <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Modal Header</h4>
                </div>
                <div class="modal-body">
                    <p>Some text in the modal.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>

        </div>
    </div>


</template>

<style scoped>
</style>
