<template>
  <el-form-item 
    :label="$t('Office')"
    :prop="prop"
  >
    <el-select 
      v-model="myForm[prop]"
      :placeholder="$t('Select an office')"
      style="width: 100%;"
    >
      <el-option
        v-for="office in offices"
        :key="office.id"
        :label="office.fullName"
        :value="office.id"
      />
    </el-select>
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
      type: String
    },
  },
  computed: {
    ...mapGetters(["offices"])
  },
  created() {
    this.$store.dispatch("getEntitiesWithOffices");
  }
};
</script>
