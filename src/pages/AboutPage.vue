<script setup lang="ts">
import { useClipboard } from '@vueuse/core';
import { getCurrentInstance, ref, computed } from 'vue';
import { getTranslateFn } from '@/util/i18n';
import { useScrollTop } from '@/composables/scrollTop';

const { copy } = useClipboard({ legacy: true });
useScrollTop();

const snackbar = ref(false);
const copiedText = ref('');

const $t = getTranslateFn(getCurrentInstance());

function copyText(text: string) {
  copy(text);
  copiedText.value = `"${text}"${$t('isCopied')}`;
  snackbar.value = true;
}

function openPatreon() {
  window.open('https://www.patreon.com/canbaz', '_blank');
}

const buildVersion = computed(() => process.env.BUILD_VERSION || '');
</script>

<template>
  <v-container fluid class="text-center">
    <div class="text-h6 text-center">{{ $t('aboutTxt') }}</div>
    <v-alert class="ma-4" :text="$t('donatePageText')" border border-color="primary" />
    <div class="text-center pa-2">
      <a href="https://apps.apple.com/tr/app/vakti-app/id6743095525" target="_blank" class="pa-1">
        <img
          src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
          height="50"
        />
      </a>
      <a
        href="https://play.google.com/store/apps/details?id=com.vakti.app"
        target="_blank"
        class="pa-1"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
          height="50"
        />
      </a>
    </div>
    <div class="text-center pa-2">
      <v-btn
        variant="outlined"
        class="text-capitalize ma-2"
        @click="openPatreon"
        prepend-icon="mdi-patreon"
      >
        Patreon
      </v-btn>
    </div>

    <div class="text-center pa-2">
      <div class="font-weight-bold">{{ $t('transferToBankAccount') }}</div>
      <div>
        <span> Yusuf Sait Canbaz </span>
        <v-btn
          data-testid="copy-name-btn"
          class="mx-2"
          size="x-small"
          icon="mdi-content-copy"
          @click="copyText('Yusuf Sait Canbaz')"
        />
      </div>
      <div>
        <span> TR49 0020 6001 3401 9074 7100 01 </span>
        <v-btn
          data-testid="copy-iban-btn"
          class="mx-2"
          size="x-small"
          icon="mdi-content-copy"
          @click="copyText('TR49 0020 6001 3401 9074 7100 01')"
        >
        </v-btn>
      </div>
    </div>
    <div>
      <a class="text-caption" target="_blank" href="/privacy"> {{ $t('privacyPolicy') }} </a>
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
