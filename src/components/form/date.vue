<template>
    <el-form-item :prop="prop" :label="label">
      <el-date-picker
        v-model="myForm[prop]"
        type="date"
        :placeholder="placeholder"
        format="yyyy/MM/dd"
        value-format="yyyy-MM-dd"
      />
    </el-form-item>
</template>

<script>
import { i18n } from '../../i18n'

export default {
  props: {
    myForm: {
      type: Object,
      required: true
    },
    prop: {
      type: String,
      default: 'date'
    },
    label: {
      type: String,
      default: i18n.t('Date')
    },
    placeholder: {
      type: String,
      default: i18n.t('Pick a day')
    }
  }
};
</script>









