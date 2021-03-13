<template>
  <div class="w-full h-14 relative group">
    <div class="group absolute w-14 h-14 right-0 top-0 transition transform-gpu duration-200 z-0 bg-red-base hover:bg-red-light-1 pointer-events-none opacity-0 group-hover:translate-x-full group-hover:opacity-100 group-hover:pointer-events-auto cursor-pointer">
      <div class="w-full h-full p-2 flex justify-center items-center">
        <span class="cursor-pointer text-2xl font-bold text-black-light-5 w-9 h-9 flex justify-center items-center float-right transition duration-200">
          <box-icon name="plus" size="cssSize" class="w-full h-full fill-current transform rotate-45 scale-105" v-pre></box-icon>
        </span>
      </div>
    </div>

    <div :class="this.$route.params.ModuleId == module.id ? 'bg-black-base' : 'bg-black-light-1'" class="w-full px-7 h-full z-20 relative border-b border-black-light-15 border-opacity-20">
      <div @click="goToMod" class="w-full flex justify-between items-center flex-row h-full cursor-pointer " v-if="!editMode">
        <h1 class="text-xl capitalize">
          {{ module.name }}
        </h1>
        <span @click.stop="editMode = true" class="text-sm flex justify-center items-center ml-2 text-blue-base">
          <box-icon name="pencil" type="solid" size="cssSize" class="w-4 h-4 fill-current" v-pre></box-icon>
        </span>
      </div>

      <!--module input, show if user clicks edit -->
      <div class="w-full flex justify-between items-center flex-row h-full" v-else>
        <input @change="newModName = $event.target.value" :value="module.name" type="text" class="py-2 h-10 bg-transparent border-2 border-black-light-15 border-transparent focus:outline-none text-xl transition duration-200 -ml-3 pl-3" />
        <span @click="updateN" class="cursor-pointer text-sm flex justify-center items-center ml-2 text-blue-base">
          <box-icon name="check" size="cssSize" class="w-8 h-8 fill-current" v-pre></box-icon>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BaseModule',
    props: ['module', 'gid'],
    emits: ['update'],
    data() {
      return {
        newModName: '',
        editMode: false,
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
      },
    },
  };
</script>
