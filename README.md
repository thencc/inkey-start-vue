# Inkey Starter dApp

This is a project for starting an [Inkey](https://inkey.ncc.la/)-based dApp, written in Vue.

> [Live demo of this project here](https://thencc.github.io/inkey-start-vue-live-demo/)

> [Inkey Docs](https://inkey.ncc.la/docs/)

## How to Use

### 1. Configure Algonaut

```
cp src/algonaut.config.sample.json src/algonaut.config.json
```

Open `src/algonaut.config.json` and configure your node. The sample is configured for Purestake. You can [get a free API Key here](https://developer.purestake.io/).

### 2. Install dependencies & run

```
npm i
npm run dev
```

### 3. Start building!

An overview of the important files in `src/`:

 - `algonaut.ts`: Instantiates and configures Algonaut to use Inkey.
 - `state.ts`: Maintains account state with Vue Reactivity
 - `components/InkeyConnect.vue`: A button that connects to Inkey and displays account information once connected
 - `components/Home.vue`: Contains asset creation & opt-in tests.