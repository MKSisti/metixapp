<template>
  <div class=" relative h-full">
    <div class="flex justify-between">
      <div class="mb-6 space-y-2">
        <span class="text-4xl font-bold flex justify-start items-center flex-row relative">
          <slot name="title"></slot>
        </span>
        <div>
          <slot name="subtitles"></slot>
        </div>
      </div>
      <div class="space-y-2">
        <div class="bg-blue-base px-8 py-2 text-xl text-black-base">
          Analytics
        </div>
        <div class="bg-blue-base px-8 py-2 text-xl text-black-base">
          Edit Group
        </div>
      </div>
    </div>
    <div class="space-y-8">
      <slot name="content"></slot>
    </div>
  </div>
</template>
