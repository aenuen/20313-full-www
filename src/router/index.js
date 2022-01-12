import Vue from 'vue'
import VueRouter from 'vue-router'
import jsonwebtoken from 'jsonwebtoken'
import dayjs from 'dayjs'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: 'ChannelMain' */'../views/Channel/main'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import(/* webpackChunkName: 'ChannelHome' */'../views/Channel/template/Home')
      },
      {
        path: '/catalog/:catalog',
        name: 'catalog',
        component: () => import(/* webpackChunkName: 'ChannelCatalog' */'../views/Channel/template/Catalog')
      }
    ]
  },
  {
    path: '/signIn',
    name: 'signIn',
    component: () => import(/* webpackChunkName: 'UserSignIn' */'../views/User/signIn')
  },
  {
    path: '/signUp',
    name: 'signUp',
    component: () => import(/* webpackChunkName: 'UserSignUp' */'../views/User/signUp')
  },
  {
    path: '/forget',
    name: 'forget',
    component: () => import(/* webpackChunkName: 'UserForget' */'../views/User/forget')
  },
  {
    path: '/resetPassword',
    name: 'resetPassword',
    component: () => import(/* webpackChunkName: 'UserReset' */'../views/User/resetPassword')
  },
  {
    path: '/resetEmail',
    name: 'resetEmail',
    component: () => import(/* webpackChunkName: 'UserReset' */'../views/User/resetEmail')
  },
  {
    path: '/personal/:uid',
    name: 'personal',
    props: true,
    component: () => import(/* webpackChunkName: 'PersonalHomePage' */'../views/Personal/homePage')
  },
  {
    path: '/center',
    component: () => import(/* webpackChunkName: 'CenterNavBar' */'../views/Center/navBar'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'center',
        component: () => import(/* webpackChunkName: 'CenterHome' */'../views/Center/components/Center')
      },
      {
        path: 'settings',
        component: () => import(/* webpackChunkName: 'CenterSettings' */'../views/Center/components/Settings'),
        linkExactActiveClass: 'layui-this',
        children: [
          {
            path: '',
            name: 'settingsBasic',
            component: () => import(/* webpackChunkName: 'CenterSettingsBasic' */'../views/Center/settings/Basic')
          },
          {
            path: 'avatar',
            name: 'settingsAvatar',
            component: () => import(/* webpackChunkName: 'CenterSettingsAvatar' */'../views/Center/settings/Avatar')
          },
          {
            path: 'password',
            name: 'settingsPassword',
            component: () => import(/* webpackChunkName: 'CenterSettingsPassword' */'../views/Center/settings/Password')
          },
          {
            path: 'email',
            name: 'settingsEmail',
            component: () => import(/* webpackChunkName: 'CenterSettingsEmail' */'../views/Center/settings/Email')
          },
          {
            path: 'bind',
            name: 'settingsBind',
            component: () => import(/* webpackChunkName: 'CenterSettingsBind' */'../views/Center/settings/Bind')
          }
        ]
      },
      {
        path: 'myPost',
        component: () => import(/* webpackChunkName: 'CenterMyPost' */'../views/Center/components/MyPost'),
        children: [
          {
            path: '',
            name: 'myPosts',
            component: () => import(/* webpackChunkName: 'CenterMyPostPosts' */'../views/Center/myPost/Posts')
          },
          {
            path: 'myCollection',
            name: 'myCollection',
            component: () => import(/* webpackChunkName: 'CenterMyPostCollection' */'../views/Center/myPost/Collection')
          }
        ]
      },
      {
        path: 'message',
        name: 'settingsMessage',
        component: () => import(/* webpackChunkName: 'CenterMessage' */'../views/Center/components/Message')
      },
      {
        path: 'others',
        name: 'settingsOthers',
        component: () => import(/* webpackChunkName: 'CenterOthers' */'../views/Center/components/Others')
      }
    ]
  },
  {
    path: '/postCreate',
    name: 'postCreate',
    meta: { requiresAuth: true },
    component: () => import(/* webpackChunkName: 'postCreate' */'../views/Post/create')
  },
  {
    path: '/postEdit/:pid',
    name: 'postEdit',
    props: true,
    meta: { requiresAuth: true },
    component: () => import(/* webpackChunkName: 'postEdit' */'../views/Post/edit'),
    beforeEnter (to, from, next) {
      console.log(from)
      if (['postDetail', 'myPosts'].indexOf(from.name) !== -1 &&
        to.params.detail && to.params.detail.isEnd === '0') { // 正常的情况 detail
        next()
      } else { // 用户在edit页面刷新的情况
        const editData = localStorage.getItem('editData')
        if (editData && editData !== '') {
          const editObj = JSON.parse(editData)
          if (editObj.isEnd === '0') {
            next()
          } else {
            next('/')
          }
        } else {
          next('/')
        }
      }
    }
  },
  {
    path: '/postDetail/:pid',
    name: 'postDetail',
    props: true,
    component: () => import(/* webpackChunkName: 'postDetail' */'../views/Post/detail')
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: '404' */'../views/404')
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  linkExactActiveClass: 'layui-this',
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  if (token !== '' && token !== null) {
    const payload = jsonwebtoken.decode(token)
    if (dayjs().isBefore(dayjs(payload.exp * 1000))) {
      store.commit('setToken', token)
      store.commit('setUserInfo', userInfo)
      store.commit('setIsLogin', true)
    } else {
      localStorage.clear()
    }
  }
  // noinspection JSUnresolvedVariable
  to.matched.some(record => record.meta.requiresAuth) ? store.state.isLogin ? next() : next('/signIn') : next()
})

export default router
