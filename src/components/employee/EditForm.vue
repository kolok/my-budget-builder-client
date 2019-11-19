<template>
  <employee-form :employeeForm="employeeForm" @submitForm="handleEdit" @cancel="handleCancel" />
</template>

<script>
import { mapActions } from "vuex";
import employeeForm from "./Form.vue";

export default {
  components: {
    employeeForm
  },
  data() {
    return {
      employeeForm: {}
    };
  },
  created() {
    this.initEmployee();
  },
  methods: {
    ...mapActions(["getEmployee", "updateEmployee"]),

    initEmployee: function() {
      this.getEmployee(this.$route.params.id).then(response => {
        console.log("Get employee ", response.data);
        this.employeeForm = response.data;
      });
    },
    handleEdit: function(formName) {
      // Create employee
      this.updateEmployee(this.employeeForm)
        .then(() => {
          this.$cs({
            title: this.$t("Update employee"),
            h: this.$createElement,
            message: this.$t("Employee {name} was updated", { name: this.employeeForm.name }),
            type: "success"
          });
          this.$router.push("/hiringPlan");
        })
        .catch(e => {
          console.log(e);
        });
    },
    handleCancel: function() {
      this.$router.push("/hiringPlan");
    }
  }
};
</script>
