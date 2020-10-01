<template>
  <div class="d-flex justify-content-center">
    <form>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          v-model="form.email"
        />
        <small id="emailHelp" class="form-text text-muted"
          >We'll never share your email with anyone else.</small
        >
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          v-model="form.password"
        />
      </div>
      <button type="submit" class="btn btn-primary" @click.prevent="login()">
        Entrar
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import store from "../store";

export default {
  name: "Login",
  data: () => ({
    form: {
      email: "",
      password: "",
    },
  }),
  methods: {
    login() {
      store
      .dispatch("auth/login", this.form)
      .then(()=>{
        this.$router.push('/dashboard')
      })
      .catch( err => {
        alert ( err )
      })

    },
  },
};
</script>

<style>
.btn-primary {
  background-color: #42b983;
  border-color: #42b983;
}
</style>