<template>
  <div class="bg-black-light-5 flex justify-start items-center flex-col h-full">
    <div @click="goToHome" class="bg-transparent text-4xl font-bold flex justify-center items-center flex-row w-full h-20 p-4 text-blue-base cursor-pointer">
      <h1>Metix</h1>
    </div>

    <!-- new group -->
    <div @click="goToAdd" class="bg-black-light-10 flex justify-between items-center flex-row w-full h-20 p-4 cursor-pointer">
      <h1 class="text-2xl uppercase font-bold">new group</h1>
      <span v-if="'[[SHOW__NEW__GROUP__BUTTON]]'" class="cursor-pointer hover:text-blue-light-1 text-4xl font-bold bg-black-light-5 text-blue-base w-10 h-10 flex justify-center items-center p-px">
        <box-icon name="plus" size="cssSize" class="w-full h-full fill-current" v-pre></box-icon>
      </span>
    </div>

    <!-- a single group -->
    <div style="height:calc(100vh - 10rem)" class="w-full">
      <transition-group @before-leave="beforeLeave" name="fade-x" mode="out-in" appear>
        <base-group class="transition-all duration-200 transform-gpu" v-for="group in groups" :key="group.id" :gid="group.id" :name="group.name" :modules="group.modules" />
      </transition-group>
    </div>
  </div>
</template>

<script>
  // import BaseInput from "./BaseComponent/BaseInput";
  import BaseGroup from './BaseComponent/BaseGroup';
  import { mapGetters } from 'vuex';

  export default {
    name: 'Sidebar',
    // data() {
    //   return {
    //     SAMPLE__GROUP: [
    //       {
    //         name: 'group1',
    //         active: true,
    //         expanded: false,
    //         modules: [
    //           {
    //             name: 'mod1',
    //           },
    //           {
    //             name: 'mod2',
    //           },
    //           {
    //             name: 'mod3',
    //           },
    //           {
    //             name: 'mod4',
    //           },
    //         ],
    //       },
    //       {
    //         name: 'group2',
    //         active: false,
    //         expanded: false,
    //         modules: [
    //           {
    //             name: '...',
    //           },
    //           {
    //             name: '...',
    //           },
    //           {
    //             name: '...',
    //           },
    //           {
    //             name: '...',
    //           },
    //         ],
    //       },
    //     ],
    //   };
    // },
    // props: {},
    components: {
      BaseGroup,
    },
    computed: {
      ...mapGetters({
        groups: 'getAllGroups',
      }),
    },
    methods: {
      goToAdd() {
        this.$router.push({ name: 'addGroup' });
      },
      goToHome() {
        this.$router.push({ name: 'home' });
      },
      beforeLeave(el) {
        const { marginLeft, marginTop, width, height } = window.getComputedStyle(el);
        el.style.left = `${el.offsetLeft - parseFloat(marginLeft, 10)}px`;
        el.style.top = `${el.offsetTop - parseFloat(marginTop, 10)}px`;
        el.style.width = width;
        el.style.height = height;
      },
    },
  };
</script>
