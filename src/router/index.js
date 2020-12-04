/*
 * @Date: 2020-11-18 10:06:52
 * @LastEditors: tgy
 * @LastEditTime: 2020-12-04 20:08:02
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
let films = () => import('@/components/video/video')
let cloudpan = () => import('@/components/cloudpan/cloudpan')
let history = () => import('@/components/history/history')
let collection = () => import('@/components/collection/collection')
let like = () => import('@/components/like/like')
let musiclist = () => import('@/components/musicroom/musiclist')
let dj = () => import('@/components/musicroom/dj')
let latestsong = () => import('@/components/musicroom/latestsong')
let songer = () => import('@/components/musicroom/songer')
let toplist = () => import('@/components/musicroom/toplist')
let recommand = () => import('@/components/musicroom/recommand')

const routes = [
  {
    path: '/',
    redirect: '/films',
  },
  {
    path: '/musicroom',
    name: 'musicroom',
    redirect: '/musicroom/recommand',
    component: musicroom,
    children: [
      {
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
  },
  {
    path: '/films',
    name: 'films',
    component: films
  },
  {
    path: "/history",
    name: 'history',
    component: history
  },
  {
    path: "/cloudpan",
    name: 'cloudpan',
    component: cloudpan
  },
  {
    path: "/collection",
    name: 'collection',
    component: collection
  },
  {
    path: "/like",
    name: 'like',
    component: like
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
