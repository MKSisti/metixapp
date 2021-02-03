<template>
  <div>
    <label :for="name" class="block text-xl font-light uppercase">
      {{ name }}
    </label>
    <input
      :type="type"
      :name="name"
      :id="id ? id : name"
      class="transition duration-200 border-black-light-10 border-2 bg-black-base text-xl placeholder-black-light-10 px-6 py-4 w-full focus:outline-none focus:border-black-light-15"
      :value="value"
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
  props: ["id", "name", "type", "value", "tmp", "maxLen"],
};
</script>

