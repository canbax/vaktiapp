<script setup lang="ts">
import { getCurrentInstance } from 'vue';
import { getTranslateFn } from '@/util/i18n';
import { useScrollTop } from '@/composables/scrollTop';

useScrollTop();

const $t = getTranslateFn(getCurrentInstance());
</script>

<template>
  <div class="ma-8" v-html="$t('privacyPolicyHTML')"></div>
</template>
