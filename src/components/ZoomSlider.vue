<script setup lang="ts">
import { computed, ref } from "vue";
import { useDebounceFn } from "@vueuse/core";
import { useSettings } from "@/composables/settings";

interface Props {
  currentZoom: number;
}

const emit = defineEmits<{ (e: "zoom", value: number): void }>();

const props = defineProps<Props>();

const MAX_ZOOM = 2;
const MIN_ZOOM = 0.5;
const ZOOM_STEP = 0.1;

const { currentLanguage } = useSettings();

const instantZoom = ref(props.currentZoom);

function limitInstantZoomInRange() {
  if (instantZoom.value > MAX_ZOOM) instantZoom.value = MAX_ZOOM;
  if (instantZoom.value < MIN_ZOOM) instantZoom.value = MIN_ZOOM;
}

const debouncedSetZoom = useDebounceFn(() => {
  limitInstantZoomInRange();
  emit("zoom", instantZoom.value);
}, 500);

const zoomPercentage = computed<string>(() => {
  const normalizedZoom = Math.round(props.currentZoom * 100) + "";
  if (currentLanguage.value && currentLanguage.value?.languageCode == "tr")
    return "(%" + normalizedZoom + ")";
  return "(" + normalizedZoom + "%)";
});

function zoomIn() {
  instantZoom.value = instantZoom.value + ZOOM_STEP;
  debouncedSetZoom();
}

function zoomOut() {
  instantZoom.value = instantZoom.value - ZOOM_STEP;
  debouncedSetZoom();
}
</script>

<template>
  <v-slider
    v-model="instantZoom"
    :hint="zoomPercentage"
    :persistent-hint="true"
    :max="MAX_ZOOM"
    :min="MIN_ZOOM"
    :step="ZOOM_STEP"
    show-ticks="always"
    class="align-center"
    thumb-label="always"
    @end="debouncedSetZoom"
  >
    <template #prepend>
      <v-btn @click="zoomOut()" size="small" icon="mdi-magnify-minus" />
    </template>
    <template #append>
      <v-btn @click="zoomIn()" size="small" icon="mdi-magnify-plus" />
    </template>
  </v-slider>
</template>
