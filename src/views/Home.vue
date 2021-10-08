<template>
  <section class="main flex col center">
    <Table :collaborators="collaborators" />
  </section>
</template>

<script>
import Collaborator from '@/model/Collaborator';
import Table from '@/components/Table.vue';

export default {
  data: () => ({
    collaborators: [
      {
        id: 1,
        name: 'Joao',
        companies: [0, 0, 0, 0],
        views: 20,
      },
      {
        id: 2,
        name: 'Guilherme',
        companies: [0, 0, 0],
        views: 34,
      },
      {
        id: 3,
        name: 'Maria',
        companies: [0, 0, 0, 0, 0],
        views: 12,
      },
      {
        id: 4,
        name: 'Leticia',
        companies: [0, 0, 0, 0, 0, 0],
        views: 44,
      },
      {
        id: 4,
        name: 'Leticia',
        companies: [0, 0, 0, 0, 0, 0],
        views: 44,
      },
      {
        id: 4,
        name: 'Leticia',
        companies: [0, 0, 0, 0, 0, 0],
        views: 44,
      },
      {
        id: 4,
        name: 'Leticia',
        companies: [0, 0, 0, 0, 0, 0],
        views: 44,
      },
      {
        id: 4,
        name: 'Leticia',
        companies: [0, 0, 0, 0, 0, 0],
        views: 44,
      },
      {
        id: 4,
        name: 'Leticia',
        companies: [0, 0, 0, 0, 0, 0],
        views: 44,
      },
      {
        id: 4,
        name: 'Leticia',
        companies: [0, 0, 0, 0, 0, 0],
        views: 44,
      },
      {
        id: 4,
        name: 'Leticia',
        companies: [0, 0, 0, 0, 0, 0],
        views: 44,
      },
    ],
  }),
  name: 'Home',
  components: {
    Table,
  },

  mounted() {
    const collaborator = new Collaborator({
      name: 'Maria',
      email: 'maria@maria.com',
      password: '12345678',
    });
    collaborator.create();
  },
};
</script>

<style lang="stylus">
.main
  padding 0 20px

</style>
