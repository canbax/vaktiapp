<script setup lang="ts">
import { useClipboard } from "@vueuse/core";
import { getCurrentInstance, nextTick, ref } from "vue";
import ZoomSlider from "@/components/ZoomSlider.vue";
import { VTextarea } from "vuetify/components/VTextarea";
import { ALL_LANGUAGES } from "@/util/i18n";
import { UserInterfaceLanguage } from "@/types";
import { useSettings } from "@/composables/settings";
import { useUIState } from "@/composables/userInterfaceState";

interface Props {
  sourceCode: string;
}

const props = defineProps<Props>();

const { currentLanguage, currentUITheme } = useSettings();
const { currentZoom } = useUIState();

const instance = getCurrentInstance();
const $t = instance?.appContext.config.globalProperties.$t;

const { copy, copied } = useClipboard({ source: props.sourceCode });
const show = ref(false);

const languageParam = ref<UserInterfaceLanguage | null>(currentLanguage.value);
const UIThemeParam = ref<"light" | "dark">(currentUITheme.value);
const zoomParam = ref<number>(currentZoom.value);
const textareaRef = ref<VTextarea | null>(null);

const themes: { title: string; value: string }[] = [
  { title: $t("light"), value: "light" },
  { title: $t("dark"), value: "dark" },
];

const selectIframeCode = () => {
  if (textareaRef.value) {
    // Wait a tick to ensure the textarea is fully rendered
    nextTick(() => {
      const textarea = textareaRef.value?.$el?.querySelector("textarea");
      if (textarea) {
        textareaRef.value?.$el?.querySelector("textarea")?.select();
      }
    });
  }
};
</script>

<template>
  <v-card>
    <v-card-text>
      <v-textarea
        ref="textareaRef"
        :value="sourceCode"
        readonly
        auto-grow
        variant="outlined"
        hide-details
        class="monospace-font"
        @click:control="selectIframeCode"
      ></v-textarea>
    </v-card-text>

    <v-card-actions>
      <v-btn icon @click="copy(sourceCode)" class="ml-2">
        <v-icon :color="copied ? 'green' : 'default'">
          {{ copied ? "mdi-check-circle" : "mdi-content-copy" }}
        </v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        :append-icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        :text="$t('parameters')"
        variant="outlined"
        @click="show = !show"
      ></v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          <v-autocomplete
            v-model="languageParam"
            autocomplete="new-password"
            :items="ALL_LANGUAGES"
            item-title="text"
            :label="$t('selectLanguage')"
            :placeholder="$t('selectLanguage')"
            return-object
          />
          <v-select
            v-model="UIThemeParam"
            :items="themes"
            :label="$t('selectTheme')"
            :placeholder="$t('selectTheme')"
          />

          <ZoomSlider :current-zoom="zoomParam" @zoom="zoomParam = $event" />
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<style scoped>
.monospace-font {
  font-family: "Courier New", Courier, monospace;
}
</style>
