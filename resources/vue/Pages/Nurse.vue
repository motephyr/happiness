<template>
  <main>
    <Head title="Nurse" />

    <div class="grid-container w-full">
      <div class="grid-item">
        <table class="border-separate border-green-800 w-full sm:text-center">
          <thead>
            <tr style="background-color: #1c4b73; color: white">
              <th class="border-green-600">日期</th>
              <th class="border-green-600">半夜活動事件數量</th>
              <th class="border-green-600">時間最長事件</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(datestring, index) in Object.keys(datestrings).reverse()"
              :key="index"
              :style="{ backgroundColor: index % 2 == 0 ? '#f89b3e' : '#fdf1e0' }"
            >
              <td class="border-green-600">
                <a :href="`/nurse/${datestring}`">{{ datestring }}</a>
              </td>
              <td class="border-green-600">{{ datestrings[datestring].time }}</td>
              <td class="border-green-600">{{ toHHMMSS(datestrings[datestring].longesttime) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="grid-item"></div>
    </div>
  </main>
</template>

<script>
import Layout from '../Layout/Master'
import { Head } from '@inertiajs/inertia-vue'
import helper from '/app/Helpers'

export default {
  layout: Layout,
  components: {
    Head,
  },
  props: {
    datestrings: Object,
  },
  methods: {
    toHHMMSS(time) {
      return helper.toHHMMSS(time)
    },
  },
}
</script>