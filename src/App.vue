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

<style>
.header {
    display: flex;
    width: 100%;
    background-color: #ccc;
    padding: 0 20px;
    justify-content: space-between;
    align-content: stretch;
    align-items: center;
    box-sizing: border-box;
}

h3 {
    flex: 1 1 50%;
}

.inkey-connect {
    flex: 1 1 50%;
    text-align: right;
    margin-left: auto;
}


</style>
