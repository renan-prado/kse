<template>
  <section>
    <ModalCampanhas :open="open" @toggle="toggle" />
    <header class="flex col center">
      <div>
        <b>Colaborador:</b> {{ collaboratorName }}
        <button class="delete" @click="deletes">x</button>
      </div>
      <button @click="toggle"> Ver Campanhas </button>
    </header>
    <Shelf />
  </section>
</template>

<script>
/* eslint-disable no-alert */
import Shelf from '@/components/Shelf.vue';
import ModalCampanhas from '@/components/ModalCampanhas.vue';
import fb from '@/database/Firebase';

export default {
  data: () => ({
    collaboratorName: '',
    open: false,
  }),
  created() {
    this.getCollaborator();
  },

  methods: {
    toggle() {
      this.open = !this.open;
      if (!this.open) {
        window.location.reload();
      }
    },
    async getCollaborator() {
      const database = fb.database();
      const { id } = this.$route.params;
      const result = await database
        .ref(`/users/${id}/nome`)
        .once('value');
      this.collaboratorName = result.val();
    },
    async deletes() {
      const database = fb.database();
      const { id } = this.$route.params;
      // eslint-disable-next-line no-restricted-globals
      const response = confirm('Deseja mesmo deletar o colaborador?');
      if (response) {
        await database
          .ref(`/users/${id}`)
          .set(null);
        window.location.href = '/';
      }
    },
  },

  components: {
    Shelf,
    ModalCampanhas,
  },
};
</script>

<style lang="stylus">
  .delete
    background-color: #ff6363;
    width: 27px;
    height: 27px;
    padding: 0px 1px 1px 0;
    border-radius: 50%;
    zoom: 0.6;
    position relative
    top -4px
    left 10px
  header
    width 100%
    height 120px
    color #888
    font-size 20px
    margin-bottom 20px
    b
      margin-right 5px

    button
      background-color #c462ed
      color #fff
      font-size 16px
      padding 5px 20px
      border-radius 10px
      margin-top 10px
      transition 0.2s

      &:hover
        opacity 0.9
</style>
