<template>
  <div>
    <el-form
      ref="teamForm"
      :model="teamForm"
      :rules="teamRule"
      label-width="150px"
      class="Dialog__Form"
      @keyup.enter.native="submitForm('teamForm')"
    >
      <el-form-item prop="name" :label="$t('Team')">
        <el-input v-model="teamForm.name" autocomplete="off" />
      </el-form-item>
      <el-form-item :label="$t('Parent Team')" prop="parentTeamID">
        <el-cascader
          v-model="teamForm.parentTeamID"
          :options="teamTreeSelector"
          :props="{ checkStrictly: true }"
          :placeholder="$t('Select a parent team')"
          clearable
        />
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="handleCancel">{{ $t('Cancel') }}</el-button>
      <el-button type="primary" @click="submitForm('teamForm', false)">{{ $t('Save and continue') }}</el-button>
      <el-button type="primary" @click="submitForm('teamForm', true)">{{ $t('Save and close') }}</el-button>
    </span>
  </div>
</template>

<script>
import BudgetDates from "../form/budgetDates.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    BudgetDates
  },
  props: {
    teamForm: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      teamRule: {
        name: [
          { required: true, message: this.$t("Team name can't be blank") },
          { max: 25, message: this.$t("Too long") },
          { min: 3, message: this.$t("Too short") }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["teamTreeSelector"])
  },
  methods: {
    submitForm: function(formName, dialogToClose) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit("submitForm", dialogToClose)
        } else {
          console.log("error submit!!")
          return false;
        }
      })
    },
    handleCancel: function() {
      this.$emit("cancel");
    }
  }
};
</script>
