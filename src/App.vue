<template>
  <HeaderComp />
  <router-view />
</template>
<script setup>
import HeaderComp from './components/HeaderComp.vue';
</script>
<style lang="scss">
@use './styles/element/index.scss' as *;

html,
body {
  height: 100%;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
}

a {
  text-decoration: none;
  color: $color-primary;
}

nav a.router-link-exact-active {
  // color: $color-success;
}

.title {
  font-weight: 500;
  font-size: 18px;
}

.subtitle {
  color: $color-info;
  font-size: 14px;
}

.al-it-cen {
  display: flex;
  align-items: center;
}

.jus-con-sp-bet {
  display: flex;
  justify-content: space-between;
}

.flx {
  display: flex;
}
</style>
