<template>
  <div class="h-screen text-black-light-15">
    <div class="grid grid-cols-6 h-full relative">
      <sidebar class="col-span-1 z-50"/>
      <div class="bg-black-base pt-4 col-span-5 z-20">
        <!-- content -->
        <single-module/>
        <!-- <router-view></router-view> -->
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "../src/components/TheSidebar.vue";
import SingleModule from "../src/views/SingleModule.vue";

export default {
  components: { Sidebar, SingleModule },
};
</script>

<style>

</style>
