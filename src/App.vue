<template>
  <div class="h-screen text-black-light-15">
    <div v-if="showPop">
      <transition name="fade" appear>
        <base-popup @closeMe="closePrompt" :payload="payload" />
      </transition>
    </div>
    <base-alert
      class="z-50"
      :show="!'[[SHOW__ALERT]]'"
      :text="'[[ALERT__TEXT]]'"
    />
    <div class="grid grid-cols-6 h-full relative">
      <sidebar class="col-span-1 z-20" />
      <div class="bg-black-base col-span-5 z-10">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "../src/components/TheSidebar.vue";
import BaseAlert from "./components/BaseComponent/BaseAlert.vue";
import BasePopup from "./components/BaseComponent/BasePopup";
// import SingleModule from "../src/views/SingleModule.vue";

export default {
  components: { Sidebar, BaseAlert, BasePopup },
  provide() {
    return {
      pushPopup: this.pushPrompt,
      getCode: this.getCode,
      getPopState: this.getPopState,
    };
  },
  data() {
    return {
      showPop: false,
      payload: null,
      code: -1,
    };
  },
  methods: {
    pushPrompt(p) {
      this.payload = p;
      this.showPop = true;
    },
    closePrompt(code) {
      this.showPop = false;
      this.code = code;
      // this.resetCode();
      // console.log(this.code);
    },
    
    getCode() {
      return this.code;
    },
    getPopState() {
      return this.showPop;
    },
  },
  async created() {
    await this.$store.dispatch("initStore");
  },
};
</script>
<style>
a.router-link-exact-active {
  @apply bg-black-base;
}
/* a.router-link-active{
  @apply bg-black-base;
} */
</style>
