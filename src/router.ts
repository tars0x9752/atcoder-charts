import Vue from 'vue'
import Router from 'vue-router'
import ChartView from '@/components/pages/ChartView.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: ChartView,
    },
  ],
})
