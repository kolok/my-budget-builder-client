<template>
  <div>
    <el-form-item
      prop="dates"
      :label="$t('From')"
    >
      <el-date-picker
        v-model="budgetForm.startDate"
        type="date"
        :placeholder="$t('Pick a day')"
        :format="$t('yyyy/MM/dd')"
        value-format="yyyy-MM-dd"
        @change="startDateChanged($event)"
      />
    </el-form-item>
    <el-form-item
      prop="dates"
      :label="$t('To')"
    >
      <el-date-picker
        v-model="budgetForm.endDate"
        type="date"
        :placeholder="$t('Pick a day')"
        :format="$t('yyyy/MM/dd')"
        value-format="yyyy-MM-dd"
      />
    </el-form-item>
  </div>
</template>

<script>
export default {
  props: {
    budgetForm: {
      type: Object,
      required: true
    }
  },
  methods: {
    startDateChanged: function(startDate) {
      var date = new Date(startDate)
      var endDate = new Date(
        date.getFullYear() + 1,
        date.getMonth(),
        date.getDate() - 1
      )
      this.budgetForm.endDate =
        endDate.getFullYear() +
        '-' +
        (endDate.getMonth() + 1) +
        '-' +
        endDate.getDate()
    }
  }
}
</script>









