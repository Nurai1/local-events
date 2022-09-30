<script setup>
import { ref, watch } from 'vue';
import { Tools as ToolsIcon } from '@element-plus/icons-vue';
import { format } from 'date-fns';
import {
  BookIcon,
  BusIcon,
  PaletteIcon,
  ChampagneGlassesIcon,
  WandMagicIcon,
} from '../icons';
import useMainStore from '@/store';
import { COUNTRY_CURRENCY_MAP } from '@/constants';

const store = useMainStore();
const props = defineProps({
  name: String,
  type: String,
  price: Number,
  eventDate: String,
  place: String,
  description: String,
});

const descriptionRef = ref(null);
const isDescriptionTruncated = ref(false);

watch(descriptionRef, () => {
  if (descriptionRef.value) {
    const element = descriptionRef.value;

    if (element.offsetHeight < element.scrollHeight) {
      isDescriptionTruncated.value = true;
    }
  }
});
watch(isDescriptionTruncated, () => {
  console.log(isDescriptionTruncated.value);
});

const filterToIconMap = {
  lectures: BookIcon,
  shows: WandMagicIcon,
  parties: ChampagneGlassesIcon,
  trips: BusIcon,
  custom: ToolsIcon,
  exhibitions: PaletteIcon,
};

const Icon = filterToIconMap[props.type];
const filterValue = store.standardFilters.find(
  (filter) => filter.id === props.type
).value;

const formattedDate = format(new Date(props.eventDate), 'do MMMM');
const formattedTime = format(new Date(props.eventDate), "HH':'mm");
</script>

<template>
  <el-card>
    <div class="title_block">
      <span class="title">{{ name }}</span>
    </div>
    <div class="v-align subtitle_block">
      <div class="v-align">
        <el-icon class="el-icon--left">
          <Icon />
        </el-icon>
        <span class="subtitle">{{ filterValue }}</span>
      </div>
      <span class="subtitle subtitle_date"
        >{{ formattedTime }}, {{ formattedDate }}</span
      >
    </div>
    <div class="body_block">
      <span
        >{{ COUNTRY_CURRENCY_MAP[store.chosenCity.country] || '' }}
        {{ price }}</span
      >
    </div>
    <div class="body_block" v-if="description">
      <span class="description" ref="descriptionRef">{{ description }}</span>
    </div>
  </el-card>
</template>

<style scoped lang="scss">
@use 'sass:color';
@use '../../styles/element/index.scss' as *;

.subtitle_block {
  justify-content: space-between;
}
.el-card {
  text-align: left;
}
.body_block {
  margin-top: 10px;
}
.description {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  /* truncate to 4 lines */
  -webkit-line-clamp: 4;
}
</style>
