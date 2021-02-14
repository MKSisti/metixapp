<template>
  <div class="h-screen text-black-light-15">
    <div class="grid grid-cols-6 h-full">
      <sidebar class="col-span-1 z-50"/>
      <div class="bg-black-base pl-10 pt-4 col-span-5 z-20">
        <!-- content -->
        <add-group/>
        <!-- <router-view></router-view> -->
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "../src/components/TheSidebar.vue";
import AddGroup from "../src/views/AddGroup.vue";

export default {
  components: { Sidebar, AddGroup },
};
</script>

<style>

</style>
