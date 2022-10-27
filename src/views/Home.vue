<template>
  <div style="min-width: 100%">
    <v-container>
      <div v-if="!isConnected">
        <Login/>
      </div>
    </v-container>
  </div>
</template>

<script>
import Login from '../components/Common/Login.vue'
import {mapFields} from "vuex-map-fields"

export default {
  components: {
    Login,
  },
  data() {
    return {
      tab: null,
      items: [
        {tab: 'Wallet', id: 4},
      ],
    }
  },
  methods: {
  },
  computed: {
    ...mapFields("connectweb3", ["account", "isConnected"]),
  },
}
</script>

<style>
</style>
