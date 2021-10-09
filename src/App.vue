<template>
  <v-app>
    <button v-show="!login" class="signup" @click="signup"> sair </button>
    <Header />
    <v-main>
      <router-view/>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import fb from '@/database/Firebase';

const auth = fb.auth();

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  data: () => ({
    login: false,
  }),
  created() {
    this.login = window.location.pathname.indexOf('/login') > -1;
  },
  methods: {
    signup() {
      localStorage.removeItem('kseemail');
      localStorage.removeItem('ksepassword');
      auth.signOut();
    },
  },
};
</script>

<style lang="stylus">

.signup
  position fixed
  top 20px
  right 30px

.v-application--wrap
  background-color #f8f8fb

.flex
  display flex
  &.col
    flex-direction column
  &.row
    flex-direction row
  &.center
    align-items center
    justify-content center
  &.wrap
    flex-wrap wrap

</style>
