<template>
  <base-body class="capitalize pl-10 pt-4">
    <template v-slot:title>
      <div class="mb-6">ADD A NEW GROUP</div>
    </template>
    <template v-slot:content>
      <div class="space-y-8">
        <div class="space-y-3">
          <h1 class="font-semibold mb-2 text-2xl">name your group</h1>
          <div class="ml-8 w-80">
            <base-input v-model="groupName" name="group name" type="text" tmp="Group Name" maxLen="32"></base-input>
          </div>
        </div>
        <div>
          <h1 class="font-semibold mb-2 text-2xl">notes</h1>
          <div class="ml-8 flex flex-row justify-between w-3/4 space-x-20">
            <base-input v-model="vali" name="validation" type="number"></base-input>
            <base-input v-model="eli" name="eliminatoire" type="number"></base-input>
            <base-input v-model="assez" name="assez bien" type="number"></base-input>
            <base-input v-model="bien" name="bien" type="number"></base-input>
            <base-input v-model="exce" name="excellent" type="number"></base-input>
          </div>
        </div>
        <div>
          <h1 class="font-semibold mb-2 text-2xl">Optional Info</h1>
          <div class="ml-8 w-3/4">
            <base-input v-model="desc" name="description" type="text" tmp="..." maxLen="137"></base-input>
          </div>

          <div class="absolute bottom-2 right-2">
            <button @click="submit" class="capitalize rounded-none bg-blue-base px-10 py-2.5 text-2xl font-semibold text-black-base hover:bg-blue-light-1 transition duration-200">
              done
            </button>
          </div>
        </div>
      </div>
    </template>
  </base-body>
</template>

<script>
  import BaseInput from '../components/BaseComponent/BaseInput';
  import BaseBody from '../components/BaseComponent/BaseBody';
  // import BaseInput from '../components/BaseComponent/BaseInput.vue';

  export default {
    name: 'AddGroup',
    components: { BaseBody, BaseInput },
    data() {
      return {
        groupName: '',
        vali: 12,
        eli: 8,
        assez: 14,
        bien: 16,
        exce: 18,
        desc: '',
      };
    },
    methods: {
      submit() {
        console.log(this.groupName);
        console.log(this.vali);
        console.log(this.eli);
        console.log(this.assez);
        console.log(this.bien);
        console.log(this.exce);
        console.log(this.desc);
      },
    },
  };
</script>
