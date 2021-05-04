<template>
  <div class="Content__Score">
    <div class="Content__ScoreTitle">
      {{ title }}
    </div>
    <div class="Content__ScoreBody">
      {{ count }} {{ unit }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    count: {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>
