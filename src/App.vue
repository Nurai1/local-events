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
