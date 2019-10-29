<template>
  <el-form-item
    :label="$t('Country')"
    :prop="prop"
  >
    <el-select
      v-model="form[prop]"
      :placeholder="$t('Select a country')"
    >
      <el-option
        v-for="country in countries"
        :key="country.id"
        :label="country.name"
        :value="country.id"
      />
    </el-select>
  </el-form-item>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    form : {
      type: Object,
      required: true
    },
    prop: {
      type: String,
      default: "countryID"
    }
  },
  computed: {
    ...mapGetters(["countries"])
  },
};
</script>
