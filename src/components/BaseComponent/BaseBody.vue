<template>
  <div class=" relative h-screen">
    <div class="flex justify-between h-1/5">
      <div>
        <span class="text-4xl font-bold flex justify-start items-center flex-row relative">
          <slot name="title"></slot>
        </span>
        <div>
          <slot name="subtitles"></slot>
        </div>
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