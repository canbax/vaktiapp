<script setup lang="ts">
import { ref, watch } from "vue";
import { useClipboard } from "@vueuse/core";

interface Props {
  modelValue: string; // For v-model
}

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);

const { copy } = useClipboard(); // Clipboard utility from VueUse
const snackbarVisible = ref(false); // Snackbar visibility state
const snackbarMessage = ref("Code copied to clipboard!"); // Snackbar message

// Local state for the editor's value
const editorValue = ref(props.modelValue);

// Watch for changes in the prop and sync with local state
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== editorValue.value) {
      editorValue.value = newValue;
    }
  }
);

// Emit changes to the parent
watch(
  () => editorValue.value,
  (newValue) => {
    emit("update:modelValue", newValue);
  }
);

const onCopy = async () => {
  await copy(editorValue.value);
  snackbarVisible.value = true;
};
</script>

<template>
  <v-btn color="primary" @click="onCopy"> Copy </v-btn>
  <!-- Textarea for code editing -->
  <v-textarea
    v-model="editorValue"
    rows="3"
    density="comfortable"
    outlined
    auto-grow
    style="font-family: 'Courier New', monospace; font-size: 14px"
  ></v-textarea>

  <!-- Snackbar notification -->
  <v-snackbar v-model="snackbarVisible" timeout="3000" color="success">
    {{ snackbarMessage }}
  </v-snackbar>
</template>

<style scoped>
/* Optional styling to make it more IDE-like */
textarea {
  background-color: #282c34;
  color: #abb2bf;
  border-radius: 4px;
  border: 1px solid #3e4451;
  padding: 8px;
  width: 100%;
}
</style>
