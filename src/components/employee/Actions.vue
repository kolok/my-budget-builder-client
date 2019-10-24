<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-edit"
      size="mini"
      circle
      @click="handleEdit(employeeID)"
    ></el-button>
    <el-button
      size="mini"
      type="danger"
      icon="el-icon-delete"
      circle
      @click="handleDelete(employeeID)"
    ></el-button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    employeeID: {
      type: Number,
      required: true
    }
  },
  methods: {
    ...mapActions(["deleteEmployee"]),
    handleEdit: function(employeeID) {
      this.$router.push("employees/" + employeeID);
    },
    handleDelete: function(employeeID) {
      this.$confirm(this.$t("Do you really want to delete this employee?"), this.$t("Warning"), {
        confirmButtonText: this.$t("Yes"),
        cancelButtonText: this.$t("No"),
        type: "warning"
      }).then(() => {
        this.deleteEmployee(employeeID);
      });
    },
  }
};
</script>
