<template>
  <section class="redirect flex row center">
    Você será redirecionado...
  </section>
</template>

<script>
import fb from '@/database/Firebase';

export default {
  async mounted() {
    const database = fb.database();
    let url = String(this.$route.params.url);
    const collaborator = String(this.$route.params.uuid);
    const campaign = String(this.$route.params.campaign);

    url = url
      .replaceAll('--p--', '.')
      .replaceAll('--b--', '/');

    const result = await database
      .ref(`/users/${collaborator}/campaigns/${campaign}`)
      .once('value');

    const quantity = Number(result.val()) + 1 || 1;

    await database
      .ref(`/users/${collaborator}/campaigns/${campaign}`)
      .set(quantity);

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
