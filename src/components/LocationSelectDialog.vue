<script setup lang="ts">
import type { GenericPlace, PlaceMatchWithCountry } from '@/types';
import { computed, getCurrentInstance, ref } from 'vue';
import LocationSelector from '@/components/LocationSelector.vue';
import { useSettings } from '@/composables/settings';
import { getTranslateFn } from '@/util/i18n';

const { currentPlace } = useSettings();

const $t = getTranslateFn(getCurrentInstance());

const currPlaceName = computed<string>(() => {
  if (!currentPlace?.value) return '';
  return isPlaceMatch(currentPlace.value)
    ? currentPlace.value.matchingString
    : currentPlace.value.name;
});

const userIntentForDialog = ref<boolean | null>(null);

const isOpen = computed<boolean>(() => {
  if (userIntentForDialog.value !== null) return userIntentForDialog.value;
  return Boolean(!currPlaceName.value);
});

function isPlaceMatch(place: GenericPlace): place is PlaceMatchWithCountry {
  return 'matchingString' in place;
}

const hasCurrentPlace = computed<boolean>(() => Boolean(currentPlace.value));

const title = computed<string>(() =>
  hasCurrentPlace.value ? $t('changeLocation') : $t('addNewLocation'),
);
</script>

<template>
  <v-dialog
    :model-value="isOpen"
    fullscreen
    transition="dialog-bottom-transition"
    @update:modelValue="userIntentForDialog = $event"
  >
    <template #activator>
      <v-btn
        :text="currPlaceName"
        class="text-capitalize"
        variant="outlined"
        @click="userIntentForDialog = true"
      ></v-btn>
    </template>

    <template #default>
      <v-card>
        <div>
          <v-alert :title="title">
            <template v-if="hasCurrentPlace" #close>
              <v-icon
                data-testid="close-btn"
                @click="userIntentForDialog = false"
                icon="mdi-close"
                size="large"
              ></v-icon>
            </template>
          </v-alert>
        </div>
        <div>
          <LocationSelector v-model="currentPlace" />
        </div>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped></style>
