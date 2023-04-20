<script setup>
import { COUNTRY_CURRENCY_MAP } from '@/constants';
import useMainStore from '@/store';
import { computed } from 'vue';

const props = defineProps({ price: String });
const store = useMainStore();

const isPriceNaN = computed(() => isNaN(parseFloat(props.price)));
const priceText = computed(() => {
  if (!props.price) return 'Free';

  const price = isPriceNaN.value ? props.price : parseFloat(props.price);

  return (
    ((!isPriceNaN.value && COUNTRY_CURRENCY_MAP[store.chosenCity.country]) ||
      '') + price
  );
});
</script>
<template>
  <span :class="props.price && !isPriceNaN ? '' : 'any-text'">
    {{ priceText }}</span
  >
</template>
<style lang="scss" scoped>
@use '../styles/element/index.scss' as *;

.any-text {
  color: $color-primary;
  font-style: italic;
}
</style>
