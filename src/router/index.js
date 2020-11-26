/*
 * @Date: 2020-11-18 10:06:52
 * @LastEditors: tgy
 * @LastEditTime: 2020-11-25 11:26:27
 * @Author: tgy
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push;  //同路径跳转报错解决
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

let musicroom = () => import('@/components/musicroom/musicroom')
let musiclist = () => import('@/components/musicroom/musiclist')
let dj = () => import('@/components/musicroom/dj')
let latestsong = () => import('@/components/musicroom/latestsong')
let songer = () => import('@/components/musicroom/songer')
let toplist = () => import('@/components/musicroom/toplist')
let recommand = () => import('@/components/musicroom/recommand')

const routes = [
  {
    path: '/',
    redirect: '/recommand',
    name: 'musicroom',
    component: musicroom,
    children: [{
      path: 'musiclist',
      name: 'musiclist',
      component: musiclist
    },
    {
      path: 'songer',
      name: 'songer',
      component: songer
    },
    {
      path: 'dj',
      name: 'dj',
      component: dj
    },
    {
      path: 'latestsong',
      name: 'latestsong',
      component: latestsong
    },
    {
      path: 'toplist',
      name: 'toplist',
      component: toplist
    },
    {
      path: 'recommand',
      name: 'recommand',
      component: recommand
    },]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
