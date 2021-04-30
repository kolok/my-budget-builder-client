<template>
  <el-form-item :label="label" prop="prop">
    <el-cascader
      v-model="myForm[prop]"
      :options="teamTreeSelector"
      :props="{ checkStrictly: true }"
      :placeholder="$t('Select a team')"
      style="width: 100%;"
      clearable
    />
  </el-form-item>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    myForm: {
      type: Object,
      required: true
    },
    prop: {
      type: String,
      default: "teamID"
    },
    label: {
      type: String,
    }
  },
  computed: {
    ...mapGetters(["teamTreeSelector"])
  },
  created() {
    this.$store.dispatch("getTeams");
  }
};
</script>
