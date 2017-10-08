import Vue from 'vue'
import Router from 'vue-router'
import TableWrapper from '@/components/Table/TableWrapper'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'table.conmebol',
      component: TableWrapper
    }
  ],
  mode: 'history'
})
