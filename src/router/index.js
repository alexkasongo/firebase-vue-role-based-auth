import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import RegisterCustomer from '@/views/RegisterCustomer'
import RegisterAdmin from '@/views/RegisterAdmin'
import Admin from '@/views/Admin'
import Subscriber from '@/views/Subscriber'
import Customer from '@/views/Customer'
import * as firebase from "firebase/app";
import "firebase/auth";

Vue.use(VueRouter)

const routes = [
  {
    path: '/register-customer',
    name: 'regiester-customer',
    component: RegisterCustomer,
    meta: {
      guest: true
    },
  },
  {
    path: '/register-admin',
    name: 'register-admin',
    component: RegisterAdmin,
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
    path: '/subscriber',
    name: 'subscriber',
    component: Subscriber,
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
          } else if (claims.subscriber) {
            if (to.path !== '/subscriber')
              return next({
                path: '/subscriber',
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
