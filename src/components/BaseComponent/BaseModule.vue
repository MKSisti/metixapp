<template>
  <div class="w-full h-14 relative group">
    <transition @before-leave="beforeLeave" name="fade" appear>
      <div v-if="editMode" class="w-full transition duration-200 transform-gpu">
        <div
          style="
            transform: translateX(calc(100% - 12rem));
            width: calc(100% + 12rem);
            box-shadow: 2px -4px 5px rgb(0,0,0,0.1);
          "
          class="h-60 bg-black-light-10 absolute transform flex justify-between items-center flex-col p-2"
        >
          <!-- new module header  -->
          <div class="w-full flex justify-between items-center">
            <h1 class="text-2xl capitalize ml-4">Edit Module</h1>
            <!-- new module close button -->
            <span @click="editMode = false" class="cursor-pointer hover:bg-red-light-1 text-2xl font-bold bg-red-base text-black-light-5 w-9 h-9 flex justify-center items-center">
              <box-icon name="plus" size="cssSize" class="w-full h-full fill-current transform rotate-45 scale-105" v-pre></box-icon>
            </span>
          </div>

          <!-- new module input -->
          <base-input class="w-full px-10" name="module name" type="text" tmp="Module name" maxLen="32" v-model="modInput"></base-input>

          <!-- module done button -->
          <div class="w-full">
            <button @click="updateName" class="capitalize rounded-none bg-blue-base px-8 py-2 text-xl font-semibold text-black-base hover:bg-blue-light-1 transition duration-200 float-right">
              done
            </button>
            <button @click="updateName" class="capitalize rounded-none bg-red-base px-8 py-2 text-xl font-semibold text-black-base hover:bg-red-light-1 transition duration-200 float-right mr-8">
              delete
            </button>
          </div>
        </div>
      </div>
    </transition>

    <div :class="this.$route.params.ModuleId == module.id ? 'bg-black-base' : 'bg-black-light-1'" class="w-full pl-7 pr-4 h-full z-20 relative border-b border-black-light-15 border-opacity-20">
      <div @click="goToMod" class="w-full flex justify-between items-center flex-row h-full cursor-pointer ">
        <h1 class="text-xl capitalize">
          {{ module.name }}
        </h1>
        <span @click.stop="editMode = !editMode" class="cursor-pointer hover:text-blue-light-1 text-2xl font-bold bg-black-light-5 text-blue-base w-9 h-9 flex justify-center items-center p-px">
          <box-icon name="dots-vertical" size="cssSize" class="w-7 h-7 fill-current" v-pre></box-icon>
        </span>
      </div>

      <!--module input, show if user clicks edit -->
    </div>
  </div>
</template>

<script>
  import BaseInput from './BaseInput';
  export default {
    name: 'BaseModule',
    props: ['module', 'gid'],
    components: {
      BaseInput,
    },
    emits: ['update'],
    data() {
      return {
        newModName: '',
        editMode: false,
        modInput: this.module.name,
      };
    },
    methods: {
      updateN() {
        this.$emit('update', this.module.id, this.newModName);
        this.newModName = '';
        this.editMode = false;
      },
      goToMod() {
        this.$router.push({
          name: 'module',
          params: { GroupId: this.gid, ModuleId: this.module.id },
        });
      }
    },
  };
</script>
