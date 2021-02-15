<template>
  <div>
    <label :for="name" class="block text-xl font-light uppercase">
      {{ name }}
    </label>
    <input
      v-model="value"
      :type="type"
      :name="name"
      :id="id ? id : name"
      class="transition duration-200 border-black-light-15 border-opacity-30 border-2 bg-transparent text-xl placeholder-black-light-15 placeholder-opacity-30 px-6 py-4 w-full focus:outline-none focus:border-black-light-15"
      :placeholder="tmp"
      autocomplete="none"
      :maxlength="maxLen"
      min="0"
    />
  </div>
</template>

<script>
export default {
  name: "BaseInput",
  props: ["id", "name", "type", "tmp", "maxLen", "modelValue"],
  emits: ["update:modelValue"],
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
};
</script>

