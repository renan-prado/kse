<template>
  <section class="table">

    <div class="table__head">
      <h2> Colaboradores </h2>
      <button> Adicionar </button>
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
            :key="collaborator.id"
            @click="goToCollaborator(collaborator.id)"
          >
            <td class="text-left"> {{ collaborator.name }}</td>
            <td class="text-center"> {{ collaborator.companies.length }} </td>
            <td class="text-center"> {{ collaborator.views }} </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </section>
</template>

<script>
export default {
  props: [
    'collaborators',
  ],
  methods: {
    goToCollaborator(id) {
      window.location.href = `/collaborator/${id}`;
    },
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
    color #888

  button
    font-size 14px
    padding 5px 20px
    border-radius 8px
    background-color #888
    color #fff
    transition .2s

    &:hover
      opacity .8

.v-main section.table .v-data-table .v-data-table__wrapper
  table tr
    th
      font-size 16px
      color #000
      background-color #fff
    th, td
      cursor pointer

    &:nth-child(odd)
      background-color #f6f6f6
</style>
