<template>
  <base-body :key="GroupId" class="capitalize overflow-hidden transition duration-200 transform-gpu">
    <template v-slot:title> </template>

    <template v-slot:subtitles> </template>

    <template v-slot:topRight> </template>

    <template v-slot:content> </template>
  </base-body>
</template>

<script>
  export default {
    name: 'AnalyticsPage',
    components: {},
    props: ['GroupId'],
    data() {
      return {};
    },
    computed: {},
    methods: {},
  };
</script>
