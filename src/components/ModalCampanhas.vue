<template>
<div>
  <div :class="{'modal__overlay': true, 'active': open}" @click="close"></div>
  <div :class="{'modal__app flex col center': true, 'active': open}">
    <div class="modal__tabs">
      <div class="loading flex col center" :class="{ active: loading }">
        carregando...
      </div>
      <div class="modal__tab1 flex row center wrap" v-show="tab === 1">
        <span @click="close">x</span>
        <h2> Adicionar Campanha </h2>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  Adicionado
                </th>
                <th class="text-center">
                  Nome
                </th>
                <th class="text-center">
                  Excluir
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="campaign in campaigns" :key="campaign.uuid">
                <td class="text-left">
                  <input
                    v-model="campaign.has"
                    @click.stop.prevent="toogleCampaign(campaign.uuid)" type="checkbox" />
                </td>
                <td>{{ campaign.nome }} </td>
                <td> <button class="delete" @click="deletes(campaign.uuid)">x</button> </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import fb from '@/database/Firebase';

export default {
  data: () => ({
    tab: 1,
    campaigns: [],
    userCampaign: [],
    database: null,
    loading: false,
  }),

  props: [
    'open',
  ],

  async created() {
    this.database = fb.database();
    await this.getUserCampaign(this.$route.params.id);
    await this.getCampaigns();
  },

  methods: {
    async deletes(uuid) {
      await this.database
        .ref(`/campaign/${uuid}`)
        .set(null);
      await this.getCampaigns();
      this.getUserCampaign(this.$route.params.id);
    },
    async close() {
      this.$emit('toggle');
      await this.getCampaigns();
      this.getUserCampaign(this.$route.params.id);
    },
    has(uuid) {
      return this.userCampaign.some((campaign) => campaign === uuid);
    },
    async delay() {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    },
    async toogleCampaign(currentUuid) {
      this.loading = true;
      const result = await this.database
        .ref(`/users/${this.$route.params.id}/campaigns/${currentUuid}`)
        .once('value');

      const currentCampaign = result.val();

      if (currentCampaign) {
        await this.database
          .ref(`/users/${this.$route.params.id}/campaigns/${currentUuid}`)
          .set(null);
      } else {
        await this.database
          .ref(`/users/${this.$route.params.id}/campaigns/${currentUuid}`)
          .set(0);
      }
      await this.getUserCampaign(this.$route.params.id);
      await this.getCampaigns();
      this.loading = false;
    },
    async getUserCampaign(uuid) {
      const users = await this.database
        .ref(`/users/${uuid}/campaigns`)
        .once('value');

      if (!users || !Reflect.has(users, 'val')) {
        this.userCampaign = [];
        return [];
      }

      const userValue = users.val();

      if (!userValue) {
        this.userCampaign = [];
        return [];
      }

      const userChildren = Object.keys(userValue);

      if (!userChildren.length) {
        this.userCampaign = [];
        return [];
      }

      this.userCampaign = userChildren;
      return userChildren;
    },

    async getCampaigns() {
      const campaigns = await this.database
        .ref('/campaign')
        .once('value');

      if (!campaigns || !Reflect.has(campaigns, 'val')) {
        this.campaigns = [];
        return [];
      }

      const campaignValue = campaigns.val();
      if (!campaignValue) {
        this.campaigns = [];
        return [];
      }
      const campaignChildren = Object.values(campaignValue);

      if (!campaignChildren) {
        this.campaigns = [];
        return [];
      }

      const campaignsAll = campaignChildren.map((campaign) => {
        const { nome, uuid, url } = campaign;
        const has = this.has(uuid);
        return {
          nome, uuid, url, has,
        };
      });

      this.campaigns = campaignsAll;
      return campaignsAll;
    },
  },
};
</script>

<style lang="stylus">
.modal__tabs .modal__tab1 .delete
  background-color: #ff6363;
  width: 27px;
  height: 27px;
  padding: 0px 1px 1px 0;
  border-radius: 50%;
  zoom: 0.8;

.loading
  position absolute
  top 0
  left 0
  width 100%
  height 100%
  background-color #ffffffdd
  color #aaa
  font-size 24px
  text-transform capitalize
  transition 0.2s
  opacity 0
  pointer-events none

  &.active
    opacity 1
    pointer-events initial

.modal__tabs input[type="checkbox"]
  min-width initial
  max-width initial
  width 50px
  margin-bottom: 0;
  cursor pointer

tr td
  text-align center

.v-data-table
  width 100%
.modal__overlay
  width 100%
  height 100vh
  position fixed
  top 0
  left 0
  background-color #00000066
  pointer-events none
  opacity 0
  transition 0.2s
  z-index: 1;

  &.active
    pointer-events initial
    opacity 1

.modal__app
  min-width 300px
  max-width 600px
  max-height 80vh
  overflow auto
  width 90%
  padding 40px
  background-color #fff
  position fixed
  top 50%
  left 50%
  transform translate(-50%, -50%)
  box-shadow 0px 0px 12px 4px #888
  border-radius 5px
  pointer-events none
  opacity 0
  transition 0.2s
  z-index: 1;

  &.active
    pointer-events initial
    opacity 1

  span
    position absolute
    top 10px
    right 20px
    color #784e8b
    cursor pointer

.modal__tabs
  .inputs
    margin 10px 0 30px
  input
    border 1px solid #784e8b
    min-width 250px
    padding 5px
    border-radius 5px
    margin-bottom 10px
    text-align center
    color #784e8b
    outline none
    &::placeholder
      color #784e8b
  .modal__tab1
    h2
      flex: 0 0 100%;
      justify-content: center;
      display: flex;
      margin-bottom 30px
      color #784e8b

      b
        margin 0 5px 0px 10px
        font-weight 600

    button
      margin 0 10px
      padding 14px 30px
      background-color #784e8b
      color #fff
      border-radius 8px
      transition 0.2s
      &:hover
        opacity .9

</style>
