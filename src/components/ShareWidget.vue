<script setup lang="ts">
import { ref, computed } from "vue";
import { useClipboard, useBrowserLocation } from "@vueuse/core";

interface WidgetConfig {
  city: string;
  theme: "light" | "dark";
  width: number;
  height: number;
}

const config = ref<WidgetConfig>({
  city: "Istanbul",
  theme: "light",
  width: 300,
  height: 400,
});

const browserLocation = useBrowserLocation();

const isOpen = ref(false);

const baseUrl = computed<string>(
  () => browserLocation.value.origin + "/widget"
);

const iframeSrc = computed<string>(() => {
  const params = new URLSearchParams({
    city: config.value.city,
    theme: config.value.theme,
    width: config.value.width.toString(),
    height: config.value.height.toString(),
  });
  return `${baseUrl.value}?${params.toString()}`;
});

const iframeCode = computed(() => {
  return `<iframe src="${iframeSrc.value}" width="${config.value.width}" height="${config.value.height}" style="border:none;"></iframe>`;
});

const { copy: copyToClipboard, isSupported } = useClipboard();
const handleCopy = async () => {
  if (!isSupported) {
    alert("Tarayıcınız kopyalama işlemini desteklemiyor.");
    return;
  }

  try {
    await copyToClipboard(iframeCode.value);
    alert("Widget kodu panoya kopyalandı!");
  } catch (err) {
    alert("Kopyalama başarısız oldu!");
    console.error(err);
  }
};
</script>

<template>
  <v-dialog
    :model-value="isOpen"
    fullscreen
    transition="dialog-bottom-transition"
  >
    <template #activator>
      <v-list-item
        :title="$t('embedToYourWebsite')"
        prepend-icon="mdi-code-tags"
        @click="isOpen = true"
      />
    </template>

    <template #default>
      <v-card>
        <div>
          <v-alert
            :title="$t('embedToYourWebsite')"
            closable
            @click:close="isOpen = false"
          ></v-alert>
        </div>
        <div>
          <v-form>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Şehir"
                  v-model="config.city"
                  placeholder="Şehir adı"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  label="Tema"
                  v-model="config.theme"
                  :items="['light', 'dark']"
                  outlined
                ></v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Genişlik (px)"
                  type="number"
                  v-model="config.width"
                  outlined
                  min="100"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Yükseklik (px)"
                  type="number"
                  v-model="config.height"
                  outlined
                  min="100"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
          <v-divider class="my-4"></v-divider>
          <div>
            <h3>Oluşturulan Kod:</h3>
            <code>
              {{ iframeCode }}
            </code>
            <v-btn color="primary" class="mt-3" @click="handleCopy">
              Kodu Kopyala
            </v-btn>
          </div>
          <v-divider class="my-4"></v-divider>
          <h3>Önizleme:</h3>
          <iframe
            :src="iframeSrc"
            :width="config.width"
            :height="config.height"
            style="border: none"
          ></iframe>
        </div>
      </v-card>
    </template>
  </v-dialog>
</template>
