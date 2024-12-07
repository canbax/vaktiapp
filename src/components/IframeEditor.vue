<script setup lang="ts">
import { useBrowserLocation, useClipboard } from "@vueuse/core";
import { computed, getCurrentInstance, nextTick, ref } from "vue";
import DateFormatSelector from "@/components/DateFormatSelector.vue";
import TimeFormatSelector from "@/components/TimeFormatSelector.vue";
import CalculatorMethodSelector from "@/components/CalculatorMethodSelector.vue";
import CalculatorMadhabSelector from "@/components/CalculatorMadhabSelector.vue";
import ThemeSelector from "@/components/ThemeSelector.vue";
import { VTextarea } from "vuetify/components/VTextarea";
import { useSettings } from "@/composables/settings";
import { useUIState } from "@/composables/userInterfaceState";
import { encodeParamsForIframe } from "@/composables/urlParams";
const browserLocation = useBrowserLocation();

const {
  currentPlace,
  currentLanguage,
  currentUITheme,
  currentTimeFormat,
  currYearFormat,
  currMonthFormat,
  currWeekdayFormat,
  calculatorMethod,
  calculatorMadhab,
} = useSettings();
const { currentZoom, isShowHijriDate } = useUIState();

const language = ref(currentLanguage.value);
const theme = ref(currentUITheme.value);
const zoom = ref(currentZoom.value);
const isShowHijri = ref(isShowHijriDate.value);
const year = ref(currYearFormat.value);
const month = ref(currMonthFormat.value);
const weekDay = ref(currWeekdayFormat.value);
const time = ref(currentTimeFormat.value);
const currPlaceParam = ref(currentPlace.value);
const method = ref(calculatorMethod.value);
const madhab = ref(calculatorMadhab.value);

const instance = getCurrentInstance();
const $t = instance?.appContext.config.globalProperties.$t;

const baseUrl = computed<string>(
  () => browserLocation.value.origin + "/widget"
);

const iframeSrc = computed<string>(() => {
  const params = encodeParamsForIframe({
    currPlaceParam,
    isShowHijri,
    language,
    madhab,
    method,
    month,
    theme,
    time,
    weekDay,
    year,
    zoom,
  });
  return `${baseUrl.value}?${params.toString()}`;
});

const iframeWid = 400;
const iframeHei = 400;

const iframeCode = computed(() => {
  return `<iframe src="${iframeSrc.value}" width="${iframeWid}" height="${iframeHei}" style="border:none;"></iframe>`;
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
    <div>
      <iframe
        :src="iframeSrc"
        :width="iframeWid"
        :height="iframeHei"
        class="elevation-5"
        style="border: none"
      />
    </div>
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
                <ThemeSelector v-model="theme" class="ma-1" />
                <v-checkbox
                  v-model="isShowHijri"
                  class="ma-1"
                  :label="$t('isShowHijriDate')"
                />
                <DateFormatSelector
                  class="ma-1 w-100"
                  v-model:year="year"
                  v-model:month="month"
                  v-model:weekDay="weekDay"
                />
                <TimeFormatSelector class="ma-1 w-100" v-model="time" />
                <CalculatorMethodSelector class="ma-1" v-model="method" />
                <CalculatorMadhabSelector class="ma-1" v-model="madhab" />
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
