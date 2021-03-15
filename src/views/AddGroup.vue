<template>
  <base-body class="capitalize">
    <template v-slot:title>
      <div class="w-full flex justify-start items-center flex-row h-full pl-10 pt-4">
        <h1 class="text-4xl font-bold">
          ADD A NEW GROUP
        </h1>
      </div>
    </template>
    <template v-slot:subtitles>
      <h1 class="pl-10 pt-2">A group will hold your students, their modules and tests</h1>
    </template>
    <template v-slot:content>
      <transition name="fade-x" @before-leave="beforeLeave" appear>
        <div @keyup.enter="submit" class="space-y-8 pl-10 pt-16 transition-all h-full transform-gpu relative">
          <div class="space-y-3">
            <h1 class="font-semibold mb-2 text-2xl">name your group</h1>
            <div class="ml-8 w-80">
              <base-input v-model="groupName" name="group name *" type="text" tmp="Group Name" maxLen="32" :error="nameErr" focus="true"></base-input>
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
      </transition>
    </template>
  </base-body>
</template>

<script>
  import BaseInput from '../components/BaseComponent/BaseInput';
  import BaseBody from '../components/BaseComponent/BaseBody';
  import { mapActions } from 'vuex';
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
        nameErr: null,
        notesErr: null,
      };
    },
    methods: {
      submit() {
        var err = this.test();
        if (err?.nameErr || err?.notesErr) {
          //display errors
          this.nameErr = err.nameErr ? 'this field is required' : null;
        } else {
          //all good we create
          this.nameErr = null;
          this.notesErr = null;

          this.add({
            name: this.groupName,
            desc: this.desc,
            defaults: {
              validation: this.vali,
              excellent: this.exce,
              bien: this.bien,
              assez: this.assez,
              eliminatoir: this.eli,
            },
          });
          this.$router.push({
            name: 'group',
            params: {
              GroupId: this.$store.state.groups[this.$store.state.groups.length - 1].id,
            },
          });
        }
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
      ...mapActions({
        add: 'createGrp',
      }),
    },
  };
</script>
