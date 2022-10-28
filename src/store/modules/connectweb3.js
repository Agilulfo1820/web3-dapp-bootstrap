import {ethers} from "ethers"
import detectEthereumProvider from '@metamask/detect-provider';
import {
     GOERLI_RPC,
} from "../../utils/constants"
import {getField, updateField} from 'vuex-map-fields'
import cookie from 'js-cookie'

export default {
    namespaced: true,
    state: {
        connected: {},
        web3: null,
        isConnected: false,
        account: null,
        chainId: null,
        ETHBalance: 0,
    },
    getters: {
        getField,
        getUserAccount: (state) => state.account,
        getUserSigner: (state) => state.connected.signer,
        isMetamask: async (state) => {
            if (state.connected.web3 && state.connected.web3.provider.isMetamask && !state.connected.web3.provider.isMetamask()) {
                return false
            } else {
                return true
            }
        },
        isGoerliChain: (state) => {
            if (state.chainId === 5 || state.chainId === '0x5') {
                return true
            } else {
                return false
            }
        },
    },
    mutations: {
        updateField,
        setIsConnected: (state, payload) => state.isConnected = payload,
        setETHBalance: (state, payload) => state.ETHBalance = payload,
        disconnectWallet: async function (state) {
            state.connected = {}
            state.account = null
            state.isConnected = false
        },
    },
    actions: {
        startWeb3: async function (context) {
            let web3 = new ethers.providers.JsonRpcProvider(GOERLI_RPC)

            context.dispatch("setWeb3", {web3, isConnected: false})

            if (this._vm.$web3Modal.cachedProvider) {
                //This is case where someone already connected
                context.dispatch("connectWallet")
            }
        },
        setWeb3: async function (context, payload) {
            let {web3, isConnected} = payload
            let state = context.state
            console.log("connected", isConnected)

            if (isConnected) {
                state.connected.web3 = web3
                let signer = await web3.getSigner()
                state.connected.signer = signer

                context.state.account = (await signer.getAddress())
                context.state.chainId = (await web3.getNetwork()).chainId

                context.dispatch('updateAssets')
            } else {
                state.web3 = web3
            }

            console.log("setting Web3")
        },
        connectWallet: async function (context) {
            console.log("connecting")

            let provider, hasProvider
            try {
                provider = await this._vm.$web3Modal.connect()
                hasProvider = true
            } catch (err) {
                await context.dispatch("disconnectWallet")
                hasProvider = false
            }

            if (hasProvider) {
                const web3 = new ethers.providers.Web3Provider(provider)
                await context.dispatch("setWeb3", {web3, isConnected: true})
                context.commit("setIsConnected", true)

                // eslint-disable-next-line no-unused-vars
                provider.on("accountsChanged", (accounts) => {
                    context.dispatch("connectWallet")
                })

                // Subscribe to chainId change
                provider.on("chainChanged", (chainId) => {
                    context.state.chainId = chainId
                    console.log('Chain ID: ', context.state.chainId)
                })

                // Subscribe to provider disconnection
                // eslint-disable-next-line no-unused-vars
                provider.on("disconnect", (error) => {
                    console.log('provider disconnect', error)
                    context.dispatch("disconnectWallet")
                })
            }
        },
        disconnectWallet: async function (context) {
            await this._vm.$web3Modal.clearCachedProvider()
            context.dispatch("removeAllCookies")

            context.commit("disconnectWallet")
            context.commit("setIsConnected", false)
        },
        removeAllCookies: () => {
            window.localStorage.clear()

            let names = cookie.get()
            const hostParts = location.host.split('.')
            const domains = hostParts.reduce(
                (acc, current, index) => [
                    ...acc,
                    hostParts.slice(index).join('.'),
                ],
                []
            )

            if (typeof names === 'object' && names !== null) {
                Object.keys(names).forEach(key => {
                    domains.forEach((domain) => cookie.remove(key, { domain }))
                });
            }
        },
        async updateETHBalance(context) {
            if (context.state.connected && context.state.connected.signer) {

                context.state.connected.signer.getBalance().then(async function (balance) {
                    console.log('updated ETH balance', balance.toString())
                    context.commit("setETHBalance", ethers.utils.formatEther(balance.toString()))
                });
                
            } else {
                await context.commit('setETHBalance', 0 );
            }
        },
        updateAssets(context) {
            context.commit("setETHBalance", null)

            context.dispatch("updateETHBalance")
        },
        async addGoerliToMetamask() {
            const provider = await detectEthereumProvider();

            provider.request({
                method: 'wallet_switchEthereumChain',
                params: [{chainId: '0x5'}],
            })
                .then((res) => {
                    console.log('switch', res)
                })
                .catch((e) => {
                    if (e.code === 4902) {
                        provider.request({
                            method: 'wallet_addEthereumChain',
                            params: [
                                {
                                    chainId: '0x5',
                                    chainName: 'Goerli test network',
                                    nativeCurrency: {
                                        name: 'GoerliETH',
                                        symbol: 'GoerliETH', // 2-6 characters long
                                        decimals: 18,
                                    },
                                    rpcUrls: ['https://goerli.infura.io/v3/'],
                                    blockExplorerUrls: ['https://goerli.etherscan.io/'],
                                },
                            ],
                        })
                    }
                })
        }
    },
}
