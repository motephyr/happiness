<template>
  <div class="flex flex-col h-screen justify-between">
    <div class="container-fliud">
      <Navbar />
      <slot />
    </div>

    <footer class="footer-1 bg-gray-100" style="background-color: #f89b3e">
      <div class="container mx-auto px-4">
        <div class="sm:-mx-4 mt-6 pt-6">
          <div class="px-4 mt-4 md:mt-0">
            <h6 class="font-bold mb-2 sm:text-center">網頁維護專線：0906-886270(週一至週五)</h6>
            <p class="mb-4 text-sm sm:text-center">
              CarePLUS.ai 智慧照護系統 版權所有 | 100016 新竹市光復路二段100號
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import Navbar from '../Partials/Navbar'

export default {
  components: {
    Navbar,
  },
}
</script>