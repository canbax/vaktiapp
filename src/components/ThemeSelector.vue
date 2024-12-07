<script setup lang="ts">
import { AppTheme } from "@/types";
import { getCurrentInstance } from "vue";

const instance = getCurrentInstance();
const $t = instance?.appContext.config.globalProperties.$t;

const themes: { title: string; value: string }[] = [
  { title: $t("light"), value: "light" },
  { title: $t("dark"), value: "dark" },
];
const model = defineModel<AppTheme>();
const emit = defineEmits<{ (e: "update", theme: AppTheme): void }>();
</script>

<template>
  <v-select
    v-model="model"
    :items="themes"
    :label="$t('selectTheme')"
    :placeholder="$t('selectTheme')"
    @update:model-value="emit('update', $event)"
  />
</template>
