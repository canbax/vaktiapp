<script setup lang="ts">
import { getCurrentInstance } from 'vue';
import { useSettings } from '@/composables/settings';
import type { UserInterfaceLanguage } from '@/types';
import { getTranslateFn } from '@/util/i18n';

const $t = getTranslateFn(getCurrentInstance());

const { ALL_LANGUAGES } = useSettings();

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
