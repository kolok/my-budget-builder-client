<template>
  <el-form-item 
    :label="$t('Currency')" 
    :prop="prop"
  >
    <el-select 
      v-model="form[prop]"
      :placeholder="$t('Select a currency')"
    >
      <el-option
        v-for="currency in currencies"
        :key="currency.id"
        :label="currency.longName"
        :value="currency.id"
      />
    </el-select>
  </el-form-item>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    form: {
      type: Object,
      required: true
    },
    prop: {
      type: String,
      default: 'defaultCurrencyID'
    },
  },
  computed: {
    ...mapGetters(['currencies'])
  }
}
</script>
