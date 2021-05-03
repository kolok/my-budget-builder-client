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
      required: true
    }
  }
}
</script>

<style>
.Content__Score {
  border-radius: 25px;
  background: #409eff;
  padding: 10px;
  color: white;
  width: 200px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.Content__ScoreTitle {
  padding-top: 0px;
  font-size: 18px;
}

.Content__ScoreBody {
  font-size: 32px;
  font-weight: bold;
}
</style>
