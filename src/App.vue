<template>
  <div class="h-screen text-black-light-15">
    <div v-if="showPop">
      <transition name="fade" appear>
        <base-popup @closeMe="showPop = false" :payload="payload" />
      </transition>
    </div>
    <base-alert class="z-50" :show="!'[[SHOW__ALERT]]'" :text="'[[ALERT__TEXT]]'" />
    <div class="grid grid-cols-6 h-full relative">
      <sidebar class="col-span-1 z-20" />
      <div class="bg-black-base col-span-5 z-10">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import Sidebar from '../src/components/TheSidebar.vue';
  import BaseAlert from './components/BaseComponent/BaseAlert.vue';
  import BasePopup from './components/BaseComponent/BasePopup';
  // import SingleModule from "../src/views/SingleModule.vue";

  export default {
    components: { Sidebar, BaseAlert, BasePopup },
    provide() {
      return {
        pushPopup: this.pushPrompt,
      };
    },
    data() {
      return {
        showPop: false,
        payload: null,
      };
    },
    methods: {
      pushPrompt(p) {
        this.payload = p;
        this.showPop = true;
      },
    },
    async created() {
      let loc = {
        localForage: (await import(/* webpackChunkName: "localForage" */ 'localforage')).default
      };

      let tmpState = [];
      let tmpGrp = {};
      let tmpModules = [];
      let tmpTests = [];
      let tmpStudents = [];

      let keys = await loc.localForage.keys();
      for (const key of keys) {
        if (key.includes('group_')) {
          tmpGrp = JSON.parse(await loc.localForage.getItem(key));

          for (const modId of Object.keys(tmpGrp.modules)) {
            tmpModules.push(JSON.parse(await loc.localForage.getItem(modId)));
          }

          for (const testId of Object.keys(tmpGrp.tests)) {
            tmpTests.push(JSON.parse(await loc.localForage.getItem(testId)));
          }

          for (const stId of Object.keys(tmpGrp.students)) {
            tmpStudents.push(JSON.parse(await loc.localForage.getItem(stId)));
          }

          tmpGrp.modules = tmpModules;
          tmpGrp.tests = tmpTests;
          tmpGrp.students = tmpStudents;
          tmpState.push(tmpGrp);
          
        }
      }

      console.log(tmpState);

      delete loc.localForage;
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
