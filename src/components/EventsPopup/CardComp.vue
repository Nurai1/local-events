<script setup>
import { ref, watch } from 'vue';
import { format } from 'date-fns';
import omit from 'lodash/omit';
import BusIcon from '@/assets/BusSolid.svg';
import BookIcon from '@/assets/BookSolid.svg';
import PaletteIcon from '@/assets/JustPalette.svg';
import ChampagneGlassesIcon from '@/assets/ChampagneGlasses.svg';
import WandMagicIcon from '@/assets/WandMagic.svg';
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
  categories: {
    required: true,
    type: Object,
  },
  price: Number,
  eventDate: String,
  place: Object,
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
  exhibitions: PaletteIcon,
};

const formattedDate = format(new Date(props.eventDate), 'do MMMM');
const formattedTime = format(new Date(props.eventDate), "HH':'mm");
const categories = {
  items: [
    { value: 'shows', label: 'Выступления' },
    { value: 'trips', label: 'Путешествия' },
  ],
};
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
      <div class="al-it-cen flx-dir-col">
        <div
          class="flx"
          v-for="category in categories.items"
          :key="category.id"
        >
          <el-icon class="el-icon--left">
            <img :src="filterToIconMap[category.value]" />
          </el-icon>
          <span class="subtitle">{{ category.label }}</span>
        </div>
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
.subtitle_date {
  text-align: right;
}
.subtitle_block {
  justify-content: space-between;
}
.categories {
  flex-direction: column;
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
