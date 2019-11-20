<template>
  <div>
    <el-form
      ref="employeeForm"
      :model="employeeForm"
      :rules="employeeRule"
      class="Dialog__Form"
      @keyup.enter.native="submitForm('employeeForm')"
    >
      <el-form-item prop="name" :label="$t('Employee')">
        <el-input v-model="employeeForm.name" autocomplete="off" />
      </el-form-item>
      <email-form-item :myForm="employeeForm" />
      <my-date :myForm="employeeForm" prop="startDate" :label="$t('Start date')" />
      <my-date :myForm="employeeForm" prop="endDate" :label="$t('End date')" />
      <my-date :myForm="employeeForm" prop="birthDate" :label="$t('Birth date')" />

      <el-form-item prop="salary" :label="$t('Annual Salary')">
        <el-input-number v-model="employeeForm.salary" :controls="false" />
      </el-form-item>
      <el-form-item prop="bonus" :label="$t('Annual Bonus')">
        <el-input-number v-model="employeeForm.bonus" :controls="false" />
      </el-form-item>

    </el-form>
    <span slot="footer">
      <el-button @click="handleCancel('employeeForm')">{{ $t('Cancel') }}</el-button>
      <el-button type="primary" @click="submitForm('employeeForm')">{{ $t('Save') }}</el-button>
    </span>
  </div>
</template>

<script>
import MyDate from "../form/date.vue";
import EmailFormItem from "../../components/form/email.vue";

export default {
  components: {
    MyDate,
    EmailFormItem
  },
  props: {
    employeeForm: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      employeeRule: {
        name: [
          { required: true, message: this.$t("Employee name can't be blank") },
          { max: 255, message: this.$t("Too long") }
        ]
      }
    };
  },
  methods: {
    submitForm: function(formName) {
      // Create employee
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit("submitForm");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleCancel: function() {
      this.$emit("cancel");
    }
  }
};
</script>
