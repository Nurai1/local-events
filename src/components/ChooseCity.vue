<script setup>
import { useRouter } from 'vue-router';
import { computed, ref, watch } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import useMainStore from '@/store';

const store = useMainStore();
const router = useRouter();

const { result, loading } = useQuery(gql`
  query CitiesListQuery {
    citiesList {
      items {
        id
        country
        value
        yandexCode
      }
    }
  }
`);
const cities = computed(() => result.value?.citiesList?.items ?? []);
const currentCity = ref('');

watch(currentCity, () => {
  const chosenCity = {
    value: currentCity.value,
    country: cities.value.find((city) => city.value === currentCity.value)
      .country,
    yandexCode: cities.value.find((city) => city.value === currentCity.value)
      .yandexCode,
  };
  store.setChosenCity(chosenCity);
});
</script>

<template>
  <el-row class="container" justify="center">
    <el-select v-model="currentCity" placeholder="Choose your city">
      <template #empty
        ><p class="el-select-dropdown__empty">
          {{ loading && !cities.length ? 'Loading...' : 'No data' }}
        </p>
      </template>
      <el-option v-for="city in cities" :key="city.id" :value="city.value">{{
        city.value
      }}</el-option>
    </el-select>
  </el-row>
  <el-row class="container" justify="center">
    <el-button type="primary" @click="router.push('/map')">
      <router-link to="/map">Go to the map</router-link>
    </el-button>
  </el-row>
</template>

<style scoped lang="scss">
@use '../styles/element/index.scss' as *;

.select_empty {
  padding: 5px;
  font-size: 14px;
}

.container {
  padding-left: 10px;
  padding-right: 10px;
  & > * {
    max-width: 500px;
    width: 100%;
  }
}

.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}

a {
  color: $color-white;
}
</style>
