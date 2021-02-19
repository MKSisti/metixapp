<template>
  <!-- :key="note.sid"
        v-for="note in test.notes" -->
  <div
    class="w-1/5 h-80 relative m-2 flex-auto flex justify-between items-start flex-col bg-black-light-5 max-w-md"
  >
    <!-- single student data show and edit -->

    <!-- cne maybe or uneditable internal id to avoid duplicates maybe using UUID lib -->
    <h1 class="text-base capitalize absolute top-2 left-2">
      {{ note.sid }}
    </h1>

    <!-- close btn -->
    <div class="w-full p-2">
      <span
        class="cursor-pointer hover:bg-red-light-1 text-2xl font-bold overflow-hidden bg-red-base text-black-light-5 w-9 h-9 flex justify-center items-center float-right"
      >
        <box-icon
          name="plus"
          size="cssSize"
          class="w-full h-full fill-current transform rotate-45 scale-105"
          v-pre
        ></box-icon>
      </span>
    </div>

    <!-- student name -->
    <h1 class="text-xl capitalize px-8 -mt-6">
      {{ student?.fullName || "deleted Student" }}
    </h1>

    <!-- student note input and show -->
    <base-input
      @change="changeN"
      class="px-8 -mt-8 w-full"
      :id="note.sid + '_note'"
      name="Note"
      :modelValue="note.value"
      type="number"
    ></base-input>

    <!-- update button -->
    <div class="flex w-full justify-end items-center flex-row p-2">
      <button
        @click="emitUpdate(note.sid)"
        :class="hideClass"
        class="capitalize rounded-none bg-blue-base px-6 py-2 text-xl font-semibold text-black-base hover:bg-blue-light-1 transition duration-200"
      >
        update
      </button>
    </div>
  </div>
</template>

<script>
import BaseInput from "./BaseInput";
export default {
  name: "BaseNote",
  props: ["note", "student"],
  components: { BaseInput },
  emits: ["updateN"],
  data() {
    return {
      newNote: null,
      showUpdate: false,
    };
  },
  computed: {
    hideClass() {
      return this.showUpdate
        ? "cursor-pointer "
        : "opacity-0 pointer-events-none";
    },
  },
  methods: {
    emitUpdate(sid) {
      this.$emit("updateN", sid, this.newNote);
      this.showUpdate = false;
    },
    changeN(event) {
      this.showUpdate = true;
      this.newNote = event.target.value;
    },
  },
};
</script>