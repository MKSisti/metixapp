<template>
  <base-body class="capitalize overflow-hidden transition duration-200 transform-gpu">
    <template v-slot:title>
      <div class="w-full flex justify-start items-center flex-row h-full pl-10 pt-4">
        <h1 class="text-4xl font-bold">
          sir, we can't find that one!
        </h1>
      </div>
    </template>

    <template v-slot:subtitles>
      <h1 class="pl-10 pt-2">Choose something from the side to go back to safety</h1>
    </template>

    <template v-slot:content>
      <div class="w-full h-full flex justify-center items-center flex-col overflow-hidden space-y-8">
        <div class="wave flex justify-center items-center flex-col">
          <h1 class="text-4xl font-bold transform translate-x-20 translate-y-4">🐈</h1>
          <h1 class="text-8xl font-bold -mt-0.5">404 Not Found</h1>
        </div>
        <h1 class="text-8xl font-bold ">😢</h1>
      </div>
    </template>
  </base-body>
</template>

<script>
  import BaseBody from '../components/BaseComponent/BaseBody';
  export default {
    name: 'NotFound',
    components: { BaseBody },
    data() {
      return {};
    },
    computed: {},
    methods: {},
  };
</script>

