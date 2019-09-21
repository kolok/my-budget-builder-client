<template>
  <div>
    <h1 class="Content__Head1">Movements</h1>
    <div class="locale-changer">
    <select v-model="$i18n.locale">
      <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">{{ lang }}</option>
    </select>
  </div>
    <p>{{ $t("message.hello") }}</p>

  </div>
</template>
<script>
export default {
  name: 'locale-changer',
  data () {
    return { langs: ['fr', 'en'] }
  }
}
</script>
