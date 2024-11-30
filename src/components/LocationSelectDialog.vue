<script setup lang="ts">
import { GenericPlace, PlaceMatchWithCountry } from "@/types";
import { computed, getCurrentInstance, ref } from "vue";
import LocationSelector from "@/components/LocationSelector.vue";
import { useSettings } from "@/composables/settings";

const { currentPlace } = useSettings();

const instance = getCurrentInstance();
const $t = instance.appContext.config.globalProperties.$t;

const currPlaceName = computed<string>(() => {
  if (!currentPlace?.value) return "";
  return isPlaceMatch(currentPlace.value)
    ? currentPlace.value.matchingString
    : currentPlace.value.name;
});

const isOpen = ref(!currPlaceName.value ? true : false);

function isPlaceMatch(place: GenericPlace): place is PlaceMatchWithCountry {
  return Boolean(place?.["matchingString"]);
}

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
          <LocationSelector v-model="currentPlace" />
        </div>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped></style>
