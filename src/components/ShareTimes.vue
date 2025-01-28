<script setup lang="ts">
import { computed, getCurrentInstance, ref, onMounted } from 'vue';
import ShareWidget from '@/components/ShareWidget.vue';
import { useClipboard } from '@vueuse/core';
import { Share } from '@capacitor/share';
import { useUrlParams, WEB_BASE_URL } from '@/composables/urlParams';
import { getTranslateFn } from '@/util/i18n';

const { encodeSettingsToUrlParams } = useUrlParams();
const source = ref('');
const { copy, copied, isSupported: isClipboardSupported } = useClipboard({ source, legacy: true });

const $t = getTranslateFn(getCurrentInstance());

const shareUrl = computed<string>(() => {
  return WEB_BASE_URL + '/share?' + encodeSettingsToUrlParams();
});

async function startShare() {
  try {
    await Share.share({
      title: $t('times'),
      url: shareUrl.value,
    });
  } catch (e) {
    console.log('error on share: ', e);
  }
}

async function copyLinkClicked() {
  await copy(shareUrl.value);
}
const canShare = ref(true);

onMounted(async () => {
  canShare.value = (await Share.canShare()).value;
});
</script>

<template>
  <v-bottom-sheet>
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
        icon="mdi-share"
        color="primary"
        data-testid="share-btn"
        v-tooltip:bottom="$t('shareTimes')"
      />
    </template>

    <v-sheet class="pb-10">
      <v-list>
        <v-list-subheader>{{ $t('shareTimes') }}</v-list-subheader>

        <v-list-item
          v-if="isClipboardSupported"
          data-testid="copy-link-btn"
          :title="$t('copyLink')"
          :prepend-icon="copied ? 'mdi-check-circle' : 'mdi-link'"
          @click="copyLinkClicked"
        />

        <v-list-item
          v-if="canShare"
          data-testid="share-in-app-btn"
          :title="$t('share')"
          prepend-icon="mdi-share"
          @click="startShare"
        />
      </v-list>

      <ShareWidget />
    </v-sheet>
  </v-bottom-sheet>
</template>
