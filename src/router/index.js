import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Admin from '@/views/Admin'
import Driver from '@/views/Driver'
import Customer from '@/views/Customer'
import * as firebase from "firebase/app";
import "firebase/auth";

Vue.use(VueRouter)

const routes = [
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      guest: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      guest: true
    }
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    meta: {
      auth: true
    }
  },
  {
    path: '/driver',
    name: 'driver',
    component: Driver,
    meta: {
      auth: true
    }
  },
  {
    path: '/customer',
    name: 'customer',
    component: Customer,
    meta: {
      auth: true
    }
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {

  firebase.auth().onAuthStateChanged(userAuth => {

    if (userAuth) {
      firebase.auth().currentUser.getIdTokenResult()
        .then(function ({
          claims
        }) {

          if (claims.customer) {
            if (to.path !== '/customer')
              return next({
                path: '/customer',
              })
          } else if (claims.admin) {
            if (to.path !== '/admin')
              return next({
                path: '/admin',
              })
          } else if (claims.driver) {
            if (to.path !== '/driver')
              return next({
                path: '/driver',
              })
          }

        })
    } else {
      if (to.matched.some(record => record.meta.auth)) {
        next({
          path: '/login',
          query: {
            redirect: to.fullPath
          }
        })
      } else {
        next()
      }
    }

  })

  next()

})

export default router
