<template>
  <v-app class="body-style">
    <Header/>
    <router-view />
    <Footer
      style="margin-top: 100px"
    />
  </v-app>
</template>

<script>
import {mapActions} from "vuex"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"

export default {
  name: "App",

  components: {
    Footer,
    Header
  },

  methods: {
    ...mapActions("connectweb3", ["startWeb3"]),
  },
  beforeMount(){
    this.startWeb3();
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Barlow:200,400,600,800");

html,
body {
  font-family: "Barlow", sans-serif;
}

#app {
  font-family: "Barlow", sans-serif;
}

.container {
  max-width: 1185px !important;
}

a.link {
  color: #303030 !important;
  text-decoration: underline !important;
}

.pointerOnHover {
  cursor: pointer;
}

@media screen and (max-width: 768px) {
  .hideOnMobile {
    display: none !important;
  }
}

@media screen and (min-width: 768px) {
  .hideOnMobile {
    display: block !important;
  }
}
</style>