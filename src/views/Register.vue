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
      <button type="submit" class="btn btn-primary" @click.prevent="registrar()">
        Registrar
      </button>
      <br />
    </form>
  </div>
</template>

<script>
export default {
  name: 'Registrar',
    data: () => ({
    form: {
      email: "",
      password: "",
    },
  }),
  methods: {
    register() {
      store
      .dispatch("auth/register", this.form)
      .then(()=>{
        this.$router.push('/dashboard')
      })
      .catch( err => {
        alert ( err )
      })

    },
  },
}
</script>

<style>

</style>