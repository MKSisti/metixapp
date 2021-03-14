<template>   
     <!-- popup container -->
    <div
      @click.self="$emit('closeMe',0)"
      class="fixed w-screen h-screen flex top-0 bottom-0 right-0 left-0 justify-center items-center z-50 bg-black-base bg-opacity-80 transition duration-200"
    >
      <transition name="rotate-up" appear>

         <!-- popup body -->
        <div @click.stop class="bg-black-light-15 max-w-xl flex justify-between items-center flex-col p-2 transition duration-200 pointer-events-auto relative space-y-6">
          
          <!-- popup header -->
          <div class="w-full flex justify-between items-center">
            <h1 class="text-4xl font-bold capitalize ml-4 text-black-base">Alert</h1>
            
          </div>

          <!-- popup text -->
          <div class="text-4xl font-medium py-4 text-black-base px-10">
            this action is irreversible
          </div>
          
          <!-- button container  -->
          <div class="w-full h-12 flex justify-between items-center px-10">

             <!-- big bad delete button -->
            <button
              @click="execute"
              class="capitalize rounded-none bg-red-base px-10 py-2.5 text-2xl font-semibold text-black-base hover:bg-red-light-1 transition duration-200"
            >
              I'm sure
            </button>
            <button
              @click="$emit('closeMe',0)"
              class="capitalize rounded-none bg-black-light-5 px-10 py-2.5 text-2xl font-semibold text-black-light-15 hover:bg-black-light-10 transition duration-200"
            >
              Go back
            </button>
          </div>

        </div>
      </transition>
    </div>
</template>

<script>
import {mapActions} from 'vuex'

  export default {
    name: 'BasePopup',
    props:['payload'],
    emits: ['closeMe'],
    methods:{
      ...mapActions(['generalDelete']),
      execute(){
        this.generalDelete(this.payload).then((res)=>{
          this.$emit('closeMe',res);
        })
      }
    }
  };
</script>

<style scoped>
  .fixed {
    backdrop-filter: blur(5px);
  }
</style>
