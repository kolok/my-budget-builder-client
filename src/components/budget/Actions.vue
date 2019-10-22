<template>
  <div class="Content__ButtonContainer">
    <el-button
      class="Content__Button"
      type="text"
      icon="el-icon-delete"
      @click="handleDeleteBudget()"
    />
    <el-button
      class="Content__Button"
      type="text"
      icon="el-icon-edit"
      @click="handleEditBudget()"
    />
    <el-dialog
      title="Update budget"
      :visible.sync="updateDialog"
    >
      <budgetForm
        :budgetForm="budgetForm"
        @submitBudget="handleUpdateBudget"
        @cancel="handleCancel"
      />
    </el-dialog>
  </div>
</template>

<script>
import budgetForm from "./form/Form.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    budgetForm
  },
  data() {
    return {
      updateDialog: false,
      budgetForm: {},
    };
  },
  computed: {
    ...mapGetters(["activeBudgetID"])
  },
  methods: {
    ...mapActions(["updateBudget", "getBudget", "getBudgets", "deleteBudget"]),
    handleDeleteBudget: function() {
      this.$confirm("Do you really want to delete this Budget?", "Warning", {
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        type: "warning"
      }).then(() => {
        this.deleteBudget(this.activeBudgetID).then(() => {
          this.getBudgets().then(budgets => {
            if (budgets !== undefined && budgets.length > 0) {
              this.$store.commit("SET_ACTIVEBUDGETID", budgets[0].id);
            }
          });
        });
      });
    },
    handleEditBudget: function() {
      this.getBudget(this.activeBudgetID).then(response => {
        this.budgetForm = response.data;
        this.updateDialog = true;
      });
    },
    handleUpdateBudget: function() {
      this.updateBudget(this.budgetForm)
        .then(() => {
          const h = this.$createElement;
          this.$notify({
            title: "Update budget",
            message: h(
              "i",
              { style: "color: teal" },
              "user " + this.budgetForm.name + " was updated"
            ),
            type: "success"
          });
          this.updateDialog = false;
        })
        .catch(e => {
          console.log(e);
        });
    },
    handleCancel: function() {
      this.updateDialog = false;
    }
  }
};
</script>
