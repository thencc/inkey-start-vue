<template>
    {{ state.account }}
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import InkeyConnect from './InkeyConnect.vue'
import { state } from '../state'

export default defineComponent({
	data() {
        return {
            state
        }
    },
	components: {
		InkeyConnect
	}
})
</script>
<style lang="scss" scoped>

</style>