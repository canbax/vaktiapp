<script setup lang="ts">
import { HijriDate } from '@/util/HijriDate';
import { clearHours, getHumanReadableDayDifference } from '@/util/dateAndTime';

import { getCurrentInstance, onMounted, ref } from 'vue';
import { getTranslateFn } from '@/util/i18n';

type SabbaticalRow = {
  hij: string;
  gre: string;
  greDate: Date;
  sabbatical: string;
};

const hijri = new HijriDate();
const sabbaticalRows = ref<SabbaticalRow[]>([]);
const NUM_SABBATICALS = 10;

const $t = getTranslateFn(getCurrentInstance());

function scrollClosestRowIntoView() {
  setTimeout(() => {
    const el = document.getElementsByClassName('closest-sabbatical')?.[0];
    el?.scrollIntoView?.({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }, 100);
}

onMounted(() => {
  const today = clearHours(new Date());
  const l = hijri.getAllSabbaticalsNear(today, NUM_SABBATICALS);
  sabbaticalRows.value = l.map((x) => {
    return {
      hij: hijri2str(x.hijri),
      gre: gre2str(x.gregorian),
      greDate: x.gregorian,
      sabbatical: $t(x.sabbatical.name),
    };
  });

  scrollClosestRowIntoView();
});

function hijri2str(h: HijriDate): string {
  return h.getDay() + ' ' + $t('hijriMonth' + h.getMonth()) + ' ' + h.getYear();
}

function gre2str(d: Date): string {
  return d.getDate() + ' ' + $t('month' + d.getMonth()) + ' ' + d.getFullYear();
}
</script>

<template>
  <div class="text-center">
    <v-table>
      <tbody>
        <tr
          v-for="(item, idx) in sabbaticalRows"
          :key="idx"
          :class="{
            'bg-primary closest-sabbatical': idx === NUM_SABBATICALS,
          }"
        >
          <td>
            {{ item.sabbatical }}
            <br />
            <span v-if="idx === NUM_SABBATICALS">
              ({{ getHumanReadableDayDifference(item.greDate, $t) }})
            </span>
          </td>
          <td>
            <div>
              {{ item.hij }}
              <br />
              {{ item.gre }}
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>
