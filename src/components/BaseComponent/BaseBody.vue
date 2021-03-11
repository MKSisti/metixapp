<template>
  <div class=" relative h-screen">
    <div class="flex justify-between h-1/5">
      <div>
        <transition name="fade-x" mode="out-in" appear>
          <span class="text-4xl font-bold flex justify-start items-center flex-row relative transition duration-200 transform-gpu">
            <slot name="title"></slot>
          </span>
        </transition>
        <transition name="fade-x" mode="out-in" appear>
          <div class="transition duration-200 transform-gpu">
            <slot name="subtitles"></slot>
          </div>
        </transition>
      </div>
      <slot name="topRight"></slot>
    </div>
    <div class="w-full">
      <div class="w-full h-px bg-black-light-15 opacity-10"></div>
    </div>
    <div class="h-4/5 overflow-auto z-10">
        <slot name="content"></slot>
    </div>
  </div>
</template>
