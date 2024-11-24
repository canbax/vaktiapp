<script setup lang="ts">
import { ref, computed } from "vue";
import BasicCodeEditor from "./BasicCodeEditor.vue";
import { useBrowserLocation } from "@vueuse/core";

interface WidgetConfig {
  city: string;
  theme: "light" | "dark";
  width: number;
  height: number;
}

const config = ref<WidgetConfig>({
  city: "Istanbul",
  theme: "light",
  width: 300,
  height: 400,
});

const browserLocation = useBrowserLocation();

const isOpen = ref(false);

const baseUrl = computed<string>(
  () => browserLocation.value.origin + "/widget"
);

const iframeSrc = computed<string>(() => {
  const params = new URLSearchParams({
    city: config.value.city,
    theme: config.value.theme,
    width: config.value.width.toString(),
    height: config.value.height.toString(),
  });
  return `${baseUrl.value}?${params.toString()}`;
});

const iframeCode = computed(() => {
  return `<iframe src="${iframeSrc.value}" width="${config.value.width}" height="${config.value.height}" style="border:none;"></iframe>`;
});
</script>

<template>
  <v-dialog
    :model-value="isOpen"
    fullscreen
    transition="dialog-bottom-transition"
  >
    <template #activator>
      <v-list-item
        :title="$t('embedToYourWebsite')"
        prepend-icon="mdi-code-tags"
        @click="isOpen = true"
      />
    </template>

    <template #default>
      <v-card class="mx-auto" max-width="644">
        <div>
          <v-alert
            :title="$t('embedToYourWebsite')"
            closable
            @click:close="isOpen = false"
          ></v-alert>
        </div>
        <div>
          <iframe
            :src="iframeSrc"
            :width="config.width"
            :height="config.height"
            style="border: none"
          ></iframe>
        </div>
        <div>
          <BasicCodeEditor v-model="iframeCode" />
        </div>
        <div>
          <h1>widget parameters</h1>
        </div>
      </v-card>
    </template>
  </v-dialog>
</template>
