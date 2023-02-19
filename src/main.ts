import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import { i18n } from "@/plugins/i18n";
import "./assets/main.css";

// Vuetify
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";

async function loadFonts() {
  const webFontLoader = await import("webfontloader");

  webFontLoader.load({
    google: {
      families: ["Roboto:100,300,400,500,700,900&display=swap"],
    },
  });
}

const app = createApp(App);

// register plugins
loadFonts();
app.use(i18n);
app.use(createVuetify());
app.use(createPinia());

app.mount("#app");
