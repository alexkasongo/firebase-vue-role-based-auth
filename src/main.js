import Vue from 'vue'
import App from './App.vue'
import router from './router'

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from 'firebase/app';

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "**************",
  authDomain: "**************",
  databaseURL: "**************",
  projectId: "**************",
  storageBucket: "**************",
  messagingSenderId: "**************",
  appId: "**************"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
