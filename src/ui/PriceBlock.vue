<script setup>
import { COUNTRY_CURRENCY_MAP } from '@/constants';
import useMainStore from '@/store';

const props = defineProps({ price: Number });

const store = useMainStore();
const priceText = props.price
  ? (COUNTRY_CURRENCY_MAP[store.chosenCity.country] || '') + props.price
  : 'Бесплатно';
</script>
<template>
  <span :class="props.price ? '' : 'free-text'"> {{ priceText }}</span>
</template>
<style lang="scss" scoped>
@use '../styles/element/index.scss' as *;

.free-text {
  color: $color-primary;
  font-style: italic;
}
</style>
