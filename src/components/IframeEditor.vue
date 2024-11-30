<script setup lang="ts">
import { useBrowserLocation, useClipboard } from "@vueuse/core";
import { computed, getCurrentInstance, nextTick, ref } from "vue";
import ZoomSlider from "@/components/ZoomSlider.vue";
import LanguageSelector from "@/components/LanguageSelector.vue";
import LocationSelector from "@/components/LocationSelector.vue";
import DateFormatSelector from "@/components/DateFormatSelector.vue";
import TimeFormatSelector from "@/components/TimeFormatSelector.vue";
import ThemeSelector from "@/components/ThemeSelector.vue";
import { VTextarea } from "vuetify/components/VTextarea";
import { useSettings } from "@/composables/settings";
import { useUIState } from "@/composables/userInterfaceState";

const browserLocation = useBrowserLocation();

const {
  currentPlace,
  currentLanguage,
  currentUITheme,
  currentTimeFormat,
  currYearFormat,
  currMonthFormat,
  currWeekdayFormat,
} = useSettings();
const { currentZoom, isShowHijriDate } = useUIState();

const languageParam = ref(currentLanguage.value);
const UIThemeParam = ref(currentUITheme.value);
const zoomParam = ref(currentZoom.value);
const isShowHijriDateParam = ref(isShowHijriDate.value);
const yearFormatParam = ref(currYearFormat.value);
const monthFormatParam = ref(currMonthFormat.value);
const weekDayFormatParam = ref(currWeekdayFormat.value);
const timeFormatParam = ref(currentTimeFormat.value);
const currPlaceParam = ref(currentPlace.value);

const instance = getCurrentInstance();
const $t = instance?.appContext.config.globalProperties.$t;

const baseUrl = computed<string>(
  () => browserLocation.value.origin + "/widget"
);

const iframeSrc = computed<string>(() => {
  const params = new URLSearchParams({
    city: currPlaceParam.value.id + "",
    theme: UIThemeParam.value,
  });
  return `${baseUrl.value}?${params.toString()}`;
});

const iframeCode = computed(() => {
  return `<iframe src="${iframeSrc.value}" width="400" height="600" style="border:none;"></iframe>`;
});

const { copy, copied } = useClipboard({ source: iframeCode.value });
const show = ref(false);

const textareaRef = ref<VTextarea | null>(null);

function selectIframeCode() {
  if (textareaRef.value) {
    // Wait a tick to ensure the textarea is fully rendered
    nextTick(() => {
      const textarea = textareaRef.value?.$el?.querySelector("textarea");
      if (textarea) {
        textareaRef.value?.$el?.querySelector("textarea")?.select();
      }
    });
  }
}

function copyIframeCode() {
  copy(iframeCode.value);
}
</script>

<template>
  <v-row class="ma-2">
    <v-col>
      <div class="border-md">
        <iframe
          :src="iframeSrc"
          width="400"
          height="600"
          style="border: none"
        />
      </div>
    </v-col>
    <v-col>
      <v-card>
        <v-card-text>
          <v-textarea
            ref="textareaRef"
            :value="iframeCode"
            readonly
            auto-grow
            variant="outlined"
            hide-details
            class="monospace-font"
            @click:control="selectIframeCode"
          >
            <template #append-inner>
              <v-btn icon @click="copyIframeCode" class="ml-2">
                <v-icon :color="copied ? 'green' : 'default'">
                  {{ copied ? "mdi-check-circle" : "mdi-content-copy" }}
                </v-icon>
              </v-btn>
            </template>
          </v-textarea>
        </v-card-text>

        <v-card-actions>
          <v-btn
            :append-icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
            :text="$t('parameters')"
            variant="tonal"
            @click="show = !show"
          />
        </v-card-actions>
        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>

            <v-card-text>
              <div class="d-flex flex-wrap">
                <LocationSelector v-model="currPlaceParam" class="ma-1 w-100" />
                <LanguageSelector v-model="languageParam" class="ma-1" />
                <ThemeSelector v-model="UIThemeParam" class="ma-1" />
                <ZoomSlider
                  class="ma-1 w-100"
                  :label="$t('changeZoom')"
                  :current-zoom="zoomParam"
                  @zoom="zoomParam = $event"
                />

                <v-checkbox
                  v-model="isShowHijriDateParam"
                  class="ma-1"
                  :label="$t('isShowHijriDate')"
                />

                <DateFormatSelector
                  class="ma-1 w-100"
                  v-model:year="yearFormatParam"
                  v-model:month="monthFormatParam"
                  v-model:weekDay="weekDayFormatParam"
                />
                <TimeFormatSelector
                  class="ma-1 w-100"
                  v-model="timeFormatParam"
                />
              </div>
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
.monospace-font {
  font-family: "Courier New", Courier, monospace;
}
</style>
