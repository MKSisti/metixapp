<template>
  <base-body class="capitalize">
    <template v-slot:title>
      <div class="mb-6 pl-10 pt-4">EDIT GROUP</div>
    </template>
    <template v-slot:content>
      <div class="space-y-8 pl-10 mt-16">
        <div class="space-y-3">
          <h1 class="font-semibold mb-2 text-2xl">name your group</h1>
          <div class="ml-8 w-80">
            <base-input v-model="groupName" name="group name *" type="text" tmp="Group Name" maxLen="32" :error="nameErr"></base-input>
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

          <div class="absolute bottom-2 right-2 flex justify-end items-center space-x-8">
            <button @click="submit" class="capitalize rounded-none bg-blue-base px-10 py-2.5 text-2xl font-semibold text-black-base hover:bg-blue-light-1 transition duration-200">
              done
            </button>
            <button @click="remove" class="capitalize rounded-none bg-red-base px-10 py-2.5 text-2xl font-semibold text-black-base hover:bg-red-light-1 transition duration-200">
              delete
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
  // import { mapActions } from 'vuex';

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
        nameErr: null,
        notesErr: null,
      };
    },
    methods: {
      submit() {
        //do update logic
      },
      remove(){
        //do delete logic
      },
      test() {
        var err = {
          nameErr: null,
          notesErr: null,
        };
        if (this.groupName.length == 0) {
          err.nameErr = true;
        }

        return err;
      },
    },
    mounted(){
      //get groupName, vali,  ...
    }
  };
</script>
