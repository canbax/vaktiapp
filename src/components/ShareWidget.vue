<script setup lang="ts">
import { ref } from 'vue';
import IframeEditor from './IframeEditor.vue';

const isOpen = ref(false);
</script>

<template>
  <v-dialog :model-value="isOpen" fullscreen transition="dialog-bottom-transition">
    <template #activator>
      <v-list-item
        data-testid="embed-btn"
        :title="$t('embedToYourWebsite')"
        prepend-icon="mdi-code-tags"
        @click="isOpen = true"
      />
    </template>

    <template #default>
      <v-card class="mx-auto" max-width="644">
        <div>
          <v-alert :title="$t('embedToYourWebsite')">
            <template #close>
              <v-icon
                data-testid="close-btn"
                @click="isOpen = false"
                icon="mdi-close"
                size="large"
              />
            </template>
          </v-alert>
        </div>
        <div>
          <IframeEditor />
        </div>
      </v-card>
    </template>
  </v-dialog>
</template>
