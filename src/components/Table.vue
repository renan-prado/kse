<template>
  <section class="table">
    <Modal :open="open" @toggle="toogle" />

    <div class="table__head">
      <h2> Colaboradores </h2>
      <button @click="toogle"> Adicionar </button>
    </div>

    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Nome
            </th>
            <th class="text-center">
              Campanhas
            </th>
            <th class="text-center">
              Acessos
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="collaborator in collaborators"
            :key="collaborator.uuid"
            @click="goToCollaborator(collaborator.uuid)"
          >
            <td class="text-left"> {{ collaborator.nome }}</td>
            <td class="text-center"> {{ collaborator.campaigns }} </td>
            <td class="text-center"> {{ collaborator.views }} </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </section>
</template>

<script>
import Modal from './Modal.vue';
import fb from '@/database/Firebase';

export default {
  components: {
    Modal,
  },
  data: () => ({
    open: false,
    collaborators: [],
  }),
  methods: {
    goToCollaborator(id) {
      window.location.href = `/collaborator/${id}`;
    },
    toogle() {
      this.getCollaborators();
      this.open = !this.open;
    },
    getCollaborators() {
      const database = fb.database();

      database
        .ref('/users')
        .once('value')
        .then(async (users) => {
          const userValue = users.val();
          const userChildren = Object.values(userValue);

          let collaborators = userChildren.map(async (user) => {
            const {
              nome, uuid, collaborator, campaigns,
            } = user;

            console.log(user);

            const length = campaigns ? Object.values(campaigns).length : 0;
            const campaignsIds = campaigns ? Object.keys(campaigns) : [];

            const viewList = await campaignsIds.map(async (campaign) => {
              const views = await database
                .ref(`/users/${uuid}/campaigns/${campaign}`)
                .once('value');

              return views.val();
            });

            const views = await Promise.all(viewList);
            const viewsTotal = views.reduce((acm, item) => acm + item, 0);

            return {
              nome, uuid, collaborator, campaigns: length, views: viewsTotal,
            };
          });

          collaborators = await Promise.all(collaborators);
          collaborators = collaborators.filter((user) => user.collaborator);

          this.collaborators = collaborators;
        });
    },
  },
  created() {
    this.getCollaborators();
  },
};
</script>

<style lang="stylus">

.table
  min-width 720px
  padding 20px
  background-color #fff
  max-width 800px
  box-shadow 0 0 16px #00000011

  @media screen and (max-width: 768px)
    min-width 100%

.table__head
  display flex
  justify-content space-between
  padding 0 20px
  margin-bottom 20px

  h2
    font-size 22px
    color #784e8b

  button
    font-size 14px
    padding 5px 20px
    border-radius 8px
    background-color #c462ed
    color #fff
    transition .2s

    &:hover
      opacity .9

.v-main section.table .v-data-table .v-data-table__wrapper
  table tr
    th
      font-size 16px
      color #784e8b
      background-color #fff
    th, td
      cursor pointer
      color #7c6387

    &:hover
      background-color #ece6f7 !important

    &:nth-child(odd)
      background-color #f9f6fb
</style>
