<template>
<div class="shelf-qrcode flex row center wrap">
  <QRCode
    v-for="code in codes"
    :key="code.campaign"
    :name="code.name"
    :campaign="code.campaign"
    :views="code.views"
  />
</div>
</template>

<script>
import QRCode from '@/components/QRCode.vue';

export default {
  data: () => ({
    codes: [
      {
        name: 'Campanha de Natal',
        campaign: 'https://stylus-lang.com/docs/media.html',
        views: 10,
      },
      {
        name: 'Ze do hamburguer',
        campaign: 'https://www.linkedin.com/in/renan-prado-49426374/',
        views: 21,
      },
      {
        name: 'Maria Maquiagem',
        campaign: 'https://www.google.com/',
        views: 44,
      },
    ],
  }),
  components: {
    QRCode,
  },
};
</script>

<style lang="stylus">
.shelf-qrcode
  width 100%
</style>
