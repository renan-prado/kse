<template>
  <section class="flex col center">
    <div class="login flex col center">
      <h2> Login </h2>
      <input v-model="email" type="text" placeholder="Email">
      <input v-model="password" type="password" placeholder="Senha">
      <button @click="login"> Entrar </button>
    </div>
  </section>
</template>

<script>
import fb from '@/database/Firebase';

const auth = fb.auth();
export default {
  data: () => ({
    email: '',
    password: '',
  }),
  async created() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        window.location.href = '/';
      }
    });
  },
  methods: {
    async login() {
      const login = auth.signInWithEmailAndPassword(this.email, this.password);
      login
        .then(() => {
          const hasAdmin = this.email.indexOf('@admin') > 1;
          if (hasAdmin) {
            localStorage.kseemail = this.email;
            localStorage.ksepassword = this.password;
          }
          window.location.href = '/';
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(errorCode, errorMessage);
        });
    },
  },
};
</script>

<style lang="stylus">

.login
  max-width 600px
  width 90%
  max-height 80vh
  padding 40px
  background-color #fff
  border-radius 20px
  position fixed
  top 50%
  left 50%
  transform translate(-50%, -50%)

  h2
    margin-bottom 30px
    color #784e8b

  input
    border 1px solid #784e8b
    min-width 250px
    padding 5px
    border-radius 5px
    margin-bottom 10px
    text-align center
    color #784e8b
    outline none
    &::placeholder
      color #784e8b

  button
      margin 0 10px
      padding 14px 30px
      background-color #784e8b
      color #fff
      border-radius 8px
      transition 0.2s
      margin-top 20px
      &:hover
        opacity .9

</style>
