<template>
  <section class="main flex col center" v-show="load">
    <Table />
  </section>
</template>

<script>
import Table from '@/components/Table.vue';
import fb from '@/database/Firebase';

const auth = fb.auth();
const database = fb.database();

export default {
  name: 'Home',
  data: () => ({
    load: false,
  }),
  components: {
    Table,
  },
  async created() {
    auth.onAuthStateChanged(async (user) => {
      console.log('user', user);
      const hasAdmin = localStorage.kseemail && localStorage.kseemail.indexOf('@admin') > 1;

      if (!user && !hasAdmin) {
        window.location.href = '/login';
      } else {
        const result = await database
          .ref(`/users/${user.uid}/collaborator`)
          .once('value');

        if (result.val() && !hasAdmin) {
          window.location.href = `/collaborator/${user.uid}`;
        } else {
          this.load = true;
        }
      }
    });
  },
};
</script>

<style lang="stylus">
.main
  padding 0 20px

</style>
