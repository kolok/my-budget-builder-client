<template>
  <employee-form :employeeForm="employeeForm" @submitForm="handleCreate" @cancel="handleCancel" />
</template>

<script>
import { mapActions } from "vuex"
import employeeForm from "./Form.vue"

export default {
  components: {
    employeeForm
  },
  data() {
    return {
      employeeForm: {}
    }
  },
  methods: {
    ...mapActions(["createEmployee"]),
    handleCreate: function(formName) {
      // Create employee
      this.createEmployee(this.employeeForm)
        .then(() => {
          // reset form data
          this.employeeForm = {}
          this.$router.push("/hiringPlan")
        })
        .catch(e => {
          console.log(e)
        });
    },
    handleCancel: function() {
      this.$router.push("/hiringPlan")
    }
  }
};
</script>
