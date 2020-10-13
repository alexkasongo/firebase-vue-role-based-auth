<template>
  <div id="app" class="container">
    <div class="row mt-5">
      <div class="col-sm"></div>
      <div v-if="!user" class="col-sm">
        <router-link to="/login">Login</router-link> |
        <router-link to="/register">Register</router-link>
      </div>
      <div class="col-sm"></div>
    </div>
    <router-view />
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
  data() {
    return {
      user: null,
    };
  },
  created() {
    var self = this;
    firebase.auth().onAuthStateChanged(function (user) {
      self.user = user;
    });
  },
};
</script>
