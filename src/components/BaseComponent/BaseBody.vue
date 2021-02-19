<template>
  <div class=" relative h-full">
    <div v-if="'[[SHOW__DELETE__POPUP]]'">
      <transition name="fade" appear>
        <base-popup/>
      </transition>
    </div>
    <div class="flex justify-between">
      <div>
        <span class="text-4xl font-bold flex justify-start items-center flex-row relative">
          <slot name="title"></slot>
        </span>
        <div>
          <slot name="subtitles"></slot>
        </div>
      </div>
      <div class="hidden space-y-2">
        <div class="bg-blue-base px-8 py-2 text-xl text-black-base">
          Analytics
        </div>
        <div class="bg-blue-base px-8 py-2 text-xl text-black-base">
          Edit Group
        </div>
      </div>
    </div>
    <div>
      <slot name="content"></slot>
    </div>
  </div>
</template>



<script>
import BasePopup from './BasePopup'

export default {
  name:'BaseBody',
  components:{BasePopup}
}
</script>