<template>
  <div class="bg-black-light-5 flex justify-start items-center flex-col h-full w-full">
    <div class="bg-transparent text-4xl font-bold flex justify-center items-center flex-row w-full h-20 p-4 text-blue-base">
      <h1>Metix</h1>
    </div>

    <!-- new group -->
    <div class="bg-black-light-10 flex justify-between items-center flex-row w-full h-20 p-4">
      <h1 class="text-2xl uppercase font-bold">new group</h1>
      <span v-if="'[[SHOW__NEW__GROUP__BUTTON]]'" class="cursor-pointer hover:text-blue-light-1 text-4xl font-bold bg-black-light-5 text-blue-base w-10 h-10 flex justify-center items-center p-px">
        <box-icon name="plus" size="cssSize" class="w-full h-full fill-current" v-pre></box-icon>
      </span>
    </div>

    <!-- a single group -->
    <div class="flex justify-start items-center flex-col w-full" :key="group.name" v-for="group in SAMPLE__GROUP">

      <!-- group name and mod expand btn-->
      <div :class="{ 'bg-black-base': group.active }" class="flex justify-between items-center flex-row w-full h-20 p-4">
        <h1 class="text-2xl uppercase">{{ group.name }}</h1>
        <span class="cursor-pointer text-sm flex justify-center items-center">
          {{ group.modules.length + ' mod' }}
          <box-icon type="solid" name="chevron-down" size="cssSize" class="w-4 h-4 fill-current" v-pre></box-icon>
        </span>
      </div>

      <!-- if u visit the group page, show the modules avoids one more click if user wants to select a mod from that group-->
      <div class="w-full justify-start items-start" v-if="group.active || group.expanded">
        <!-- new module -->
        <div class="relative w-full">

          <!-- new module container, had to to position relative to parent but have more width -->
          <div style="transform:translateX(calc(100% - 12rem));width:calc(100% + 12rem)" class="h-60 bg-black-light-10 absolute transform flex justify-between items-center flex-col p-2">
            
            <!-- new module header  -->
            <div class="w-full flex justify-between items-center">
              <h1 class="text-2xl capitalize ml-4">New Module</h1>
              <!-- new module close button -->
              <span class="cursor-pointer hover:bg-red-light-1 text-2xl font-bold bg-red-base text-black-light-5 w-9 h-9 flex justify-center items-center">
                <box-icon name="plus" size="cssSize" class="w-full h-full fill-current transform rotate-45 scale-105" v-pre></box-icon>
              </span>
            </div>

            <!-- new module input -->
            <base-input class="w-full px-10 " name="module name" type="text" tmp="Module name" maxLen="32"></base-input>

            <!-- module done button -->
            <div class="w-full">
              <button class="capitalize rounded-none bg-blue-base px-8 py-2 text-xl font-semibold text-black-base hover:bg-blue-light-1 transition duration-200 float-right">
                done
              </button>
            </div>


          </div>

          <!-- new module prompt button -->
          <div class="bg-black-light-10 flex justify-between items-center flex-row w-full h-14 p-4 ">
            <h1 class="text-xl capitalize">new module</h1>
            <span class="cursor-pointer hover:text-blue-light-1 text-2xl font-bold bg-black-light-5 text-blue-base w-9 h-9 flex justify-center items-center p-px">
              <box-icon name="plus" size="cssSize" class="w-full h-full fill-current" v-pre></box-icon>
            </span>
          </div>

        </div>

        <!-- modules of a group -->
        <div class="bg-black-light-1 w-full h-14 px-7 border-b border-black-light-15 border-opacity-20" :key="group.name + module.name" v-for="module in group.modules">
          
          <!--module name, hide if user clicks edit-->
          <div class="w-full flex justify-start items-center flex-row h-full" v-if="'[[EDIT__NOT__CLICKED]]'">
            <h1 class="text-xl capitalize">{{ module.name }}</h1>
            <span class="cursor-pointer text-sm flex justify-center items-center ml-2 text-blue-base">
              <box-icon name="pencil" type="solid" size="cssSize" class="w-4 h-4 fill-current" v-pre></box-icon>
            </span>
          </div>

          <!--module input, show if user clicks edit -->
          <div class="w-full flex justify-between items-center flex-row h-full" v-else>
            <input type="text" :value="module.name" class="py-2 h-10 bg-transparent border-2 border-black-light-15 border-transparent focus:outline-none text-xl transition duration-200 -ml-3 pl-3" />
            <span class="cursor-pointer text-sm flex justify-center items-center ml-2 text-blue-base">
              <box-icon name="check" size="cssSize" class="w-8 h-8 fill-current" v-pre></box-icon>
            </span>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BaseInput from './BaseComponent/BaseInput';

  export default {
    name: 'Sidebar',
    data() {
      return {
        SAMPLE__GROUP: [
          {
            name: 'group1',
            active: true,
            expanded: false,
            modules: [
              {
                name: 'mod1',
              },
              {
                name: 'mod2',
              },
              {
                name: 'mod3',
              },
              {
                name: 'mod4',
              },
            ],
          },
          {
            name: 'group2',
            active: false,
            expanded: false,
            modules: [
              {
                name: '...',
              },
              {
                name: '...',
              },
              {
                name: '...',
              },
              {
                name: '...',
              },
            ],
          },
        ],
      };
    },
    props: {},
    components: {
      BaseInput,
    },
  };
</script>
