<template>
  <base-body class="capitalize overflow-hidden transition duration-200 transform-gpu">
    <template v-slot:title> </template>

    <template v-slot:subtitles> </template>

    <template v-slot:topRight> </template>

    <template v-slot:content> </template>
  </base-body>
</template>

<script>
import BaseBody from "../components/BaseComponent/BaseBody";
  export default {
    name: 'AnalyticsPage',
    components: {BaseBody},
    props: [],
    data() {
      return {};
    },
    computed: {},
    methods: {},
  };
</script>
