import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/assets/css/main.css';
import 'boxicons';

const beforeLeaveMixin = {
  methods: {
    beforeLeave(el) {
      const { marginLeft, marginTop, width, height } = window.getComputedStyle(el);
      el.style.left = `${el.offsetLeft - parseFloat(marginLeft, 10)}px`;
      el.style.top = `${el.offsetTop - parseFloat(marginTop, 10)}px`;
      el.style.width = width;
      el.style.height = height;
    },
  },
};

createApp(App)
  .mixin(beforeLeaveMixin)
  .use(router)
  .use(store)
  .mount('#app');
