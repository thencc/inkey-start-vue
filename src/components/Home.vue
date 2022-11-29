<template>
    <div class="home">
        <div class="account" v-show="state.account">
            <p><strong>Authenticated Account:</strong> {{ state.account.address }}</p>
            <p><strong>ALGO balance:</strong> {{ state.accountInfo ? state.accountInfo.amount / 1000000 : '' }}</p>
            <p><strong>Created assets:</strong> <span v-for="asset in state.accountInfo['created-assets']" :key="asset.index" class="created-asset"><a :href="'https://testnet.algoexplorer.io/asset/' + asset.index" target="_blank">{{ asset.params.name }}</a></span> </p>
        </div>
        <!-- <div class="account-info"><pre>{{ state.accountInfo }}</pre></div> -->
        <div class="actions" v-if="state.account && state.account.address.length">
            <h3>Tests</h3>
            <p>Let's create an asset and opt into it, using Inkey.</p>

            <p v-if="state.accountInfo && state.accountInfo.amount === 0">Your account has no ALGO! <a :href="'https://dispenser.testnet.aws.algodev.network/?account=' + state.account.address" target="_blank">Click here to use this TestNet dispenser to get some</a>.</p>

            <button v-if="!assetCreated" @click="createAsset()" :disabled="loading && loading.length ? true : false">
                <span v-if="!loading">Step 1: Create Test Asset</span>
                <span v-if="loading">{{ loading }}</span>
            </button>

            <button v-if="assetCreated && !optedIn" @click="optInAsset()" :disabled="loading && loading.length ? true : false">
                <span v-if="!loading">Step 2: Opt Into Test Asset</span>
                <span v-if="loading">{{ loading }}</span>
            </button>

            <p class="success" v-if="optedIn"><strong>You have opted into the test asset!</strong> <a target="_blank" :href="'https://testnet.algoexplorer.io/tx/' + optInTxn">View transaction on chain</a>.</p>

            <p class="error">{{ error }}</p>

            <p class="more">Anything you can do on the Algorand network, you can do with Algonaut, our front-end utility, and sign these transactions with Inkey. Even compiling and deploying smart contracts! <a href="https://thencc.github.io/algonautjs/docs/classes/Algonaut.html" target="_blank">Check out the API docs here</a>.</p>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import InkeyConnect from './InkeyConnect.vue'
import { state } from '../state'
import { algonaut } from '../algonaut'

export default defineComponent({
	data() {
        return {
            state,
            assetCreated: false,
            optedIn: false,
            optInTxn: null as any,
            assetInfo: {} as any,
            loading: null as any,
            error: ''
        }
    },
    computed: {
        createdAssets() {
            var assets = [];
            if (state.accountInfo && state.accountInfo['created-assets']) {
                state.accountInfo['created-assets'].forEach((asset: any) => {
                    assets.push({ })
                })
            }
        }
    },
    methods: {
        async createAsset() { 
            this.error = '';
            this.loading = 'Awaiting signature...';
            try {
                const res = await algonaut.sendTransaction([await algonaut.atomicCreateAsset({
                    assetName: 'Test Asset',
                    symbol: 'TEST',
                    decimals: 3,
                    amount: 100000,
                    metaBlock: ''
                })], {
                    onSign: () => this.loading = 'Sending transaction...',
                    onSend: () => this.loading = 'Waiting for confirmation...',
                    onConfirm: () => this.loading = 'Getting asset info...'
                });

                if (res.status === 'rejected') {
                    this.error = 'The user rejected the request.'
                } else if (res.createdIndex) {
                    this.assetCreated = true;
                    this.assetInfo = await algonaut.getAssetInfo(res.createdIndex);
                    state.accountInfo = await algonaut.getAccountInfo(state.account.address);
                } else if (res.status === 'success') {
                    this.assetCreated = true;
                    this.assetInfo = await algonaut.getAssetInfo(res.meta['asset-index']);
                    state.accountInfo = await algonaut.getAccountInfo(state.account.address);
                } else {
                    console.log(res);
                    this.error = 'Error creating asset.'
                }
            } catch (e) {
                console.error(e);
                this.error = 'Error creating asset. Do you have ALGO in your account?'
            }

            this.loading = null;
        },
        async optInAsset() {
            this.error = '';
            try {
                this.loading = 'Awaiting signature';
                const res = await algonaut.optInAsset(
                    this.assetInfo.index, 
                    {
                        onSign: () => this.loading = 'Sending transaction...',
                        onSend: () => this.loading = 'Waiting for confirmation...',
                        onConfirm: () => this.loading = 'Done!'
                    });

                if (res.status === 'success') {
                    this.optedIn = true;
                    this.optInTxn = res.txId;
                } else {
                    this.error = 'Error opting into asset.'
                }
            } catch (e) {
                console.error(e);
                this.error = 'Error opting into asset.'
            }
            this.loading = null;
        }
    },
	components: {
		InkeyConnect
	}
})
</script>
<style lang="css" scoped>
.created-asset {
    display: inline-block;
    background-color: #eee;
    padding: 2px 5px;
    margin: 0 5px;
    border-radius: 5px;
}

.error {
    color: #e74c3c;
}

.home {
    margin: 0 auto;
    width: 700px;
}
</style>