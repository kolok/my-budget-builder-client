<template>
  <div class="Layout">
    <Header />
    <div class="Body">
      <div class="ContentContainer">
        <router-view />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from './components/common/Header.vue'
import Footer from './components/common/Footer.vue'

export default {
  components: {
    Header,
    Footer,
  }
}
</script>
