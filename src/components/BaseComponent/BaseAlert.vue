<template>
  <transition name="rotate-up" appear>
    
    <div v-if="show" class="bg-red-base max-w-xl fixed flex justify-between items-center flex-col p-2 top-2 right-2 transition duration-200">
      <!-- alert header  -->
      <div class="w-full flex justify-between items-center">
        <h1 class="text-2xl font-bold capitalize ml-4 text-black-base">Alert</h1>
        <!-- alert close button -->
        <span class="cursor-pointer hover:bg-black-light-5 text-2xl font-bold bg-black-light-1 text-red-base w-9 h-9 flex justify-center items-center">
          <box-icon name="plus" size="cssSize" class="w-full h-full fill-current transform rotate-45 scale-105" v-pre></box-icon>
        </span>
      </div>

      <!-- alert text -->
      <div class="text-2xl font-medium py-4 text-black-base px-10">
        {{ text }}
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'BaseAlert',
    props: ['show', 'text'],
  };
</script>
