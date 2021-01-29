<template>
  <div class="h-screen text-black-light-15">
    <div class="grid grid-cols-side h-full">
      <sidebar />
      <div class="bg-black-base pl-10 pt-4">
        <!-- content -->
        <add-group/>
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
.full-height {
  height: 100vh;
}
</style>
