<template>
  <div class="h-screen text-black-light-15">
    <base-alert class="z-50" :show="!'[[SHOW__ALERT]]'" :text="'[[ALERT__TEXT]]'" />
    <div class="grid grid-cols-6 h-full relative">
      <sidebar class="col-span-1 z-20" />
      <div class="bg-black-base pt-4 col-span-5 z-10 ">
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
// import SingleModule from "../src/views/SingleModule.vue";

export default {
  components: { Sidebar , BaseAlert},
};
</script>
<style>
</style>
