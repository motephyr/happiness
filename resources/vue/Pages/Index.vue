<template>
  <div class="flex flex-col md:flex-row">
    <Head title="Welcome" />

    <div class="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">
      <div class="flex flex-wrap">
        <div class="w-full md:w-1/2 xl:w-1/4 p-6">
          <!--Metric Card-->
          <div
            class="
              bg-gradient-to-b
              from-red-200
              to-red-100
              border-b-4 border-green-600
              rounded-lg
              shadow-xl
              p-5
              h-full
            "
          >
            <div class="flex flex-row items-center">
              <div class="flex-shrink pr-4">
                <div class="rounded-full p-5 bg-green-600">
                  <i class="fa fa-wallet fa-2x fa-inverse"></i>
                </div>
              </div>
              <div class="flex-1">
                <h5 class="font-bold text-gray-600">今日重點</h5>
                <h3 class="font-bold">年長者:{{ important.name }}</h3>
                <h3 class="font-bold">房間:{{ important.room }}</h3>
                <h3 class="font-bold">活動次數:{{ important.todaynum }}</h3>
                <h3 class="font-bold">總時長:{{ important.todaytime }}</h3>
              </div>
            </div>
          </div>
          <!--/Metric Card-->
        </div>
        <div class="w-full md:w-1/2 xl:w-1/4 p-6">
          <!--Metric Card-->
          <div
            class="
              bg-gradient-to-b
              from-yellow-200
              to-yellow-100
              border-b-4 border-green-600
              rounded-lg
              shadow-xl
              p-5
              h-full
            "
          >
            <div class="flex flex-row items-center">
              <div class="flex-shrink pr-4">
                <div class="rounded-full p-5 bg-green-600">
                  <i class="fa fa-wallet fa-2x fa-inverse"></i>
                </div>
              </div>
              <div class="flex-1">
                <h5 class="font-bold text-gray-600">持續關注名單</h5>
                <h3 class="font-bold">李林Ｏ妹</h3>
                <h3 class="font-bold">林Ｏ盛</h3>
                <h3 class="font-bold">李Ｏ筆</h3>
              </div>
            </div>
          </div>
          <!--/Metric Card-->
        </div>
        <div class="w-full md:w-1/2 xl:w-1/4 p-6">
          <!--Metric Card-->
          <div
            class="
              bg-gradient-to-b
              from-gray-200
              to-gray-100
              border-b-4 border-green-600
              rounded-lg
              shadow-xl
              p-5
              h-full
            "
          >
            <div class="flex flex-row items-center">
              <div class="flex-shrink pr-4">
                <div class="rounded-full p-5 bg-green-600">
                  <i class="fa fa-wallet fa-2x fa-inverse"></i>
                </div>
              </div>
              <div class="flex-1">
                <h5 class="font-bold text-gray-600">房間總覽</h5>
                <h3 class="font-bold" v-for="(room, i) in Object.keys(rooms).sort()" :key="i">
                  {{ room }} room: {{ rooms[room] }}人
                </h3>
              </div>
            </div>
          </div>
          <!--/Metric Card-->
        </div>
        <div class="w-full md:w-1/2 xl:w-1/4 p-6">
          <!--Metric Card-->
          <div
            class="
              bg-gradient-to-b
              from-indigo-200
              to-indigo-100
              border-b-4 border-green-600
              rounded-lg
              shadow-xl
              p-5
              h-full
            "
          >
            <div class="flex flex-row items-center">
              <div class="flex-shrink pr-4">
                <div class="rounded-full p-5 bg-green-600">
                  <i class="fa fa-wallet fa-2x fa-inverse"></i>
                </div>
              </div>
              <div class="flex-1">
                <h5 class="font-bold text-gray-600">Tips:</h5>
                <h3 class="font-bold">
                  李Ｏ筆：處置作為是藥物減量，從11/17開始，注意晚上起床狀況。
                </h3>
              </div>
            </div>
          </div>
          <!--/Metric Card-->
        </div>
      </div>

      <div class="flex flex-row flex-wrap flex-grow mt-2">
        <div class="w-full p-6">
          <!--Graph Card-->
          <div class="bg-white border-transparent rounded-lg shadow-xl">
            <div class="p-5">
              <VueApexCharts
                width="100%"
                height="300"
                type="line"
                :options="options"
                :series="series"
              ></VueApexCharts>
            </div>
          </div>
          <!--/Graph Card-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Layout from '../Layout/Master'
import { Head } from '@inertiajs/inertia-vue'
import VueApexCharts from 'vue-apexcharts'

export default {
  layout: Layout,
  components: {
    Head,
    VueApexCharts
  },
  props: {
    important: Object,
    rooms: Object,
    datestrings: Array,
    sumetimes: Array,
  },
  computed: {
    options() {
      return {
        chart: {
          id: 'vuechart-example',
        },
        xaxis: {
          categories: this.datestrings,
        },
      }
    },
    series() {
      return this.sumetimes.map((x) => {
        return {
          name: x.name,
          data: x.sumtime,
        }
      })
    },
  },
}
</script>