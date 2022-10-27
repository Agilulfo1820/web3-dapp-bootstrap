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
    }
  },
  methods: {
  },
  computed: {
    ...mapFields("connectweb3", ["isConnected"]),
  },
}
</script>

<style>
</style>
