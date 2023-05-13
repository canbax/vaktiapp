<script setup lang="ts">
defineProps<{
  currTimes: { name: string; value: string }[];
  isShowingToday: boolean;
}>();

const emit = defineEmits<{
  (e: "showToday"): void;
}>();

let currPrayIdx = 2;
let remainingTime = "";
</script>

<template>
  <table class="m5">
    <tbody>
      <tr v-for="(item, i) in currTimes" :key="i" class="m5">
        <td style="text-align: right; padding-right: 10px">
          <h2 v-bind:class="{ 'normal-font': i !== currPrayIdx }">
            {{ item.name }}
          </h2>
        </td>
        <td style="text-align: left">
          <h2 v-bind:class="{ 'normal-font': i !== currPrayIdx }">
            {{ item.value }}
            <v-icon v-if="i == currPrayIdx" style="vertical-align: initial">
              mdi-clock
            </v-icon>
          </h2>
        </td>
      </tr>
    </tbody>
  </table>
  <v-divider></v-divider>
  <div v-if="isShowingToday">
    <span class="normal-font">
      {{ currTimes[currPrayIdx].name }} &nbsp;
      {{ $t("remainingTime") }}
    </span>
    <h2>{{ remainingTime }}</h2>
  </div>
  <div v-else>
    <v-btn x-large @click="emit('showToday')" icon color="primary">
      <v-icon x-large>mdi-calendar-today</v-icon>
    </v-btn>
  </div>
</template>

<style scoped></style>
