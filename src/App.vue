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
</style>
