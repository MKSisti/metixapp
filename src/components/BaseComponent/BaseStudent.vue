<template>
  <div class="bg-black-light-1 flex justify-between items-center flex-col w-full h-52 relative pb-1 flex-none">
    <!-- cne maybe or uneditable internal id to avoid duplicates maybe using UUID lib -->
    <h1 class="text-base capitalize absolute top-2 left-2">
      {{ student.cne }}
    </h1>

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
        <h1 class="text-xl max-w-xs break-words">{{ student.firstName }} {{ student.lastName }}</h1>
        <h1 class="text-xl max-w-xs break-words">{{ student.email }}</h1>
        <h1 class="text-xl max-w-xs break-words">{{ student.phone }}</h1>
        <h1 class="text-xl max-w-xs break-words">{{ student.cin }}</h1>
      </div>

      <!-- data edit, couldnt do the neat text turns to input cuz of the variable 
            length of data and data being in single line -->
      <div class="w-full flex justify-around items-center flex-row -mt-6" v-else>
        <base-input name="student full name" :value="'STUDENT__FNAME__LNAME'" type="text" tmp="First Last Jr." maxLen="32"></base-input>
        <base-input name="student email" :value="'STUDENT__EMAIL'" type="text" tmp="example@email.com" maxLen="32"></base-input>
        <base-input name="student phone" :value="'STUDENT__PHONE'" type="text" tmp="(+212)-12345678" maxLen="32"></base-input>
        <base-input name="student cne" :value="'STUDENT__CNE'" type="text" tmp="XY123456" maxLen="32"></base-input>
        <base-input name="student cin" :value="'STUDENT__CIN'" type="text" tmp="i cri :c u did dis" maxLen="32"></base-input>
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
</template>

<script>
  export default {
    name: 'BaseStudent',
    props: ['student'],
  };
</script>
