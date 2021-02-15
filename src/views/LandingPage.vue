<template>
  <base-body class="basebody capitalize relative w-full h-screen transition duration-1000">
    <template v-slot:content>
      <div class="absolute font-bold text-3xl top-24 left-2 z-50 flex justify-start items-center" v-if="'[[NO GROUPS]]'">
        <box-icon name="arrow-back" size="cssSize" class="w-8 h-8 fill-current mt-1 mr-2" v-pre></box-icon>
        <h1>start by adding a group</h1> 
      </div>
      <div class="w-full h-screen flex flex-col justify-center items-center z-50">
        <transition name="rotate-up" appear>
          <svg class="flex-none transition duration-1000" width="350" height="350" viewBox="0 0 350 350" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="350" height="350">
              <rect width="350" height="350" fill="#2F3641" />
            </mask>
            <g mask="url(#mask0)">
              <rect width="350" height="350" fill="#2F3641" />
              <path d="M55.1328 173.594L100.25 293.477L145.26 173.594H180.387V330H153.316V278.438L156.002 209.473L109.811 330H90.3672L44.2832 209.58L46.9688 278.438V330H19.8984V173.594H55.1328Z" fill="#21252B" />
              <path d="M208.492 297.188L224.508 273.125H230.25L211.422 301.172L230.836 330H225.055L208.492 305.156L191.852 330H186.148L205.602 301.172L186.734 273.125H192.477L208.492 297.188Z" fill="#509AE3" />
            </g>
          </svg>
        </transition>
        <div class="font-bold text-3xl pt-3">
          Welcome to metix
        </div>
        <div class="text-2xl">
          your student administration tool
        </div>
      </div>
    </template>
  </base-body>
</template>

<script>
  import BaseBody from '../components/BaseComponent/BaseBody';

  export default {
    name: 'LandingPage',
    components: { BaseBody },
  };
</script>

<style scoped>
    /* .basebody{
        animation: subtleBg 15s ease 2000ms infinite alternate;
        @apply bg-black-base
    }
    @keyframes subtleBg {
        0%{
            background: rgb(33, 37, 43);
        }
        100%{
            background: rgb(80, 154, 227,0.5);
        }
        
    } */
</style>