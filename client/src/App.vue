<script setup>
import HeaderComp from './components/HeaderComp.vue';
import { ref, watch, watchEffect } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { ElLoading } from 'element-plus';
import useMainStore from '@/store';

const loader = ref();

const store = useMainStore();
const { setEventsCategories } = store;
const { result: eventsCategoriesRes, loading: eventsCategoriesLoading } =
  useQuery(gql`
    query EventsCategoriesQuery {
      eventsCategoriesList {
        items {
          id
          label
          value
        }
      }
    }
  `);

// updating local storage
const { result: chosenCityFullRes, loading: chosenCityFullLoading } = useQuery(
  gql`
    query ChosenCityFullQuery($value: String!) {
      city(value: $value) {
        id
        country
        value
        yandexCode
      }
    }
  `,
  {
    value: store.chosenCity?.value,
  },
  {
    skip: !store.chosenCity,
  }
);

watch(chosenCityFullRes, (chosenCityFullResVal) =>
  store.setChosenCity(chosenCityFullResVal.city)
);

watch(eventsCategoriesRes, (eventsCategoriesResVal) => {
  const eventsCategories = eventsCategoriesResVal?.eventsCategoriesList?.items;
  setEventsCategories(
    eventsCategories.map((eventsCategory) => ({
      ...eventsCategory,
      isActive: true,
    }))
  );
});

watchEffect(() => {
  if (eventsCategoriesLoading.value || chosenCityFullLoading.value) {
    loader.value = ElLoading.service({
      lock: true,
      text: 'Loading',
      background: 'rgba(0, 0, 0, 0.7)',
    });
  } else {
    loader.value.close();
  }
});
</script>
<template>
  <HeaderComp />
  <router-view />
</template>
<style lang="scss">
@use './styles/element/index.scss' as *;

@font-face {
  font-family: 'FuturaDemiC';
  src: url('./assets/fonts/Futura/FuturaDemiC.eot');
  src: local('Futura Demi Cyrillic'), local('FuturaDemiC'),
    url('./assets/fonts/Futura/FuturaDemiC.eot?#iefix')
      format('embedded-opentype'),
    url('./assets/fonts/Futura/FuturaDemiC.woff') format('woff'),
    url('./assets/fonts/Futura/FuturaDemiC.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'FuturaMediumC';
  src: url('./assets/fonts/Futura/FuturaMediumC.eot');
  src: local('Futura Medium Cyrillic'), local('FuturaMediumC'),
    url('./assets/fonts/Futura/FuturaMediumC.eot?#iefix')
      format('embedded-opentype'),
    url('./assets/fonts/Futura/FuturaMediumC.woff') format('woff'),
    url('./assets/fonts/Futura/FuturaMediumC.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: 'FuturaLightC';
  src: url('./assets/fonts/Futura/FuturaLightC-Italic.eot');
  src: local('Futura Light Italic Cyrillic'), local('FuturaLightC-Italic'),
    url('./assets/fonts/Futura/FuturaLightC-Italic.eot?#iefix')
      format('embedded-opentype'),
    url('./assets/fonts/Futura/FuturaLightC-Italic.woff') format('woff'),
    url('./assets/fonts/Futura/FuturaLightC-Italic.ttf') format('truetype');
  font-weight: 300;
  font-style: italic;
}

@font-face {
  font-family: 'FuturaMediumC';
  src: url('./assets/fonts/Futura/FuturaMediumC-Italic.eot');
  src: local('Futura Medium Italic Cyrillic'), local('FuturaMediumC-Italic'),
    url('./assets/fonts/Futura/FuturaMediumC-Italic.eot?#iefix')
      format('embedded-opentype'),
    url('./assets/fonts/Futura/FuturaMediumC-Italic.woff') format('woff'),
    url('./assets/fonts/Futura/FuturaMediumC-Italic.ttf') format('truetype');
  font-weight: 500;
  font-style: italic;
}

@font-face {
  font-family: 'FuturaLightC';
  src: url('./assets/fonts/Futura/FuturaLightC.eot');
  src: local('Futura Light Cyrillic'), local('FuturaLightC'),
    url('./assets/fonts/Futura/FuturaLightC.eot?#iefix')
      format('embedded-opentype'),
    url('./assets/fonts/Futura/FuturaLightC.woff') format('woff'),
    url('./assets/fonts/Futura/FuturaLightC.ttf') format('truetype');
  font-weight: 300;
  font-style: normal;
}

@font-face {
  font-family: 'FuturaDemiC';
  src: url('./assets/fonts/Futura/FuturaDemiC-Italic.eot');
  src: local('Futura Demi Italic Cyrillic'), local('FuturaDemiC-Italic'),
    url('./assets/fonts/Futura/FuturaDemiC-Italic.eot?#iefix')
      format('embedded-opentype'),
    url('./assets/fonts/Futura/FuturaDemiC-Italic.woff') format('woff'),
    url('./assets/fonts/Futura/FuturaDemiC-Italic.ttf') format('truetype');
  font-weight: normal;
  font-style: italic;
}

@font-face {
  font-family: 'FuturaBookC';
  src: url('./assets/fonts/Futura/FuturaBookC-Italic.eot');
  src: local('Futura Book Italic Cyrillic'), local('FuturaBookC-Italic'),
    url('./assets/fonts/Futura/FuturaBookC-Italic.eot?#iefix')
      format('embedded-opentype'),
    url('./assets/fonts/Futura/FuturaBookC-Italic.woff') format('woff'),
    url('./assets/fonts/Futura/FuturaBookC-Italic.ttf') format('truetype');
  font-weight: normal;
  font-style: italic;
}

@font-face {
  font-family: 'FuturaBookC';
  src: url('./assets/fonts/Futura/FuturaBookC.eot');
  src: local('Futura Book Cyrillic'), local('FuturaBookC'),
    url('./assets/fonts/Futura/FuturaBookC.eot?#iefix')
      format('embedded-opentype'),
    url('./assets/fonts/Futura/FuturaBookC.woff') format('woff'),
    url('./assets/fonts/Futura/FuturaBookC.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

html,
body {
  font-family: FuturaBookC, Helvetica, Arial, sans-serif;
  height: 100%;
  margin: 0;
}

button,
input,
select,
textarea {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  color: inherit;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
}

.mapboxgl-map {
  font-family: FuturaBookC, Helvetica, Arial, sans-serif;
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

.info-color {
  color: $color-info !important;
}

.primary-color {
  color: $color-primary !important;
}

.italic {
  font-style: italic !important;
}

.al-it-cen {
  display: flex;
  align-items: center;
}

.al-it-start {
  display: flex;
  align-items: flex-start;
}

.jus-con-sp-bet {
  display: flex;
  justify-content: space-between;
}

.flx-dir-col {
  display: flex;
  flex-direction: column;
}

.flx-wrap {
  display: flex;
  flex-wrap: wrap;
}

.jus-con-start {
  display: flex;
  justify-content: flex-start;
}

.jus-con-end {
  display: flex;
  justify-content: flex-end;
}

.flx {
  display: flex;
}

.inblock {
  display: inline-block;
}

.inblock {
  display: inline-block;
}

$sizes: 4, 8, 12, 16, 20;

@each $size in $sizes {
  .px#{$size} {
    padding-right: #{$size}px;
    padding-left: #{$size}px;
  }
}
</style>
