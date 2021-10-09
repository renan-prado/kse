<template>
<div class="shelf-qrcode flex row center wrap">
  <QRCode
    v-for="code in codes"
    :key="code.uuid"
    :uuid="code.uuid"
    :name="code.nome"
    :campaign="code.url"
    :views="code.views || 0"
    :isCollaborator="isCollaborator"
  />
</div>
</template>

<script>
import QRCode from '@/components/QRCode.vue';
import fb from '@/database/Firebase';

export default {
  props: ['isCollaborator'],
  data: () => ({
    codes: [],
    database: null,
  }),
  components: {
    QRCode,
  },
  created() {
    this.database = fb.database();
    this.getQrs();
  },
  methods: {
    async getQrs() {
      const users = await this.database
        .ref(`/users/${this.$route.params.id}/campaigns`)
        .once('value');

      if (!users || !Reflect.has(users, 'val')) {
        this.codes = [];
        return [];
      }

      const userValue = users.val();

      if (!userValue) {
        this.codes = [];
        return [];
      }

      const userChildren = Object.keys(userValue);
      const userChildrenQuantity = Object.values(userValue);

      if (!userChildren.length) {
        this.codes = [];
        return [];
      }

      const codesPromises = userChildren.map(async (child, index) => {
        const campaignResult = await this.database
          .ref(`/campaign/${child}`)
          .once('value');

        const campaign = campaignResult.val();
        if (!campaign) return null;
        campaign.views = userChildrenQuantity[index];

        return campaign;
      });

      let codes = await Promise.all(codesPromises);
      codes = codes.filter((code) => code !== null);

      this.codes = codes;
      return [];
    },
  },
};
</script>

<style lang="stylus">
.shelf-qrcode
  width 100%
</style>
