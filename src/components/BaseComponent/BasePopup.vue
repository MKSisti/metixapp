<template>
  <transition name="fade" appear>
     
     <!-- popup container -->
    <div
    v-if="'[[SHOW__DELETE__POPUP]]'"
      @click.self="'[[HIDE__POPUP]]'"
      class="fixed w-screen h-screen flex top-0 bottom-0 right-0 left-0 justify-center items-center z-50 pointer-events-none bg-black-base bg-opacity-80 transition duration-200"
    >
      <transition name="rotate-up" appear>

         <!-- popup body -->
        <div @click.stop class="bg-black-light-15 max-w-xl flex justify-between items-center flex-col p-2 transition duration-200 pointer-events-auto relative space-y-6">
          
          <!-- popup header -->
          <div class="w-full flex justify-between items-center">
            <h1 class="text-2xl font-bold capitalize ml-4 text-black-base">Alert</h1>
            
            <!-- popup close button -->
            <span
              @click="'[[HIDE__POPUP]]'"
              class="cursor-pointer hover:bg-black-light-5 text-2xl font-bold bg-black-light-1 text-blue-base w-9 h-9 flex justify-center items-center"
            >
              <box-icon name="chevron-down" size="cssSize" class="w-full h-full fill-current transform" v-pre></box-icon>
            </span>
          </div>

          <!-- popup text -->
          <div class="text-4xl font-medium py-4 text-black-base px-10">
            this action is irreversible
          </div>
          
          <!-- button container  -->
          <div class="w-full h-12 flex justify-center items-center">

             <!-- big bad delete button -->
            <button
              @click="'[[COMMIT__REMOVAL]]'"
              class="capitalize rounded-none bg-red-base px-10 py-2.5 text-2xl font-semibold text-black-base hover:bg-red-light-1 transition duration-200"
            >
              I'm sure
            </button>
          </div>

        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'BasePopup',
  };
</script>

<style scoped>
  .fixed {
    backdrop-filter: blur(5px);
  }
</style>
