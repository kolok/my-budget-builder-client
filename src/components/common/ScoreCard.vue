<template>
  <div class="Content__Score">
    <div class="Content__ScoreTitle">
      {{ title }}
    </div>
    <div class="Content__ScoreBody">
      {{ count }} {{ unit }}
    </div>
    <div
      v-if="subCount !== undefined"
      class="Content__ScoreFooter"
    >
      {{ subTitle ? subTitle + ':' : '' }} {{ subCount }} {{ unit }}
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
    subTitle: {
      type: String,
      required: false,
      default: ''
    },
    subCount: {
      type: Number,
      required: false,
      default: undefined
    },
    unit: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>
