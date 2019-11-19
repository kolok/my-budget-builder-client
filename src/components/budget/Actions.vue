<template>
  <div class="Content__ButtonContainer--left">
    <mini-edit-button :actionFunc="handleEditBudget" />
    <mini-delete-button :actionFunc="handleDeleteBudget" />
    <el-dialog
      :visible.sync="updateDialog"
      :title="$t('Update budget')"
    >
      <BudgetForm
        :budgetForm="budgetForm"
        @cancel="handleCancel"
        @submitBudget="handleUpdateBudget"
      />
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import BudgetForm from "./Form.vue";
import MiniEditButton from "../button/miniEdit.vue";
import MiniDeleteButton from "../button/miniDelete.vue";

export default {
  components: {
    BudgetForm,
    MiniEditButton,
    MiniDeleteButton,
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
      this.$confirm(this.$t("Do you really want to delete this budget?"), this.$t("Warning"), {
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
          this.$cs({
            title: this.$t('Update budget'),
            h: this.$createElement,
            message: this.$t('Budget {name} was updated', {name: this.budgetForm.name}),
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
