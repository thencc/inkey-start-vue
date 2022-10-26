<template>
    <div class="inkey-connect">
        <button @click="inkeyConnect" v-show="!state.account">Connect</button>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { algonaut } from '../algonaut'
import { state } from '../state';

export default defineComponent({
    data() {
        return { 
            state
        }
    },
    methods: {
        async inkeyConnect() {
            const account = await algonaut.inkeyConnect({ siteName: 'Inkey Starter dApp' as any })
            state.account = account;
            state.accountInfo = await algonaut.getAccountInfo(state.account.address);
        }
    }
})
</script>
<style lang="css" scoped>
.inkey-connect {
    flex: 0 0 auto;
}
</style>