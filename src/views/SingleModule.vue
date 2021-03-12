<template>
  <base-body class="capitalize overflow-hidden pb-2">
    <template v-slot:title>
      <!-- module name already editable from sidebar -->
      <div class="w-full flex justify-start items-center flex-row h-full pl-10 pt-4">
        <h1 class="text-4xl font-bold">{{ info?.moduleName || 'module name' }}</h1>
      </div>
    </template>

    <template v-slot:subtitles>
      <h1 class="pl-10 pt-2">{{ info?.groupName || 'group name' }}</h1>
    </template>

    <template v-slot:content>
      <div :class="{ 'flex-col': tests && tests?.length >= 1 }" class="w-full mt-28 flex justify-start items-start space-y-2 px-3 overflow-hidden relative">
        <!-- new test -->
        <div class="bg-black-light-1 flex justify-between items-center flex-row w-64 h-16 p-4 text-2xl">
          <h1 class="capitalize font-bold">new Test</h1>
          <span @click="addNewTest" class="cursor-pointer hover:text-blue-light-1 text-3xl font-bold bg-black-light-5 text-blue-base w-9 h-9 flex justify-center items-center p-px">
            <box-icon name="plus" size="cssSize" class="w-full h-full fill-current" v-pre></box-icon>
          </span>
        </div>

        <!-- user hints -->
        <div v-if="!tests || tests?.length < 1" class="font-bold text-4xl pl-4 flex justify-center items-center">
          <box-icon name="arrow-back" size="cssSize" class="w-8 h-8 fill-current mt-1 mr-2" v-pre></box-icon>
          <h1>Add your first test</h1>
        </div>

        <!-- test display loop -->
        <div v-else class="w-full relative space-y-2">
          <transition-group @before-leave="beforeLeave" name="fade-x" mode="out-in" appear>
            <base-test class="transition-all duration-200 transform-gpu" v-for="(test) in tests" :key="test.id" :test="test" :gid="GroupId" />
          </transition-group>
        </div>
      </div>
    </template>
  </base-body>
</template>

<script>
  // import BaseInput from "../components/BaseComponent/BaseInput";
  import BaseBody from '../components/BaseComponent/BaseBody';
  import BaseTest from '../components/BaseComponent/BaseTest';
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'SingleModule',
    components: { BaseBody, BaseTest },
    props: ['GroupId', 'ModuleId'],
    provide() {
      return {
        studentsData: this.students,
      };
    },
    computed: {
      ...mapGetters({
        getTests: 'getModuleTests',
        getInfo: 'getModuleInfo',
        getStudents: 'getGroupStudents',
      }),
      tests() {
        return this.getTests(this.GroupId, this.ModuleId) || [];
      },
      info() {
        return this.getInfo(this.GroupId, this.ModuleId);
      },
      students() {
        return this.getStudents(this.GroupId);
      },
    },
    methods: {
      ...mapActions(['addTest']),
      addNewTest() {
        this.addTest({
          gid: this.GroupId,
          mid: this.ModuleId,
        });
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
