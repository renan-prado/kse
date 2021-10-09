<template>
  <header class="header flex row center">
    <router-link to="/">
      <img src="../assets/logo.jpeg" alt="Default Logo">
    </router-link>
  </header>
</template>

<style lang="stylus">
.header
  width 100%
  height 70px
  margin-bottom 40px
  margin-top 40px

  > a
    overflow: hidden;
    border-radius: 30px;
    width: 100px;
    height: 100px;
    box-shadow: 0px 0px 15px 0px #ccc;

  img
    width 100px
</style>
