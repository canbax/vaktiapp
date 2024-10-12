import { computed, ref, watch } from "vue";
import { useGeolocation } from "@vueuse/core";
import { isValidGPS } from "@/util/gps";

export function useCoordinates() {
  const lastGPS = ref<{ latitude: null | number; longitude: null | number }>({
    latitude: null,
    longitude: null,
  });

  const { coords, resume, pause, isSupported, error } = useGeolocation({
    immediate: false,
  });

  const latitude = computed<number>(() => coords.value.latitude);
  const longitude = computed<number>(() => coords.value.longitude);

  async function getGPS() {
    resume();

    return new Promise((resolve, reject) => {
      if (!isSupported.value) {
        reject("not supported");
        return;
      }
      if (error.value) {
        reject(error.value);
        return;
      }
      watch(
        [latitude, longitude],
        () => {
          if (isValidGPS(latitude.value, longitude.value)) {
            lastGPS.value = {
              latitude: coords.value.latitude,
              longitude: coords.value.longitude,
            };
            pause();
            resolve(true);
          }
        },
        { immediate: true }
      );
    });
  }

  return { error, getGPS, lastGPS };
}
