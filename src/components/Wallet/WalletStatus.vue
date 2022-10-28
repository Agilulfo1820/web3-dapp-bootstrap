<template>
  <div style="display: flex">
    <div v-if="!isConnected" cols="1">
      <v-btn v-if="connectEnabledOnMobile" @click="connectWallet" style="margin-bottom: 10px">
        Connetti wallet
      </v-btn>
    </div>
    <div cols="9" no-gutters v-else style="display: flex">

      <v-chip style="border: #A7A7A7; background-color: #303030;" class="mr-2">  
        <span style="color: whit; font-weight: 500;">{{ETHBalance | truncatePrice }} ETH</span>
      </v-chip>

      <v-chip
          :color="isGoerliChain ? '#5fb43f' : '#bc423e'"
          :text-color="isGoerliChain ? '#fff' : '#fff'"
          style="margin-bottom: 10px; padding-left: 0"
      >

        <v-chip style="border: #A7A7A7; background-color: #f3f3f3;">
          <v-tooltip bottom style="text-align: center">
            <template v-slot:activator="{ on, attrs }">
              <span style="color: #303030; font-weight: 500; cursor: pointer" v-bind="attrs"
                    v-on="on" @click="goTo('https://blockscan.com/address/' + account)">Connesso a: {{
                  account | abbreviateAddress
                }}</span>
            </template>
            <span>Clicca qui per vedere su explorer</span>
          </v-tooltip>

        </v-chip>

        <v-tooltip bottom style="text-align: center" v-if="!isGoerliChain">
          <template v-slot:activator="{ on, attrs }">
            <span style="padding-left: 5px; font-weight: 500; cursor: pointer"
                  v-bind="attrs" v-on="on" @click="addGoerliToMetamask"
            >{{ chainId | networkName }}</span>
          </template>
          <span >Clicca qui per usare la chain corretta!</span>
        </v-tooltip>
        <span v-else style="padding-left: 5px; font-weight: 500;">{{ chainId | networkName }}</span>
      </v-chip>
    </div>

    <div cols="1" v-if="isConnected" style="margin-left: 10px;margin-top: 2.5px">
      <v-tooltip bottom color="rgb(0 0 0 / 89%)">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              color="#303030"
              dark
              v-bind="attrs"
              v-on="on"
              class="text-h6"
              icon
              style="background-color: whitesmoke;margin-bottom: 10px;"
              small
              @click="disconnectWallet"
          >
            <v-icon size="25px">mdi-exit-to-app</v-icon>
          </v-btn>
        </template>
        <span>Disconnetti</span>
      </v-tooltip>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex"
import {mapFields} from 'vuex-map-fields'

export default {
  components: {},
  props: {
    connectEnabledOnMobile: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data() {
    return {
      dialog: false,
      showConfirmSwap: false,
    }
  },
  methods: {
    ...mapActions("connectweb3", ["connectWallet", "disconnectWallet", "addGoerliToMetamask"]),
    goTo(url) {
      window.open(url, '_blank')
    },
  },
  computed: {
    ...mapFields("connectweb3", ["isConnected", "account", 'chainId', "ETHBalance"]),
    ...mapGetters("connectweb3", ["isMetamask", "isGoerliChain"]),
  },
}
</script>

<style>
</style>