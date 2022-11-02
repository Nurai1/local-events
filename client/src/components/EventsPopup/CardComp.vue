<script setup>
import { computed, ref, watch } from 'vue';
import { format } from 'date-fns';
import omit from 'lodash/omit';
import { Link as LinkIcon } from '@element-plus/icons-vue';
import BusIcon from '@/assets/BusSolid.svg';
import BookIcon from '@/assets/BookSolid.svg';
import PaletteIcon from '@/assets/JustPalette.svg';
import ChampagneGlassesIcon from '@/assets/ChampagneGlasses.svg';
import WandMagicIcon from '@/assets/WandMagic.svg';
import StoreIcon from '@/assets/store-solid.svg';
import PeopleGroupIcon from '@/assets/people-group-solid.svg';
import MasterClassIcon from '@/assets/person-chalkboard.svg';
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
  source: {
    required: true,
    type: String,
  },
  price: {
    required: true,
    type: String,
  },
  eventDate: {
    required: true,
    type: String,
  },
  isAddressAccurate: {
    required: true,
    type: Boolean,
  },
  withoutExactTime: {
    required: true,
    type: Boolean,
  },
  image: Object,
  place: Object,
  coordinates: Object,
  description: String,
  isBriefVersion: Boolean,
  cardShadow: String,
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
    store.setChosenEvent(omit(props, ['isBriefVersion', 'cardShadow']));
  }
};

const filterToIconSrcMap = {
  lectures: BookIcon,
  shows: WandMagicIcon,
  parties: ChampagneGlassesIcon,
  trips: BusIcon,
  exhibitions: PaletteIcon,
  market: StoreIcon,
  meets: PeopleGroupIcon,
  masterClass: MasterClassIcon,
};

const formattedDate = computed(() =>
  format(new Date(props.eventDate), 'do MMMM')
);
const formattedTime = computed(() =>
  format(new Date(props.eventDate), "HH':'mm")
);
</script>

<template>
  <el-card
    @click="onCardClick"
    :shadow="cardShadow ?? 'always'"
    :body-style="isBriefVersion ? { cursor: 'pointer' } : { padding: 0 }"
    :class="!isBriefVersion ? 'card' : ''"
  >
    <img
      class="event_image"
      v-if="image"
      :src="image.downloadUrl"
      alt="Event image"
    />
    <a
      v-if="!isBriefVersion"
      class="al-it-cen jus-con-end source_label"
      :href="source"
      target="_blank"
    >
      <span class="subtitle">Источник</span>
      <el-icon class="info-color el-icon--right"><LinkIcon /></el-icon>
    </a>
    <div class="title_block">
      <span class="megatitle">{{ name }}</span>
    </div>
    <div class="al-it-cen subtitle_block">
      <div class="flx-dir-col al-it-start">
        <div
          class="flx"
          v-for="category in categories.items"
          :key="category.id"
        >
          <el-icon class="el-icon--left">
            <img
              :src="filterToIconSrcMap[category.value]"
              class="category_icon"
            />
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
    <span
      v-if="!isAddressAccurate"
      class="inaccurate-event-info italic primary-color m-text m-subtitle"
      style="min-width: fit-content"
    >
      Неточный адрес.
    </span>
    <span
      v-if="withoutExactTime"
      class="inaccurate-event-info italic primary-color m-text m-subtitle"
      style="min-width: fit-content"
    >
      Неточное время.
    </span>
    <div class="body_block" v-if="description || !isBriefVersion">
      <span
        :class="isBriefVersion ? 'truncate-4-lines description' : 'description'"
        ref="descriptionRef"
        >{{ description }}</span
      >
      {{ !description && !isBriefVersion ? 'Без описания.' : '' }}
    </div>
  </el-card>
</template>

<style scoped lang="scss">
.source_label {
  position: relative;
  margin: 10px 0;
}
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
.card {
  border: 0;
}

.body_block {
  margin-top: 10px;
}
.description {
  white-space: pre-wrap;
}
.category_icon {
  width: 16px;
  height: 16px;
}
.event_image {
  width: 100%;
  object-fit: contain;
  border-radius: 4px;
}
.truncate-4-lines {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  /* truncate to 4 lines */
  -webkit-line-clamp: 4;
}
</style>
