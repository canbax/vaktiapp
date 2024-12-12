<script setup lang="ts">
import { computed, getCurrentInstance, ref } from "vue";
import ShareWidget from "@/components/ShareWidget.vue";
import { useShare, useClipboard, useBrowserLocation } from "@vueuse/core";
import { useUrlParams } from "@/composables/urlParams";

const { encodeSettingsToUrlParams } = useUrlParams();
const source = ref("");
const {
  copy,
  copied,
  isSupported: isClipboardSupported,
} = useClipboard({ source, legacy: true });

const browserLocation = useBrowserLocation();
const { share, isSupported: isShareSupported } = useShare();

const instance = getCurrentInstance();
const $t = instance?.appContext.config.globalProperties.$t;

const shareUrl = computed<string>(() => {
  return browserLocation.value.origin + "/share?" + encodeSettingsToUrlParams();
});

async function startShare() {
  try {
    await share({
      title: $t("times"),
      url: shareUrl.value,
    });
  } catch (e) {
    console.log("error on share: ", e);
  }
}

async function copyLinkClicked() {
  await copy(shareUrl.value);
}
</script>

<template>
  <v-bottom-sheet>
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
        icon="mdi-share"
        color="primary"
        v-tooltip:bottom="$t('shareTimes')"
      />
    </template>

    <v-sheet>
      <v-list>
        <v-list-subheader>{{ $t("shareTimes") }}</v-list-subheader>

        <v-list-item
          v-if="isClipboardSupported"
          :title="$t('copyLink')"
          :prepend-icon="copied ? 'mdi-check-circle' : 'mdi-link'"
          @click="copyLinkClicked"
        />

        <v-list-item
          v-if="isShareSupported"
          :title="$t('share')"
          prepend-icon="mdi-share"
          @click="startShare"
        />
      </v-list>

      <ShareWidget />
    </v-sheet>
  </v-bottom-sheet>
</template>
