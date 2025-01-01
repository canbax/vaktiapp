<script setup lang="ts">
import { ApiClient } from "@/ApiClient";
import { useDebounceFn } from "@vueuse/core";
import { GenericPlace, PlaceMatchWithCountry } from "@/types";
import { computed, ref, watch } from "vue";
import { useSafeCall } from "@/composables/safeCall";
import { useCoordinates } from "@/composables/coordinates";
import { isDefined } from "@vueuse/core";
import { useSettings } from "@/composables/settings";

const { error: isGPSError, getGPS, lastGPS } = useCoordinates();
const { currentLanguage, selectedPlaces, currentCountry } = useSettings();

const model = defineModel<GenericPlace>();

const api = new ApiClient();
const placeSuggestions = ref<Map<number, GenericPlace>>(selectedPlaces.value);

const autoCompleteRef = ref(null);
const search = ref("");

function onPlaceSelected(v: GenericPlace) {
  model.value = v ?? null;
  autoCompleteRef.value?.blur?.();

  if (v && selectedPlaces.value.size < 5) {
    selectedPlaces.value.set(v.id, v);
  }
}

function preparePlaceSuggestions(places: GenericPlace[]) {
  const arr = new Map<number, GenericPlace>();
  for (const p of places) {
    arr.set(p.id, p);
  }
  selectedPlaces.value.forEach((x) => arr.set(x.id, x));
  placeSuggestions.value = arr;
}

async function nearByPlaces() {
  await getGPS();

  const results = await api.nearByPlaces(
    lastGPS.value.latitude,
    lastGPS.value.longitude,
    currentLanguage.value?.languageCode
  );
  preparePlaceSuggestions(results);
}

const searchDebounced = useDebounceFn(async (v: string) => {
  search.value = v;
  if (v?.length < 2) return;
  const results = await api.searchPlaces(
    v,
    lastGPS.value.latitude,
    lastGPS.value.longitude,
    currentLanguage?.value?.languageCode,
    currentCountry.value
  );
  preparePlaceSuggestions(results);
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
  return Boolean(place?.["matchingString"]);
}

function country2flag(countryCode: string) {
  return countryCode.replace(/./g, (letter) =>
    String.fromCodePoint((letter.charCodeAt(0) % 32) + 0x1f1e5)
  );
}

const loading = computed<boolean>(
  () => isLoadingNearByPlaceQuery.value || isLoadingQuery.value
);

const error = computed<string | null>(() => {
  if (isDefined(isQueryError.value)) return isQueryError.value;
  if (isDefined(isGPSError.value)) return isGPSError.value.message;
  if (isDefined(isNearByPlaceQueryError.value))
    return isNearByPlaceQueryError.value;
  return null;
});

const snackbar = ref(false);

watch(error, () => {
  snackbar.value = Boolean(error.value);
});

const items = computed<GenericPlace[]>(() =>
  Array.from(placeSuggestions.value.values())
);
</script>

<template>
  <v-snackbar v-model="snackbar" vertical timeout="3000">
    <div class="text-subtitle-1 pb-2">{{ $t("InternetErr") }}</div>
    <p>{{ error }}</p>
  </v-snackbar>

  <v-autocomplete
    class="ma-5"
    ref="autoCompleteRef"
    :model-value="model"
    :loading="loading"
    data-testid="search-place"
    :placeholder="$t('searchPlace')"
    hide-no-data
    :multiple="false"
    :items="items"
    item-title="name"
    item-value="id"
    no-filter
    :error-messages="error"
    @update:modelValue="onPlaceSelected"
    @update:search="safeSearch"
    return-object
  >
    <template #item="{ item, props }">
      <v-list-item v-bind="props">
        <template #title>
          <span v-if="isPlaceMatch(item.raw)">
            {{ item.raw.matchingString }}, {{ item.raw.stateName }}
          </span>
          <span v-else> {{ item.raw.name }}, {{ item.raw.stateName }} </span>
        </template>
        <template #subtitle>
          <div>
            {{ item.raw.country + " " + country2flag(item.raw.countryCode) }}
          </div>
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
