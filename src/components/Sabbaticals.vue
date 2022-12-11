<template>
  <v-simple-table class="m5">
    <template v-slot:default>
      <tbody>
        <tr
          v-for="(item, idx) in sabbs"
          :key="item.idx"
          v-bind:class="{ 'primary white': idx === NUM_SABBS }"
        >
          <td>{{ item.sabb }}</td>
          <td>
            {{ item.hij }}
            <br />
            {{ item.gre }}
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script lang="ts">
import { clearHours } from "@/helper";
import { HijriDate } from "@/HijriDate";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Sabbaticals extends Vue {
  private hijri = new HijriDate();
  private sabbs: { hij: string; gre: string; sabb: string }[] = [];
  private NUM_SABBS = 10;
  created(): void {
    const today = clearHours(new Date());
    const l = this.hijri.getAllSabbaticalsNear(today, this.NUM_SABBS);
    this.sabbs = l.map((x, i) => {
      return {
        hij: this.hijri2str(x.hijri),
        gre: this.gre2str(x.gre),
        sabb: this.$tc(x.sabb.name),
        idx: i,
      };
    });
  }

  mounted(): void {
    const el = document.getElementsByTagName("TR")[this.NUM_SABBS - 1];
    el.scrollIntoView(true);
  }

  private hijri2str(h: HijriDate): string {
    return h.getDay() + " " + this.$t("hijriMonth" + h.getMonth()) + " " + h.getYear();
  }

  private gre2str(d: Date): string {
    return d.getDate() + " " + this.$t("month" + d.getMonth()) + " " + d.getFullYear();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.banner {
  box-shadow: 8px 11px 15px -7px rgba(0, 0, 0, 0.2), 8px 24px 38px 3px rgba(0, 0, 0, 0.14),
    8px 9px 46px 8px rgba(0, 0, 0, 0.12) !important;
}
.m5 {
  margin: 5px;
}
.white {
  color: white;
}
</style>
