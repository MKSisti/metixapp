<template>
  <!-- :key="note.sid"
        v-for="note in test.notes" -->
  <div
    class="w-1/5 h-80 relative m-2 flex-auto flex justify-center items-start flex-col bg-black-light-5 max-w-md"
  >
    <!-- single student data show and edit -->

    <!-- cne maybe or uneditable internal id to avoid duplicates maybe using UUID lib -->
    <h1 class="text-base capitalize absolute top-2 left-2">
      {{note.cne}}
    </h1>

    <div class="flex-grow"></div>
    <!-- student name -->
    <h1 class="text-xl capitalize px-8 mb-10">
      {{ note.fullName }}
    </h1>

    <!-- student note input and show -->
    <base-input
      @update:modelValue="changeN"
      class="px-8 -mt-8 w-full"
      :id="note.cne + '_note'"
      name="Note"
      :modelValue="note.value"
      type="number"
    ></base-input>

    <div class="flex-grow"></div>

    <!-- update button -->
    <div class="flex w-full justify-end items-center flex-row p-2">
      <button
        @click="emitUpdate()"
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
  props: ["note", "sid"],
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
    emitUpdate() {
      this.$emit("updateN", this.sid, this.newNote);
      this.showUpdate = false;
      
    },
    changeN(event) {
      this.showUpdate = true;
      this.newNote = event.target.value;
    },
  },
};
</script>