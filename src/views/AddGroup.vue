<template>
  <base-body class="capitalize">
    <template v-slot:title>ADD A NEW GROUP</template>
    <template v-slot:content>
      <div class="space-y-3">
        <h1 class="font-semibold mb-2 text-2xl">name your group</h1>
        <div class="ml-8 w-80">
          <base-input
            name="group name"
            type="text"
            tmp="Group Name"
            maxLen="32"
          ></base-input>
        </div>
      </div>
      <div>
        <h1 class="font-semibold mb-2 text-2xl">notes</h1>
        <div class="ml-8 flex flex-row justify-between w-3/4 space-x-20">
          <base-input name="validation" type="number" value="12"></base-input>
          <base-input name="eliminatoire" type="number" value="8"></base-input>
          <base-input name="assez bien" type="number" value="14"></base-input>
          <base-input name="bien" type="number" value="16"></base-input>
          <base-input name="excellent" type="number" value="18"></base-input>
        </div>
      </div>
      <div>
        <h1 class="font-semibold mb-2 text-2xl">Optional Info</h1>
        <div class="ml-8 w-3/4">
          <base-input
            name="description"
            type="text"
            tmp="..."
            maxLen="137"
          ></base-input>
        </div>
      </div>

      <div class="absolute bottom-2 right-2">
        <button class="capitalize rounded-none bg-blue-base px-10 py-2.5 text-2xl font-semibold text-black-base hover:bg-blue-light-1 transition duration-200">
          done
        </button>
      </div>
    </template>
  </base-body>
</template>

<script>
import BaseInput from "../components/BaseComponent/BaseInput";
import BaseBody from "../components/BaseComponent/BaseBody";
// import BaseInput from '../components/BaseComponent/BaseInput.vue';

export default {
  name: "AddGroup",
  components: { BaseBody, BaseInput },
};
</script>