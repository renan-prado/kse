<template>
  <section>
    <header class="flex row center">
      <b>Colaborador:</b> {{ collaboratorName }}
    </header>
    <Shelf />
  </section>
</template>

<script>
import Shelf from '@/components/Shelf.vue';

export default {
  data: () => ({
    collaboratorName: 'Renanzito',
  }),

  components: {
    Shelf,
  },
};
</script>

<style lang="stylus">
  header
    width 100%
    height 50px
    color #888
    font-size 20px
    margin-bottom 20px
    b
      margin-right 5px
</style>
