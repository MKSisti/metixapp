<template>
  <div class=" relative h-full">
    <div class="flex justify-between">
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
    <div>
      <slot name="content"></slot>
    </div>
  </div>
</template>