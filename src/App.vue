<template>
  <div class="Layout">
    <Header />
    <div class="Body">
      <div class="ContentContainer">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Header from './components/common/Header.vue'

export default {
  components: {
    Header,
  }
}
</script>

<style>
</style>
