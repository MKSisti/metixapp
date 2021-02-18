<template>
  <div class="relative">
    <span v-if="error && error != ''" class="absolute -bottom-6 w-full text-red-light-1 flex justify-center items-center"> 
      <box-icon name="error-circle" size="cssSize" class="w-4 h-4 mb-1 fill-current" v-pre></box-icon>
      <h1 class="pl-1">{{error}}</h1>
    </span>
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
      autocomplete="off"
      :maxlength="maxLen"
      min="0" 
    />
  </div>
</template>

<script>
export default {
  name: "BaseInput",
  props: ["id", "name", "type", "tmp", "maxLen", "modelValue",'error'],
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

