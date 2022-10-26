<script setup lang="ts">
import Home from './components/Home.vue'
import InkeyConnect from './components/InkeyConnect.vue'
import { state } from './state';
</script>

<template>
    <div class="header">
        <h3>Inkey Sample App</h3>
        <InkeyConnect></InkeyConnect>
    </div>
    <Home />
</template>

<style scoped>
.header {
    display: flex;
    width: 100%;
    background-color: #ccc;
}


</style>
