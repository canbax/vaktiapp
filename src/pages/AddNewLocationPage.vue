<script setup lang="ts">
import { ApiClient } from "@/ApiClient";
import { useDebounceFn } from "@vueuse/core";
import { GenericPlace, PlaceMatchWithCountry, PlaceWithCountry } from "@/types";
import { computed, ref, watch } from "vue";
import { useSafeCall } from "@/composables/safeCall";
import { useCoordinates } from "@/composables/coordinates";
import { isDefined } from "@vueuse/core";
import { useSettingsStore } from "@/stores/settings";

const { error: isGPSError, getGPS, lastGPS } = useCoordinates();
const { currentLanguage } = useSettingsStore();

const api = new ApiClient();
const placeSuggestions = ref<GenericPlace[]>([]);
const selectedPlace = ref<PlaceWithCountry | null>(null);
const autoCompleteRef = ref(null);

function onPlaceSelected(v: PlaceWithCountry) {
  selectedPlace.value = v;
  autoCompleteRef.value?.blur?.();
}

async function nearByPlaces() {
  await getGPS();

  placeSuggestions.value = await api.nearByPlaces(
    lastGPS.value.latitude,
    lastGPS.value.longitude,
    currentLanguage?.languageCode
  );
}

const searchDebounced = useDebounceFn(async (v: string) => {
  if (v?.length < 2) return;
  placeSuggestions.value = await api.searchPlaces(
    v,
    lastGPS.value.latitude,
    lastGPS.value.longitude,
    currentLanguage?.languageCode
  );
}, 300);

const {
  loading: isLoadingQuery,
  error: isQueryError,
  execute: safeSearch,
} = useSafeCall(searchDebounced);

const {
  loading: isLoadingNearByPlaceQuery,
  error: isNearByPlaceQueryError,
  execute: safeNearBySearch,
} = useSafeCall(nearByPlaces);

function isPlaceMatch(place: GenericPlace): place is PlaceMatchWithCountry {
  return Boolean(place["matchingString"]);
}

const loading = computed<boolean>(
  () => isLoadingNearByPlaceQuery.value || isLoadingQuery.value
);

watch(loading, () => console.log("loading: ", loading.value), {
  immediate: true,
});
watch(
  isLoadingNearByPlaceQuery,
  () => console.log("isLoadingGPS: ", isLoadingNearByPlaceQuery.value),
  {
    immediate: true,
  }
);
watch(
  isLoadingQuery,
  () => console.log("isLoadingQuery: ", isLoadingQuery.value),
  {
    immediate: true,
  }
);

const error = computed<string | null>(() => {
  if (isDefined(isQueryError.value)) return isQueryError.value;
  if (isDefined(isGPSError.value)) return isGPSError.value.message;
  if (isDefined(isNearByPlaceQueryError.value))
    return isNearByPlaceQueryError.value;
  return null;
});
</script>

<template>
  <v-autocomplete
    class="ma-5"
    ref="autoCompleteRef"
    :model-value="selectedPlace"
    :loading="loading"
    :multiple="false"
    :items="placeSuggestions"
    item-title="name"
    item-value="id"
    :error-messages="error"
    @update:modelValue="onPlaceSelected"
    @update:search="safeSearch"
    return-object
  >
    <template #prepend-inner>
      <v-icon v-if="!selectedPlace" icon="mdi-magnify"></v-icon>
    </template>
    <template #item="{ item, props }">
      <v-list-item
        v-bind="props"
        :key="item.raw.id"
        :subtitle="item.raw.country"
      >
        <template #title>
          <span v-if="isPlaceMatch(item.raw)">
            {{ item.raw.matchingString }}, {{ item.raw.stateName }}
          </span>
          <span v-else> {{ item.raw.name }}, {{ item.raw.stateName }} </span>
        </template>
      </v-list-item>
    </template>

    <template #append-inner>
      <v-btn
        @click="safeNearBySearch"
        size="x-small"
        icon="mdi-crosshairs-gps"
      ></v-btn>
    </template>
  </v-autocomplete>
</template>

<style scoped></style>
