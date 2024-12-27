<script setup lang="ts">
import { useClipboard } from "@vueuse/core";
import { getCurrentInstance, ref, computed } from "vue";
const { copy } = useClipboard({ legacy: true });
const snackbar = ref(false);
const copiedText = ref("");
const instance = getCurrentInstance();
const dummyTranslateFunction = (key: string) => key;
const $t =
  instance?.appContext.config.globalProperties.$t ?? dummyTranslateFunction;

function copyText(text: string) {
  copy(text);
  copiedText.value = `"${text}"${$t("isCopied")}`;
  snackbar.value = true;
}

const buildVersion = computed(() => process.env.BUILD_VERSION || "");
</script>

<template>
  <v-container fluid class="text-center">
    <div class="text-h6 text-center">{{ $t("aboutTxt") }}</div>
    <v-alert
      class="ma-4"
      :text="$t('donatePageText')"
      border
      border-color="primary"
    />
    <div class="text-center pa-2">
      <div class="font-weight-bold">{{ $t("transferToBankAccount") }}</div>
      <div>
        <span> Yusuf Sait Canbaz </span>
        <v-btn
          class="mx-2"
          size="x-small"
          icon="mdi-content-copy"
          @click="copyText('Yusuf Sait Canbaz')"
        />
      </div>
      <div>
        <span> TR53 0001 0090 1024 9249 7050 01 </span>
        <v-btn
          class="mx-2"
          size="x-small"
          icon="mdi-content-copy"
          @click="copyText('TR53 0001 0090 1024 9249 7050 01')"
        >
        </v-btn>
      </div>
    </div>
    <v-footer class="justify-center">
      <div class="text-caption text-capitalize">
        {{ buildVersion }}
      </div>
    </v-footer>
  </v-container>
  <v-snackbar v-model="snackbar">
    {{ copiedText }}

    <template v-slot:actions>
      <v-btn icon="mdi-close" @click="snackbar = false"> </v-btn>
    </template>
  </v-snackbar>
</template>

<style scoped></style>
