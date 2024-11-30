<script setup lang="ts">
import { getCurrentInstance } from "vue";
import { ALL_LANGUAGES } from "@/util/i18n";
import { UserInterfaceLanguage } from "@/types";

const instance = getCurrentInstance();
const $t = instance?.appContext.config.globalProperties.$t;

const model = defineModel<UserInterfaceLanguage | null>();
</script>

<template>
  <v-autocomplete
    v-model="model"
    autocomplete="new-password"
    :items="ALL_LANGUAGES"
    item-title="text"
    :label="$t('selectLanguage')"
    :placeholder="$t('selectLanguage')"
    return-object
  />
</template>
