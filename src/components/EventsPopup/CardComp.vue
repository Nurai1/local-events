<script setup>
import { ref, watch } from 'vue';
import { Tools as ToolsIcon } from '@element-plus/icons-vue';
import { format } from 'date-fns';
import omit from 'lodash/omit';
import {
  BookIcon,
  BusIcon,
  PaletteIcon,
  ChampagneGlassesIcon,
  WandMagicIcon,
} from '../icons';
import useMainStore from '@/store';
import PriceBlock from '@/ui/PriceBlock.vue';

const store = useMainStore();
const props = defineProps({
  id: {
    required: true,
    type: String,
  },
  name: {
    required: true,
    type: String,
  },
  type: {
    required: true,
    type: String,
  },
  price: Number,
  eventDate: String,
  place: String,
  description: String,
  truncateDescription: Boolean,
  cardShadow: String,
  isOnlyEvent: Boolean,
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

const onCardClick = () => {
  if (isDescriptionTruncated.value) {
    store.setEventInfoPopupVisibility(true);
    store.setChosenEvent(omit(props, ['truncateDescription', 'cardShadow']));
  }
};

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
  <el-card
    @click="onCardClick"
    :shadow="cardShadow ?? 'always'"
    :body-style="
      truncateDescription && isDescriptionTruncated
        ? { cursor: 'pointer' }
        : undefined
    "
  >
    <div class="title_block">
      <span class="title">{{ name }}</span>
    </div>
    <div class="al-it-cen subtitle_block">
      <div class="al-it-cen">
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
      <PriceBlock :price="price" />
    </div>
    <div class="body_block" v-if="description || isOnlyEvent">
      <span
        :class="truncateDescription ? 'truncate-4-lines' : ''"
        ref="descriptionRef"
        >{{ description }}
        {{ !description && isOnlyEvent ? 'Без описания.' : '' }}</span
      >
    </div>
  </el-card>
</template>

<style scoped lang="scss">
.subtitle_block {
  justify-content: space-between;
}
.el-card {
  text-align: left;
}
.body_block {
  margin-top: 10px;
}

.truncate-4-lines {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  /* truncate to 4 lines */
  -webkit-line-clamp: 4;
}
</style>
