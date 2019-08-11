import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/pages/MainPage.vue'

const Path = {
  MainPage: '/',
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: Path.MainPage,
      component: MainPage,
    },
    {
      path: '*',
      component: MainPage,
    },
  ],
})
