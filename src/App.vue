<template>
  <nav>
    <router-link to="/choose-city">Choose your city</router-link>
    | <router-link to="/map">Map</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view />
</template>

<style lang="scss">
@use './styles/element/index.scss' as *;

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

a {
  text-decoration: none;
  color: $color-primary;
}

nav a.router-link-exact-active {
  // color: $color-success;
}
</style>
