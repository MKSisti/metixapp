<template>
  <div
    class="bg-black-light-1 flex justify-between items-center flex-col w-full relative flex-none overflow-hidden"
  >
    <!-- testID internal generated ID (incrementing index or uuid) -->
    <h1
      :class="{ collapsedTestID: collapsed }"
      class="text-base capitalize absolute top-2 left-2 transition-all duration-200 delay-200 transform-gpu origin-left"
    >
      {{ test.name }}
    </h1>

    <!-- close btn -->
    <div class="w-full p-2">
      <span
        @click="removeT"
        class="cursor-pointer hover:bg-red-light-1 text-2xl font-bold bg-red-base text-black-light-5 w-9 h-9 flex justify-center items-center float-right"
      >
        <box-icon
          name="plus"
          size="cssSize"
          class="w-full h-full fill-current transform rotate-45 scale-105"
          v-pre
        ></box-icon>
      </span>
    </div>

    <!-- student note container -->
    <div
      :class="{'max-h-0':collapsed, 'pb-10 max-h-screen': !collapsed }"
      class="w-full flex justify-around items-center flex-row flex-wrap transition-all duration-300 transform-gpu overflow-hidden"
    >
      <!-- student note loop -->
      <base-note
        @updateN="updateStudentNote"
        v-for="(note,i) in test.notes"
        :key="note.cne"
        :note="note"
        :sid="i"
      />
    </div>

    <!-- expand button -->
    <div
      class="flex justify-center items-center flex-row cursor-pointer w-8 h-8 group absolute top-0 bg-blue-base hover:bg-blue-light-1"
    >
      <span
        :class="{'rotate-180 mt-1': !collapsed}"
        @click="toggleCollapsed"
        class="cursor-pointer text-sm flex justify-center items-center w-6 h-6 text-black-base transform transition-all duration-200"
      >
        <box-icon
          type="solid"
          name="chevron-down"
          size="cssSize"
          class="w-full h-full fill-current mt-1"
          v-pre
        ></box-icon>
      </span>
    </div>
  </div>
</template>

<script>
import BaseNote from "./BaseNote";

import { mapActions } from "vuex";
export default {
  name: "BaseTest",
  props: ["test", "gid"],
  components: { BaseNote },
  inject: ["studentsData","pushPopup"],
  data() {
    return {
      collapsed: false,
    };
  },
  methods: {
    ...mapActions(["updateNote", "removeTest"]),
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    updateStudentNote(sid, newNote) {
      this.updateNote({
        gid: this.gid,
        tid: this.test.id,
        sid: sid,
        value: newNote,
      });
    },
    removeT() {
      // this.removeTest({
      //   gid: this.gid,
      //   tid: this.test.id,
      //   mid: this.test.module,
      // });
      this.pushPopup({
        forWhat:'test',
        gid: this.gid,
        tid: this.test.id,
        mid: this.test.module,
      });
    },
  },
};
</script>

<style scoped>
.collapsedTestID {
  margin: 0;
  @apply scale-125 top-3;
}
</style>