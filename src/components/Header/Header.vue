<template>
  <div class="headerMain">
    <div id="desktopHeader">
      <v-col cols="2" id="pinnedLeftHeader">
        <div style="justify-content: center; display: flex; width: fit-content">
          <router-link :to="{ name: 'Home'}" id="snafuText"> <img src="logo.png" style="width: 40px;"></router-link>
        </div>
      </v-col>

      <v-col cols="8" offset="1" id="subtitle">
<!--        <router-link class="backHome" :to="{ name: 'Home'}">Home</router-link>-->
      </v-col>

      <v-col cols="2" style="display: inline-flex;align-items: center;text-decoration: none !important; color: #303030">
        <wallet-status class="mt-5 pb-2 walletHeader" style="justify-content: end"/>
      </v-col>
    </div>

    <div id="mobileHeader">
      <div id="mobileHeaderContainer">
        <div id="mobileLogoContainer">
          <img src="logo.png" alt="logo" id="logoMobile">
          <router-link :to="{ name: 'Home'}" id="snafuTextMobile"></router-link>
        </div>
      </div>

      <div id="menuMobile">
        <wallet-status :connectEnabledOnMobile="false" class="mt-5 pb-2 walletHeader" style="justify-content: center;"/>
      </div>
    </div>
  </div>
</template>

<script>
import {Slide} from 'vue-burger-menu'
import WalletStatus from '../Wallet/WalletStatus.vue'

export default {
  components: {
    WalletStatus,
    // Slide
  },
  methods: {
    handleOpenMenu() {
      document.querySelector(".bm-burger-button").style.display = 'none'
    },
    handleCloseMenu() {
      document.querySelector(".bm-burger-button").style.display = 'block'
    },
  },
  data() {
    return {
      windowWidth: window.innerWidth.toString(),
    }
  },
  computed: {
    currentRouteName() {
      return this.$route.meta.headerSubtitle
    },
  },
}
</script>

<style>
.highlightOnHover:hover {
  background-color: #a7a7a752;
}
.headerMain {
  /*position: absolute;*/
  width: 100%;
  top: 0;
}

@media screen and (min-width: 769px) {
  #menuMobile {
    display: none;
  }

  #mobileHeader {
    display: none;
  }

  #pinnedLeftHeader {
    position: absolute;
    top: 45px;
    display: inline-table;
    z-index: 1;
    left: 80px;
    width: fit-content;
  }

  #logo {
    width: 65px;
    height: 65px;
    position: absolute;
    top: 125px;
    left:123px;
    cursor: pointer;
  }

  #transformedText {
    transform: rotate(
        270deg
    );
  }

  #desktopHeader {
    display: flex;
    align-content: center;
    align-items: center;
    padding: 0 20px;
    margin-top: 30px;
  }

  #desktopHeader > #subtitle {
    /*position: absolute;*/
    /*top: 50px;*/
    /*left: 250px;*/
    font-weight: bold;
    letter-spacing: 0.1em;
    font-size: 17px;
  }

  #menuDesktop {
    position: fixed;
    right: 3vw;
    top: 50px;
    display: grid;
  }

  .backHome {
    text-decoration: unset;
    color: rgb(143, 143, 143) !important;
    font-size: 15px;
    font-weight: 600;
    padding: 0 5px;
    margin: 0 10px;
  }

  .backHome:hover {
    color: #303030 !important;
    /* position: absolute; */
    left: 0;
    bottom: 1px;
    border-width: 0 0 1px;
    border-top-width: 0px;
    border-right-width: 0px;
    border-bottom-width: 1px;
    border-left-width: 0px;
    border-style: solid;
  }

  .v-application a {
    /*color: #303030 !important;*/
  }

  a.backHome.router-link-exact-active.router-link-active {
    color: #303030 !important;
    /* position: absolute; */
    left: 0;
    bottom: 1px;
    border-width: 0 0 1px;
    border-top-width: 0px;
    border-right-width: 0px;
    border-bottom-width: 1px;
    border-left-width: 0px;
    border-style: solid;
  }

  .arrowRedirect:before {
    font-size: 13px;
    padding-bottom: 7px;
  }
}

@media screen and (max-width: 768px) {
  #desktopHeader {
    display: none;
  }

  #mobileHeader {
    display: block;
  }

  #logoMobile {
    cursor: pointer;
    margin-top: 2px;
  }

  #snafuTextMobile {
    text-decoration: unset;
    font-size: 30px;
    font-weight: bold;
    color: #303030;
    letter-spacing: 0.05em;
    line-height: 1.2em;
  }

  #subtitleMobile {
    margin-top: 5px;
    font-weight: bold;
    letter-spacing: 0.2em;
    font-size: 16px;
  }

  #subtitleMobile > a {
    text-decoration: unset;
    color: #303030;
  }

  #mobileHeader {
    margin-top: 20px;
    justify-content: center;
  }

  #mobileHeaderContainer{
    text-align: center;
  }

  .bm-burger-button {
    cursor: pointer;
    height: 30px;
    left: 36px;
    position: absolute;
    top: 30px;
    width: 30px;
  }

  .line-style {
    height: 8% !important;
    left: 0;
    position: absolute;
    right: 0;
  }

  .bm-cross-button {
    height: 40px;
    width: 40px;
  }

  span.bm-cross-button.cross-style {
    right: 30px !important;
    margin-top: 15px;
  }

  span.bm-cross {
    height: 30px !important;
  }

  .bm-menu {
    background-color: #303030;
    height: 100%;
    left: 0;
    overflow-x: hidden;
    padding-top: 60px;
    position: fixed;
    top: 0;
    transition: .5s;
    z-index: 1000;
    opacity:1;
  }

  .bm-item-list > * {
    display: flex;
    padding: .7em 1.5em !important;
    text-decoration: none;
    font-size: 27px;
    padding-top: 6px !important;
    justify-content: flex-end;
    font-weight: 500;
    letter-spacing: 2px;
    white-space: nowrap;
  }

  .bm-item-list {
    margin-top: 25px;
  }

  #menuMobile > div > div > div.bm-menu > nav > a.backHome.router-link-exact-active.router-link-active {
    color: rgb(143, 143, 143) !important;
  }

  #menuMobile > div > div > div.bm-menu > nav > a {
    color: white;
  }

  .arrowRedirect:before {
    font-size: 18px;
    padding-bottom: 5px;
    color: white;
  }

}
</style>