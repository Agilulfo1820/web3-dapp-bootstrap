import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'
import Web3Modal from "web3modal"
import {ethers} from "ethers"
import WalletConnectProvider from "@walletconnect/web3-provider"
import axios from "axios"
import VueAxios from "vue-axios"
import {BNB_RPC, GOERLI_RPC} from "./utils/constants"
import Vuethereum from "vuethereum"
import VueClipboard from 'vue-clipboard2'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(Vuethereum)
Vue.use(VueClipboard)

const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider, // required
        // options: {
        //     rpc: {
        //         56: BNB_RPC,
        //         1: 'https://mainnet.infura.io/v3/',
        //     },
        //     chainId: 56,
        //     network: 'binance',
        //     infuraId: "62034761e1a04f9da698903f3b2df39b",
        // },
        options: {
            rpc: {
                5: GOERLI_RPC,
                1: 'https://mainnet.infura.io/v3/',
            },
            chainId: 5,
            network: 'goerli',
            infuraId: "62034761e1a04f9da698903f3b2df39b",
        },
    },
}

const web3Modal = new Web3Modal({
    network: "goerli", // optional
    cacheProvider: true, // optional
    disableInjectedProvider: false,
    providerOptions, // required
})


Vue.prototype.$web3Modal = web3Modal

Vue.filter('fromWei', function (value) {
    if (!value) return '0'
    return ethers.utils.formatEther(value)
})

Vue.filter('networkName', function (value) {
    console.log('networknamevalue', value)
    // if (value === 56 || value === '0x38') {
    //     return 'BNB Smart Chain'
    // } else {
    //     return 'Wrong network'
    // }

    if (value === 5 || value === '0x5') {
        return 'Goerli Testnet'
    } else {
        return 'Wrong network'
    }
})

Vue.filter('abbreviateAddress', (value) => {
    if (!value)
        return ''

    return value.slice(0, 6) + '...' + value.slice(value.length - 4, value.length)
})

Vue.filter('truncatePrice', (value) => {
    if (value !== 0 && !value) {
        return ''
    }

    if (value === "-") {
        return value
    }

    let price = Number(value).toFixed(5)
    return parseFloat(price.slice(0, -1))
})

Vue.filter('truncatePriceTwoDigits', (value) => {
    if (value !== 0 && !value) {
        return ''
    }

    if (value === "-") {
        return value
    }

    let price = Number(value).toFixed(3)
    return parseFloat(price.slice(0, -1))
})

Vue.filter('numberWithCommas', (value) => {
    let parts = value.toString().split(",")
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return parts.join(".")
})


Vue.use(VueApollo)

const apolloClient = new ApolloClient({
    // You should use an absolute URL here
    uri: 'https://api.thegraph.com/subgraphs/name/1hive/uniswap-v2',
})

const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
})


new Vue({
    router,
    store,
    vuetify,
    apolloProvider,
    render: h => h(App),
}).$mount('#app')

