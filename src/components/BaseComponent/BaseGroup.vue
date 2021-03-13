<template>
  <div class="flex justify-start items-center flex-col w-full relative">
    <!-- group name and mod expand btn-->

    <div @click="goToGrp" :class="GrpActiveClass" class="cursor-pointer flex justify-between items-center flex-row w-full h-20 p-4 z-10">
      <h1 class="text-2xl uppercase">{{ name }}</h1>
      <span class="cursor-pointer text-sm flex justify-center items-center" @click.stop="toggleExpanded">
        {{ modules.length + ' mod' }}
        <div :class="{ 'rotate-180': expanded }" class="w-4 h-4 transition duration-200 transform-gpu">
          <box-icon type="solid" name="chevron-down" size="cssSize" class="w-4 h-4 fill-current" v-pre></box-icon>
        </div>
      </span>
    </div>
      <!-- if u visit the group page, show the modules avoids one more click if user wants to select a mod from that group-->
      <div :style="{'max-height':height}" :class="{'overflow-hidden': !expanded}" class="w-full justify-start items-start transition-all duration-200 transform-gpu relative z-0" >
        <!-- new module -->
        <div class="relative w-full">
          <!-- new module container, had to to position relative to parent but have more width -->
          <div
            v-if="expanded"
            style="
            transform: translateX(calc(100% - 12rem));
            width: calc(100% + 12rem);
          "
            :class="showHide"
            class="h-60 bg-black-light-10 absolute transform flex justify-between items-center flex-col p-2"
          >
            <!-- new module header  -->
            <div class="w-full flex justify-between items-center">
              <h1 class="text-2xl capitalize ml-4">New Module</h1>
              <!-- new module close button -->
              <span @click="AddModuleVisible = false" class="cursor-pointer hover:bg-red-light-1 text-2xl font-bold bg-red-base text-black-light-5 w-9 h-9 flex justify-center items-center">
                <box-icon name="plus" size="cssSize" class="w-full h-full fill-current transform rotate-45 scale-105" v-pre></box-icon>
              </span>
            </div>

            <!-- new module input -->
            <base-input class="w-full px-10" name="module name" type="text" tmp="Module name" maxLen="32" v-model="modInput"></base-input>

            <!-- module done button -->
            <div class="w-full">
              <button @click="addMod" class="capitalize rounded-none bg-blue-base px-8 py-2 text-xl font-semibold text-black-base hover:bg-blue-light-1 transition duration-200 float-right">
                done
              </button>
            </div>
          </div>

          <!-- new module prompt button -->
          <div class="bg-black-light-10 flex justify-between items-center flex-row w-full h-14 p-4">
            <h1 class="text-xl capitalize">new module</h1>
            <span @click="showAddModule" class="cursor-pointer hover:text-blue-light-1 text-2xl font-bold bg-black-light-5 text-blue-base w-9 h-9 flex justify-center items-center p-px">
              <box-icon name="plus" size="cssSize" class="w-full h-full fill-current" v-pre></box-icon>
            </span>
          </div>
        </div>

        <!-- modules of a group -->
        <div>
          <base-module :key="module.id" v-for="module in modules" :module="module" :gid="gid" @update="updateModN">
            <!--module name, hide if user clicks edit-->
          </base-module>
        </div>
      </div>
  </div>
</template>

<script>
  import BaseInput from './BaseInput';
  import BaseModule from './BaseModule';
  import { mapActions } from 'vuex';

  export default {
    name: 'BaseGroup',
    props: ['name', 'modules', 'gid'],
    components: {
      BaseInput,
      BaseModule,
    },
    data() {
      return {
        // editMode: false,
        expanded: false,
        AddModuleVisible: false,
        modInput: '',
        // newModName: "",
      };
    },
    computed: {
      showHide() {
        return this.AddModuleVisible ? '' : 'invisible';
      },
      GrpActiveClass() {
        var current = this.$route.params.GroupId;

        return this.gid == current ? 'bg-black-base' : '';
      },
      height(){
        return this.expanded ? (5 * (this.modules.length + 1)) + 'rem' : 0 + 'rem';
      }
    },
    methods: {
      toggleExpanded() {
        this.expanded = !this.expanded;
      },
      showAddModule() {
        this.AddModuleVisible = !this.AddModuleVisible;
      },
      // goToMod(mid) {
      //   this.$router.push({
      //     name: "module",
      //     params: { GroupId: this.gid, ModuleId: mid },
      //   });
      // },
      goToGrp() {
        this.expanded = true;

        this.$router.push({ name: 'group', params: { GroupId: this.gid } });
      },
      addMod() {
        this.modInput.length > 0
          ? this.addModule({
              name: this.modInput,
              id: this.gid,
            })
          : null;
        this.AddModuleVisible = false;
        this.modInput = '';
      },
      updateModN(id, newName) {
        if (newName?.length > 0) {
          this.updateModName({
            gid: this.gid,
            mid: id,
            name: newName,
          });
        }
      },
      ...mapActions(['addModule', 'updateModName']),
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
