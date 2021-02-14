<template>
  <base-body class="capitalize overflow-hidden">
    <template v-slot:title>
      
      <!-- group name -->
      <div class="w-full flex justify-start items-center flex-row h-full pl-10" v-if="'[[EDIT__NOT__CLICKED]]'">
        <h1 class="text-4xl font-bold">GROUP__NAME</h1>
        <span class="cursor-pointer text-sm flex justify-center items-center ml-2 text-blue-base">
          <box-icon name="pencil" type="solid" size="cssSize" class="w-8 h-8 fill-current mt-1" v-pre></box-icon>
        </span>
      </div>
      
      <!-- group edit, on when edit is clicked -->
      <div class="w-full flex justify-start items-center flex-row h-full pl-10" v-else>
        <input type="text" class="py-2 h-16 bg-transparent border-2 border-black-light-15 border-transparent focus:outline-none text-4xl font-bold transition duration-200 -ml-3 pl-3" />
        <span class="cursor-pointer text-sm flex justify-center items-center ml-2 text-blue-base">
          <box-icon name="check" size="cssSize" class="w-12 h-12 fill-current" v-pre></box-icon>
        </span>
      </div>
      
    </template>

    <template v-slot:subtitles>
      <h1 class="pl-10">GROUP__DESCRIPTION</h1>
    </template>

    <template v-slot:content>
      
      <div class="w-full mt-28 flex flex-col justify-start items-start space-y-2 px-3 overflow-auto">

        <!-- new student, adds an empty student or template student with edit flag true -->
        <div class="bg-black-light-1 flex justify-between items-center flex-row w-64 h-16 p-4">
          <h1 class="text-2xl capitalize font-bold">new Student</h1>
          <span v-if="'[[SHOW__NEW__GROUP__BUTTON]]'" class="cursor-pointer hover:text-blue-light-1 text-3xl font-bold bg-black-light-5 text-blue-base w-9 h-9 flex justify-center items-center p-px">
            <box-icon name="plus" size="cssSize" class="w-full h-full fill-current" v-pre></box-icon>
          </span>
        </div>

        <!-- student display loop -->
        <div :key="index" v-for="(index) in [1,2,3,4]" class="bg-black-light-1 flex justify-between items-center flex-col w-full h-52 relative pb-1 flex-none">
          
          <!-- cne maybe or uneditable internal id to avoid duplicates maybe using UUID lib -->
          <h1 class="text-base capitalize absolute top-2 left-2">XY00000__ID</h1>

          <!-- close btn -->
          <div class="w-full p-2">
            <span class="cursor-pointer hover:bg-red-light-1 text-2xl font-bold bg-red-base text-black-light-5 w-9 h-9 flex justify-center items-center float-right">
              <box-icon name="plus" size="cssSize" class="w-full h-full fill-current transform rotate-45 scale-105" v-pre></box-icon>
            </span>
          </div>

          <!-- student card body -->
          <div class="w-full relative">
            
            <!-- data display -->
            <div class="w-full flex justify-around items-center flex-row px-10" v-if="true">
              <h1 class="text-xl max-w-xs break-words">STUDENT__FNAME__LNAME</h1>
              <h1 class="text-xl max-w-xs break-words">STUDENT__EMAIL</h1>
              <h1 class="text-xl max-w-xs break-words">STUDENT__PHONE</h1>
              <h1 class="text-xl max-w-xs break-words">STUDENT__CNE</h1>
            </div>

            <!-- data edit, couldnt do the neat text turns to input cuz of the variable 
            length of data and data being in single line -->
            <div class="w-full flex justify-around items-center flex-row px-10 -mt-6" v-else>
              <base-input name="student full name" :value="'STUDENT__FNAME__LNAME'" type="text" tmp="First Last Jr." maxLen="32"></base-input>
              <base-input name="student email" :value="'STUDENT__EMAIL'" type="text" tmp="example@email.com" maxLen="32"></base-input>
              <base-input name="student phone" :value="'STUDENT__PHONE'" type="text" tmp="(+212)-12345678" maxLen="32"></base-input>
              <base-input name="student cne" :value="'STUDENT__CNE'" type="text" tmp="XY123456" maxLen="32"></base-input>
            </div>
          </div>

          <!-- edit/done button -->
          <div class="flex justify-center items-center flex-row cursor-pointer h-9 w-20 group" v-if="'[[NOT__EDITING__STUDENT]]'">
            <span class="cursor-pointer text-sm flex justify-center items-center ml-2 text-blue-base group-hover:text-blue-light-1">
              <box-icon name="pencil" type="solid" size="cssSize" class="w-4 h-4 fill-current mt-1" v-pre></box-icon>
            </span>
          </div>

          <div class="flex justify-center items-center flex-row cursor-pointer" v-else>
            <button class="capitalize rounded-none bg-blue-base px-5 py-1 text-xl font-semibold text-black-base hover:bg-blue-light-1 transition duration-200">
              done
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
  // import BaseInput from '../components/BaseComponent/BaseInput.vue';

  export default {
    name: 'SingleGroup',
    components: { BaseBody, BaseInput },
  };
</script>
