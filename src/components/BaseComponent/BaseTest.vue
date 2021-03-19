<template>
  <div class="bg-black-light-1 flex justify-between items-center flex-col w-full relative flex-none overflow-hidden">
    <!-- testID internal generated ID (incrementing index or uuid) -->
    <h1 :class="{ collapsedTestID: collapsed }" class="text-base capitalize absolute top-2 left-2 transition-all duration-200 delay-200 transform-gpu origin-left">
      {{ test.name }}
    </h1>

    <!-- close btn -->
    <div class="w-full p-2">
      <span @click="removeT" class="cursor-pointer hover:bg-red-light-1 text-2xl font-bold bg-red-base text-black-light-5 w-9 h-9 flex justify-center items-center float-right">
        <box-icon name="plus" size="cssSize" class="w-full h-full fill-current transform rotate-45 scale-105" v-pre></box-icon>
      </span>
    </div>

    <!-- student note container -->
    <div :class="{ 'pb-10': !collapsed }" class="w-full transition-all duration-300 transform-gpu" :style="{ 'height': collapsed ? '0px' : test.height }" ref="stNoteCont">
      <div class="w-full flex justify-start items-start flex-row flex-wrap" v-if="!notesHidden">
        <base-note @updateN="updateStudentNote" v-for="(note, i) in test.notes" :key="note.cne" :note="note" :sid="i" />
      </div>
      <!-- student note loop -->
    </div>

    <!-- expand button, bug fixed 🙃 -->
    <div @click="toggleCollapsed" class="flex justify-center items-center flex-row cursor-pointer w-8 h-8 group absolute top-0 bg-blue-base hover:bg-blue-light-1">
      <span :class="{ 'rotate-180 mt-1': !collapsed }" class="cursor-pointer text-sm flex justify-center items-center w-6 h-6 text-black-base transform transition-all duration-200">
        <box-icon type="solid" name="chevron-down" size="cssSize" class="w-full h-full fill-current mt-1" v-pre></box-icon>
      </span>
    </div>
  </div>
</template>

<script>
  import BaseNote from './BaseNote';

  import { mapActions } from 'vuex';
  export default {
    name: 'BaseTest',
    props: ['test', 'gid'],
    components: { BaseNote },
    inject: ['studentsData', 'pushPopup'],
    data() {
      return {
        collapsed: true,
        notesHidden: false,
        noteHideTimeout:null
      };
    },
    // computed: {
    //   contHeight() {
    //     return this.collapsed
    //       ? "height: 0px;"
    //       : "height:" + Object.keys(this.test.notes).length <= 4
    //       ? window.getComputedStyle(this.$refs.noteCont.firstElementChild).height
    //       : Math.ceil(Object.keys(this.test.notes).length / 4) *
    //         window.getComputedStyle(this.$refs.noteCont.firstElementChild).height;
    //   },
    // },
    methods: {
      ...mapActions(['updateNote', 'removeTest', 'updateTestHeight']),
      toggleCollapsed() {
        this.collapsed = !this.collapsed;
      },
      updateStudentNote(sid, newNote) {
        this.updateNote({
          gid: this.gid,
          tid: this.test.id,
          sid: sid,
          value: newNote,
        });
      },
      removeT() {
        this.pushPopup({
          forWhat: 'test',
          gid: this.gid,
          tid: this.test.id,
          mid: this.test.module,
        });
      },
    },
    mounted() {
      // console.log(Date.now() - this.test.timestamp);
      this.collapsed = Date.now() - this.test.timestamp < 10000 ? false : true;

      // * height is calculated once, students dont get added to tests so height doesnt change when students are added
      setTimeout(() => {
        !this.test.height
          ? this.updateTestHeight({
              gid: this.gid,
              tid: this.test.id,
              height: window.getComputedStyle(this.$refs.stNoteCont).height,
            })
          : null;
      }, 210);
    },
    watch:{
      // todo refactor this shit, it's stupid
      collapsed: function(newVal){
        // * idk how to do this better, this is to prevent the notes from becoming hidden if user quickly clicks collapse
        if(newVal) this.noteHideTimeout = setTimeout(() => this.notesHidden = true,200);
        else{
          if(this.noteHideTimeout) clearTimeout(this.noteHideTimeout);
          this.noteHideTimeout = null;
          this.notesHidden = false;
        }
      }
    }
  };
</script>

<style scoped>
  .collapsedTestID {
    margin: 0;
    @apply scale-125 top-3;
  }
</style>
