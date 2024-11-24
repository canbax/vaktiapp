<script setup lang="ts">
import { ApiClient } from "@/ApiClient";
import { useDebounceFn } from "@vueuse/core";
import { GenericPlace, PlaceMatchWithCountry } from "@/types";
import { computed, getCurrentInstance, ref } from "vue";
import { useSafeCall } from "@/composables/safeCall";
import { useCoordinates } from "@/composables/coordinates";
import { isDefined } from "@vueuse/core";
import { useSettings } from "@/composables/settings";

const { error: isGPSError, getGPS, lastGPS } = useCoordinates();
const { currentPlace, currentLanguage, selectedPlaces } = useSettings();

const instance = getCurrentInstance();
const $t = instance.appContext.config.globalProperties.$t;

const api = new ApiClient();
const placeSuggestions = ref<Map<number, GenericPlace>>(selectedPlaces.value);

const autoCompleteRef = ref(null);
const search = ref("");

const currPlaceName = computed<string>(() => {
  if (!currentPlace?.value) return "";
  return isPlaceMatch(currentPlace.value)
    ? currentPlace.value.matchingString
    : currentPlace.value.name;
});

const isOpen = ref(!currPlaceName.value ? true : false);

function onPlaceSelected(v: GenericPlace) {
  isOpen.value = false;
  currentPlace.value = v;
  autoCompleteRef.value?.blur?.();

  if (selectedPlaces.value.size < 5) {
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
  console.log("place sugg: ", arr);
}

async function nearByPlaces() {
  await getGPS();

  if (!isOpen.value) return;
  const results = await api.nearByPlaces(
    lastGPS.value.latitude,
    lastGPS.value.longitude,
    currentLanguage.value?.languageCode
  );
  preparePlaceSuggestions(results);
}

const searchDebounced = useDebounceFn(async (v: string) => {
  search.value = v;
  if (v?.length < 2 || !isOpen.value) return;
  const results = await api.searchPlaces(
    v,
    lastGPS.value.latitude,
    lastGPS.value.longitude,
    currentLanguage?.value?.languageCode
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

const items = computed<GenericPlace[]>(() =>
  Array.from(placeSuggestions.value.values())
);

const hasCurrentPlace = computed<boolean>(() => Boolean(currentPlace.value));

const title = computed<string>(() =>
  hasCurrentPlace.value ? $t("changeLocation") : $t("addNewLocation")
);
</script>

<template>
  <v-dialog
    :model-value="isOpen"
    fullscreen
    transition="dialog-bottom-transition"
  >
    <template #activator>
      <v-btn
        :text="currPlaceName"
        class="text-capitalize"
        variant="outlined"
        @click="isOpen = true"
      ></v-btn>
    </template>

    <template #default>
      <v-card>
        <div>
          <v-alert
            :title="title"
            :closable="hasCurrentPlace"
            @click:close="isOpen = false"
          ></v-alert>
        </div>
        <div>
          <v-autocomplete
            class="ma-5"
            ref="autoCompleteRef"
            :model-value="currentPlace"
            :loading="loading"
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
              <v-list-item v-bind="props" :subtitle="item.raw.country">
                <template #title>
                  <span v-if="isPlaceMatch(item.raw)">
                    {{ item.raw.matchingString }}, {{ item.raw.stateName }}
                  </span>
                  <span v-else>
                    {{ item.raw.name }}, {{ item.raw.stateName }}
                  </span>
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
        </div>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped></style>
