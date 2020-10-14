<template>
  <div>
    <div v-if="loading" class="col-md-6 mt-2">
      <p>loading...</p>
    </div>
    <div v-if="!loading" class="d-flex flex-row justify-content-center">
      <div class="col-md-8 mt-5">
        <div class="card">
          <div class="card-header">Admin Sign Up</div>

          <div class="card-body">
            <form @submit.prevent="onSubmit">
              <div class="form-group">
                <input
                  type="text"
                  placeholder="Name"
                  v-model="name"
                  class="form-control"
                  required
                />
              </div>

              <div class="form-group">
                <input
                  type="text"
                  placeholder="Email"
                  v-model="email"
                  class="form-control"
                  required
                />
              </div>

              <div class="form-group">
                <input
                  type="password"
                  placeholder="Password"
                  v-model="password"
                  class="form-control"
                  required
                />
              </div>

              <div v-if="errors" class="form-group text-muted">
                {{ errors.message }}
              </div>

              <v-btn type="submit" class="teal darken-1" dark>Submit</v-btn>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/functions";

export default {
  data() {
    return {
      name: "",
      phone: "",
      email: "",
      password: "",
      user: null,
    };
  },
  methods: {
    async onSubmit() {
      let admin = {
        role: {
          admin: true,
        },
      };

      await firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((response) => {
          if (response) {
            const setAdmin = firebase.functions().httpsCallable("setAdmin");
            const data = { uid: response.user.uid, role: admin.role };
            setAdmin(data).then((result) => {
              console.log(`index.js - 183 - "🎉"`, result);
            });

            response.user
              .updateProfile({
                displayName: user.name,
              })
              .then(() => {
                // signout
                firebase
                  .auth()
                  .signOut()
                  .then((user) => {
                    this.$router.push("/login");
                  });
              });
          }
        })
        .catch((error) => {
          // Handle Errors here.
          console.log("🤡", error.message);
        });
    },
  },
  created() {
    firebase.auth().onAuthStateChanged((userAuth) => {
      if (userAuth) {
        firebase
          .auth()
          .currentUser.getIdTokenResult()
          .then((tokenResult) => {
            console.log("🍎 ", tokenResult.claims);
            this.role = tokenResult.claims;
          });
      }
    });
  },
};
</script>

<style></style>
