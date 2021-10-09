<template>
<div>
  <div :class="{'modal__overlay': true, 'active': open}" @click="close"></div>
  <div :class="{'modal__app flex col center': true, 'active': open}">
    <div class="modal__tabs">
      <div class="modal__tab1 flex row center wrap" v-show="tab === 1">
        <span @click="close">x</span>
        <h2> Adicionar </h2>
        <button @click="tab = 2"> Campanha </button>
        <button @click="tab = 3"> Colaborador </button>
      </div>
      <div class="modal__tab1 flex col center wrap" v-show="tab === 2">
        <span @click="close">x</span>
        <h2> Nova Campanha </h2>
        <div class="inputs flex col center wrap">
          <input type="text" v-model="campaignName" placeholder="Nome da campanha" />
          <input type="text" v-model="campaignUrl" placeholder="URL de direcionamento" />
        </div>
        <button @click="create">Adicionar</button>
      </div>
      <div class="modal__tab1 flex col center wrap" v-show="tab === 3">
        <span @click="close">x</span>
        <h2> Novo Colaborador </h2>
        <div class="inputs flex col center wrap">
          <input type="text" v-model="collaboratorName" placeholder="Nome do colaborador" />
          <input type="text" v-model="collaboratorEmail" placeholder="Email" />
          <input type="password" v-model="collaboratorPassword" placeholder="Senha" />
        </div>
        <button @click="createCollaborator">Adicionar</button>
      </div>
      <div class="modal__tab1 flex row center wrap" v-show="tab === 4">
        <span @click="close">x</span>
        <h2> Campanha: <b> {{ campaignName }} </b> criada! </h2>
      </div>
      <div class="modal__tab1 flex row center wrap" v-show="tab === 5">
        <span @click="close">x</span>
        <h2> Colaborador: <b> {{ collaboratorName }} </b> criado! </h2>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Campaign from '../model/Campaign';
import Collaborator from '../model/Collaborator';

export default {
  data: () => ({
    tab: 1,
    campaignName: '',
    campaignUrl: '',
    collaboratorName: '',
    collaboratorPassword: '',
    collaboratorEmail: '',
  }),

  props: [
    'open',
  ],

  methods: {
    close() {
      this.$emit('toggle');
      setTimeout(() => {
        this.tab = 1;
        this.campaignName = '';
        this.campaignUrl = '';
        this.collaboratorName = '';
        this.collaboratorPassword = '';
        this.collaboratorEmail = '';
      }, 500);
    },
    validateCampaign() {
      if (this.campaignName.length < 3) {
        // eslint-disable-next-line no-alert
        alert('O nome da Campanha deve haver pelo menos 3 caracteres!');
        return false;
      }
      if (this.campaignUrl.length < 12) {
        // eslint-disable-next-line no-alert
        alert('A URL deve haver pelo menos 12 caracteres!');
        return false;
      }

      return true;
    },
    validateCollaborator() {
      const validEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
      if (this.collaboratorName.length < 3) {
        // eslint-disable-next-line no-alert
        alert('O nome do colaborador deve haver pelo menos 3 caracteres!');
        return false;
      }
      if (!validEmail.test(this.collaboratorEmail)) {
        // eslint-disable-next-line no-alert
        alert('O e-mail esta em um formato incorreto');
        return false;
      }
      if (this.collaboratorPassword.length < 8) {
        // eslint-disable-next-line no-alert
        alert('A senha deve haver pelo menos 8 caracteres!');
        return false;
      }

      return true;
    },
    create() {
      const validate = this.validateCampaign();
      if (validate) {
        const campaign = new Campaign({
          name: this.campaignName,
          url: this.campaignUrl,
        });
        campaign.create();
        this.tab = 4;
      }
    },
    createCollaborator() {
      const validate = this.validateCollaborator();

      if (validate) {
        const collaborator = new Collaborator({
          name: this.collaboratorName,
          password: this.collaboratorPassword,
          email: this.collaboratorEmail,
        });

        collaborator.create();
        this.tab = 5;
      }
    },
  },
};
</script>

<style lang="stylus">
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

  &.active
    pointer-events initial
    opacity 1

.modal__app
  min-width 300px
  max-width 600px
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
