<template>
  <div>
    <el-form
      ref="employeeForm"
      :model="employeeForm"
      :rules="employeeRule"
      @keyup.enter.native="submitForm('employeeForm')"
      label-width="120px"
    >
      <div class='Content__EmployeeForm'>
        <div class='Content__EmployeeFormBlock'>
          <el-form-item prop="name" :label="$t('Employee or Open Position')" label-width="200px">
            <el-input v-model="employeeForm.name" autocomplete="off" />
          </el-form-item>
          <OfficeSelect :myForm="employeeForm" prop="officeID" />
          <el-form-item prop="position" :label="$t('Position')">
            <el-input v-model="employeeForm.position" autocomplete="off" />
          </el-form-item>
          <TeamSelect :myForm="employeeForm" prop="teamID" :label="$t('Team')" />
          <span slot="footer">
            <el-button @click="handleCancel('employeeForm')">{{ $t('Cancel') }}</el-button>
            <el-button type="primary" @click="submitForm('employeeForm')">{{ $t('Save') }}</el-button>
          </span>

        </div>
        <div class='Content__EmployeeFormBlock'>
          <email-form-item :myForm="employeeForm" :required="false"/>
          <div class='Content__EmployeeFormSubBlock'>
            <el-form-item 
              prop="payroll" 
              :label="$t('Annual Payroll')" 
              class="Content__EmployeeFormSubSubBlock"
            >
              <el-input-number v-model="employeeForm.payroll" :controls="false" style="width:100%"/>
            </el-form-item>
            <el-form-item
              prop="bonus" 
              :label="$t('Annual Bonus')"
              class="Content__EmployeeFormSubSubBlock"
            >
              <el-input-number v-model="employeeForm.bonus" :controls="false" style="width:100%"/>
            </el-form-item>
          </div>

          <div class='Content__EmployeeFormSubBlock'>
            <my-date class="Content__EmployeeFormSubSubBlock" :myForm="employeeForm" prop="startDate" :label="$t('Start date')" />
            <my-date class="Content__EmployeeFormSubSubBlock" :myForm="employeeForm" prop="endDate" :label="$t('End date')" />
          </div>
          <div class='Content__EmployeeFormSubBlock'>
            <my-date class="Content__EmployeeFormSubSubBlock" :myForm="employeeForm" prop="birthDate" :label="$t('Birth date')" />
          </div>

        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import MyDate from "../form/date.vue";
  import OfficeSelect from "../form/officeSelect.vue";
  import TeamSelect from "../form/teamSelect.vue";
  import EmailFormItem from "../../components/form/email.vue";

  export default {
    components: {
      MyDate,
      OfficeSelect,
      TeamSelect,
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
    computed: {
      ...mapGetters(["offices", "teamTreeSelector"])
    },
    created() {
      this.$store.dispatch("getTeams");
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

<style scoped>
  .Content__EmployeeForm {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .Content__EmployeeFormBlock {
    display: flex;
    flex-direction: column;
    margin: 20px;
    min-width: 300px;
    width: 80%;
  }
  .Content__EmployeeFormSubBlock {
    display: flex;
    flex-direction: row;
    justify-content: left;
    flex-wrap: wrap;
  }
  .Content__EmployeeFormSubSubBlock {
    width: 50%;
  }
  .Content__EmployeeFormItem {
  }

</style>