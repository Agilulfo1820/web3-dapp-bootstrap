<template>
  <div>
    <v-row class="mt-15 white--text">
      <v-col cols-md="12" colls-xs="12" class="topTextPool px-15" style="text-align: center;">
        <b class="h2 mt-15">Benvenuto! <br> Connetti il tuo wallet per continuare.</b>
        <br/>
        <wallet-status class="mt-15 pb-2 walletHeader" style="justify-content: center"/>
      </v-col>
    </v-row>
    <v-row class="mt-15 white--text">
      <v-col cols-md="12" colls-xs="12" class="topTextPool px-15" style="text-align: center;">
        <b class="h2 mt-15">Non hai un wallet? Installa <a href="https://metamask.io/" target="_blank">Metamask</a> ora.</b>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import WalletStatus from "../Wallet/WalletStatus"
import {mapFields} from "vuex-map-fields"

export default {
  components: {
    WalletStatus,
  },
  data() {
    return {

    }
  },
  methods: {
  },
  computed: {
    ...mapFields("connectweb3", ["account", "isConnected"]),
  },
}
</script>