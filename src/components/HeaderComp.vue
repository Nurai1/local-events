<template>
  <nav>
    <router-link to="/choose-city">Choose your city</router-link>
    | <router-link to="/map">Map</router-link> |
    <router-link to="/create-event">Create an event</router-link>
  </nav>
</template>
<style scoped lang="scss">
@use '../styles/constants.scss' as *;

nav {
  width: 100%;
  height: $header-height;
  display: flex;
  align-items: center;
  justify-content: center;
}

a {
  margin-left: 10px;
  margin-right: 10px;
}
</style>
<script setup></script>
