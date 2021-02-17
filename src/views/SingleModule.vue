<template>
  <base-body class="capitalize overflow-hidden pb-2 pt-4">
    <template v-slot:title>
      <!-- module name already editable from sidebar -->
      <div class="w-full flex justify-start items-center flex-row h-full pl-10">
        <h1 class="text-4xl font-bold">{{info.moduleName}}</h1>
      </div>
    </template>

    <template v-slot:subtitles>
      <h1 class="pl-10 pt-2">{{info.groupName}}</h1>
    </template>

    <template v-slot:content>
      <div
        :class="{ 'items-center': !tests || tests?.length < 1 }"
        class="w-full mt-28 flex flex-col justify-start items-start space-y-2 px-3 overflow-auto"
      >
        <!-- new test -->
        <div
          class="bg-black-light-1 flex justify-between items-center flex-row w-64 h-16 p-4 text-2xl"
        >
          <h1 class="capitalize font-bold">new Test</h1>
          <span
            v-if="'[[SHOW__NEW__GROUP__BUTTON]]'"
            class="cursor-pointer hover:text-blue-light-1 text-3xl font-bold bg-black-light-5 text-blue-base w-9 h-9 flex justify-center items-center p-px"
          >
            <box-icon
              name="plus"
              size="cssSize"
              class="w-full h-full fill-current"
              v-pre
            ></box-icon>
          </span>
        </div>

        <!-- test display loop -->
        <div
          :key="test.id"
          v-for="test in tests"
          class="bg-black-light-1 flex justify-between items-center flex-col w-full relative flex-none overflow-hidden"
        >
          <!-- testID internal generated ID (incrementing index or uuid) -->
          <h1
            :class="{ collapsedTestID: false && '[[TEST__COLLAPSED]]' }"
            class="text-base capitalize absolute top-2 left-2"
          >
            {{ test.id }}
          </h1>

          <!-- close btn -->
          <div class="w-full p-2">
            <span
              class="cursor-pointer hover:bg-red-light-1 text-2xl font-bold bg-red-base text-black-light-5 w-9 h-9 flex justify-center items-center float-right"
            >
              <box-icon
                name="plus"
                size="cssSize"
                class="w-full h-full fill-current transform rotate-45 scale-105"
                v-pre
              ></box-icon>
            </span>
          </div>

          <!-- student note container -->
          <div
            :class="{ hidden: false && '[[TEST__COLLAPSED]]' }"
            class="w-full flex justify-around items-center flex-row flex-wrap pb-10"
          >
            <!-- student note loop -->
            <div
              :key="Object.entries(note)[0][0]"
              v-for="note in test.notes"
              class="w-1/5 h-80 relative m-2 flex-auto flex justify-between items-start flex-col bg-black-light-5 max-w-md"
            >
              <!-- single student data show and edit -->

              <!-- cne maybe or uneditable internal id to avoid duplicates maybe using UUID lib -->
              <h1 class="text-base capitalize absolute top-2 left-2">
                {{ Object.entries(note)[0][0] }}
              </h1>

              <!-- close btn -->
              <div class="w-full p-2">
                <span
                  class="cursor-pointer hover:bg-red-light-1 text-2xl font-bold overflow-hidden bg-red-base text-black-light-5 w-9 h-9 flex justify-center items-center float-right"
                >
                  <box-icon
                    name="plus"
                    size="cssSize"
                    class="w-full h-full fill-current transform rotate-45 scale-105"
                    v-pre
                  ></box-icon>
                </span>
              </div>

              <!-- student name -->
              <h1 class="text-xl capitalize px-8 -mt-6">ST__FNAME__LNAME</h1>

              <!-- student note input and show -->
              <base-input
                class="px-8 -mt-8 w-full"
                :id="'[[XY00000__ID__NOTE]]'"
                name="Note"
                :value="'[[STUDENT__NOTE]]'"
                type="number"
                tmp="12"
              ></base-input>

              <!-- update button -->
              <div
                class="flex w-full justify-end items-center flex-row cursor-pointer p-2"
              >
                <button
                  class="capitalize rounded-none bg-blue-base px-6 py-2 text-xl font-semibold text-black-base hover:bg-blue-light-1 transition duration-200"
                >
                  update
                </button>
              </div>
            </div>
          </div>

          <!-- expand button -->
          <div
            class="flex justify-center items-center flex-row cursor-pointer w-8 h-8 group absolute bottom-0 bg-blue-base hover:bg-blue-light-1"
          >
            <span
              class="cursor-pointer text-sm flex justify-center items-center w-6 h-6 text-black-base"
            >
              <box-icon
                type="solid"
                name="chevron-down"
                size="cssSize"
                class="w-full h-full fill-current mt-1"
                v-pre
              ></box-icon>
            </span>
          </div>
        </div>
      </div>
    </template>
  </base-body>
</template>

<script>
import BaseInput from "../components/BaseComponent/BaseInput";
import BaseBody from "../components/BaseComponent/BaseBody";
import { mapGetters } from "vuex";

export default {
  name: "SingleModule",
  components: { BaseBody, BaseInput },
  props: ["GroupId", "ModuleId"],
  computed: {
    ...mapGetters({
      getTests: "getModuleTests",
      getInfo: "getModuleInfo",
    }),
    tests() {
      return this.getTests(this.GroupId, this.ModuleId);
    },
    info() {
      return this.getInfo(this.GroupId, this.ModuleId);
    },
  },
};
</script>

<style scoped>
.collapsedTestID {
  position: absolute;
  margin: 0;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  text-align: center;
  @apply text-lg;
}
</style>
