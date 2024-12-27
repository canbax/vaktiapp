<script setup lang="ts">
import { useClipboard } from "@vueuse/core";
import { getCurrentInstance, ref } from "vue";
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

function openGitHubSponsors() {
  window.open("https://github.com/sponsors/canbax", "_blank");
}
</script>

<template>
  <v-container fluid>
    <div class="text-h6 text-center">{{ $t("aboutTxt") }}</div>
    <v-alert
      class="ma-4"
      :text="$t('donatePageText')"
      type="info"
      icon="false"
    />
    <div class="text-center">
      <div class="font-weight-bold">{{ $t("transferToBankAccount") }}</div>
      <div>
        <span> Yusuf Sait Canbaz </span>
        <v-btn
          size="x-small"
          icon="mdi-content-copy"
          @click="copyText('Yusuf Sait Canbaz')"
        />
      </div>
      <div>
        <span> TR53 0001 0090 1024 9249 7050 01 </span>
        <v-btn
          size="x-small"
          icon="mdi-content-copy"
          @click="copyText('TR53 0001 0090 1024 9249 7050 01')"
        >
        </v-btn>
      </div>
    </div>
  </v-container>
  <v-snackbar v-model="snackbar">
    {{ copiedText }}

    <template v-slot:actions>
      <v-btn icon="mdi-close" @click="snackbar = false"> </v-btn>
    </template>
  </v-snackbar>
  <v-footer>
    <v-btn
      class="text-capitalize"
      @click="openGitHubSponsors"
      prepend-icon="mdi-github"
    >
      GitHub
    </v-btn>
  </v-footer>
</template>

<style scoped></style>
