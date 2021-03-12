<template>
  <div
    :class="
      this.$route.params.ModuleId == module.id
        ? 'bg-black-base'
        : 'bg-black-light-1'
    "
    class="w-full h-14 px-7 border-b border-black-light-15 border-opacity-20"
  >
    <div
      @click="goToMod"
      class="w-full flex justify-between items-center flex-row h-full cursor-pointer"
      v-if="!editMode"
    >
      <h1 class="text-xl capitalize">
        {{ module.name }}
      </h1>
      <span
        @click.stop="editMode = true"
        class="text-sm flex justify-center items-center ml-2 text-blue-base"
      >
        <box-icon
          name="pencil"
          type="solid"
          size="cssSize"
          class="w-4 h-4 fill-current"
          v-pre
        ></box-icon>
      </span>
    </div>

    <!--module input, show if user clicks edit -->
    <div
      class="w-full flex justify-between items-center flex-row h-full"
      v-else
    >
      <input
        @change="newModName = $event.target.value"
        :value="module.name"
        type="text"
        class="py-2 h-10 bg-transparent border-2 border-black-light-15 border-transparent focus:outline-none text-xl transition duration-200 -ml-3 pl-3"
      />
      <span
        @click="updateN"
        class="cursor-pointer text-sm flex justify-center items-center ml-2 text-blue-base"
      >
        <box-icon
          name="check"
          size="cssSize"
          class="w-8 h-8 fill-current"
          v-pre
        ></box-icon>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseModule",
  props: ["module", "gid"],
  emits: ["update"],
  data() {
    return {
      newModName: "",
      editMode: false,
    };
  },
  methods: {
    updateN() {
      this.$emit("update", this.module.id, this.newModName);
      this.newModName = "";
      this.editMode = false;
    },
    goToMod() {
      this.$router.push({
        name: "module",
        params: { GroupId: this.gid, ModuleId: this.module.id },
      });
    },
  },
};
</script>