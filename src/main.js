import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Web3Modal from "web3modal"
import {ethers} from "ethers"
import WalletConnectProvider from "@walletconnect/web3-provider"
import axios from "axios"
import VueAxios from "vue-axios"
import {GOERLI_RPC} from "./utils/constants"
import VueClipboard from 'vue-clipboard2'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(VueClipboard)

const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider, // required
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

// used to truncate cryptocurrency balances
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

//usually used for truncate fiat currencies (euro, dollars ...)
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

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App),
}).$mount('#app')

