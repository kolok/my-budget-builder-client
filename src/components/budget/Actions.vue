<template>
  <div class="Content__ButtonContainer--left">
    <el-button
      @click="handleEditBudget()"
      circle
      class="Content__Button"
      icon="el-icon-edit"
      size="mini"
      type="primary"
    />
    <el-button
      @click="handleDeleteBudget()"
      circle
      class="Content__Button"
      icon="el-icon-delete"
      size="mini"
      type="danger"
    />
    <el-dialog
      :visible.sync="updateDialog"
      :title="$t('Update budget')"
    >
      <budgetForm
        :budgetForm="budgetForm"
        @cancel="handleCancel"
        @submitBudget="handleUpdateBudget"
      />
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import budgetForm from "./form/Form.vue";

export default {
  components: {
    budgetForm
  },
  data() {
    return {
      budgetForm: {},
      updateDialog: false,
    };
  },
  computed: {
    ...mapGetters(["activeBudgetID"])
  },
  methods: {
    ...mapActions(["updateBudget", "getBudget", "getBudgets", "deleteBudget"]),
    handleDeleteBudget: function() {
      this.$confirm(this.$t("Do you really want to delete this Budget?"), this.$t("Warning"), {
        confirmButtonText: this.$t("Yes"),
        cancelButtonText: this.$t("No"),
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
            title: this.$t('Update budget'),
            message: h(
              "i",
              { style: "color: teal" },
              this.$t('Budget {name} was updated', {name: this.budgetForm.name})
              
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
