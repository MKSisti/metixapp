<template>
  <base-body @keyup.esc="goBackToGrp" class="capitalize">
    <template v-slot:title>
      <div @click="goBackToGrp" class="cursor-pointer w-full flex justify-start items-center flex-row h-full pl-10 pt-4">
        <span class="text-sm flex justify-center items-center text-blue-base">
          <box-icon name="chevron-left" type="solid" size="cssSize" class="w-8 h-8 fill-current mt-1" v-pre></box-icon>
        </span>
        <h1 class="text-4xl font-bold">EDIT GROUP</h1>
      </div>
    </template>
    <template v-slot:subtitles>
      <h1 class="pl-12 pt-2">{{ groupName }}</h1>
    </template>
    <template v-slot:content>
      <transition name="fade-x" @before-leave="beforeLeave" appear>
        <div @keyup.enter="submit" class="space-y-8 pl-10 pt-16 transition-all duration-200 transform-gpu h-full relative">
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

            <div class="absolute bottom-2 left-2 right-2 flex justify-between items-center">
              <button @click="remove" class="capitalize rounded-none bg-red-base px-10 py-2.5 text-2xl font-semibold text-black-base hover:bg-red-light-1 transition duration-200">
                delete
              </button>

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

  export default {
    name: 'AddGroup',
    components: { BaseBody, BaseInput },
    props: ['GroupId'],
    inject: ['pushPopup'/*, 'getCode' , "getPopState"*/],
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
        var err = this.test();
        if (err?.nameErr || err?.notesErr) {
          //display errors
          this.nameErr = err.nameErr ? 'this field is required' : null;
        } else {
          //all good we create
          this.nameErr = null;
          this.notesErr = null;

          this.update({
            id: this.GroupId,
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
          this.goBackToGrp();
        }
      },
      remove() {
        //do delete logic
        this.pushPopup({
          forWhat: 'group',
          gid: this.GroupId,
        });
      },
      goBackToGrp() {
        this.$router.push({
          name: 'group',
          params: {
            GroupId: this.GroupId,
          },
        });
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
        update: 'updateGrp',
      }),
    },
    mounted() {
      //get groupName, vali,
      try {
        var gM = this.$store.getters.getGroupMeta(this.GroupId);
        this.groupName = gM.name;
        this.desc = gM.desc;
        this.vali = gM.def.validation;
        this.eli = gM.def.eliminatoir;
        this.assez = gM.def.assez;
        this.bien = gM.def.bien;
        this.exce = gM.def.excellent;
      } catch (e) {
        this.$router.replace({ name: 'error', params: { error: e } });
      }
    },
  };
</script>
