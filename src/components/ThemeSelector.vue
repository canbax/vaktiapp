<script setup lang="ts">
import type { AppTheme } from '@/types';
import { getCurrentInstance } from 'vue';
import { getTranslateFn } from '@/util/i18n';

const $t = getTranslateFn(getCurrentInstance());

const themes: { title: string; value: string }[] = [
  { title: $t('light'), value: 'light' },
  { title: $t('dark'), value: 'dark' },
];
const model = defineModel<AppTheme>();
const emit = defineEmits<{ (e: 'update', theme: AppTheme): void }>();
</script>

<template>
  <v-select
    v-model="model"
    data-testid="theme-select"
    :items="themes"
    :label="$t('selectTheme')"
    :placeholder="$t('selectTheme')"
    @update:model-value="emit('update', $event)"
  />
</template>
