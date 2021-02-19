<template>
  <div class="h-screen text-black-light-15">
    <div v-if="'[[SHOW__DELETE__POPUP]]'">
      <transition name="fade" appear>
        <base-popup/>
      </transition>
    </div>
    <base-alert class="z-50" :show="!'[[SHOW__ALERT]]'" :text="'[[ALERT__TEXT]]'" />
    <div class="grid grid-cols-6 h-full relative">
      <sidebar class="col-span-1 z-10"/>
      <div class="bg-black-base col-span-5 z-20 ">
        <!-- content -->
        <!-- <single-module/> -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "../src/components/TheSidebar.vue";
import BaseAlert from './components/BaseComponent/BaseAlert.vue';
import BasePopup from './components/BaseComponent/BasePopup'
// import SingleModule from "../src/views/SingleModule.vue";

export default {
  components: { Sidebar , BaseAlert, BasePopup},
};
</script>
<style>
a.router-link-exact-active{
  @apply bg-black-base;
}
/* a.router-link-active{
  @apply bg-black-base;
} */
</style>
