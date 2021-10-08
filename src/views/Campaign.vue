<template>
  <section class="redirect flex row center">
    Você será redirecionado...
  </section>
</template>

<script>
export default {
  mounted() {
    let url = String(this.$route.params.url);
    url = url
      .replaceAll('--p--', '.')
      .replaceAll('--b--', '/');
    window.location.href = url;
  },
};
</script>

<style lang="stylus">
.redirect
  width 100%
  height 100%
  color #ccc
  font-size 30px
</style>
