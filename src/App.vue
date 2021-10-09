<template>
  <v-app>
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

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="stylus">

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
