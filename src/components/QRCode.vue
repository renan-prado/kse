<template>
<div class="shelf-qrcode__item flex col center">
  <span> {{ views }} {{ views === 1 ? 'visualização' : 'visualizações' }} </span>
  <vue-qr :text="campaignURL" :size="size" backgroundColor="#fafafa" :callback="download" />
  <label> {{ name }} </label>
  <a class="shelf-qrcode__download" :download="campaign + '.png'" :href="imageUrl">Baixar</a>
  <a class="shelf-qrcode__teste" target="_blank" :href="campaignURL || ''">link para teste</a>
</div>
</template>

<script>
import VueQr from 'vue-qr';

export default {
  props: [
    'name',
    'campaign',
    'views',
    'uuid',
  ],
  data() {
    return {
      imageUrl: '',
      size: 220,
    };
  },
  created() {
    if (window.screen.width < 768) {
      this.size = 150;
    }
  },
  methods: {
    download(src) {
      this.imageUrl = src;
    },
  },
  computed: {
    campaignURL() {
      const campaing = this.campaign
        .replaceAll('/', '--b--')
        .replaceAll('.', '--p--');
      return `${window.location.origin}/campaign/${this.$route.params.id}/${this.uuid}/${campaing}`;
    },
  },
  components: {
    VueQr,
  },
};
</script>

<style lang="stylus">
.shelf-qrcode__item
  min-width 250px
  margin-bottom 24px

  @media screen and (max-width: 768px)
    min-width initial
    width 45%

  label
    margin-bottom 20px
    color #555
    font-size 18px

  a.shelf-qrcode__download
    background-color #555
    color #fafafa
    padding 7px 24px
    text-decoration none
    border-radius 8px

.shelf-qrcode__teste
  margin-top 10px
</style>
