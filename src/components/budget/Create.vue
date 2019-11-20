<template>
  <div class="Content__Button--light">
    <div v-if="existsBudgets">
      <mini-add-button :actionFunc="displayCreateDialog" />
    </div>
    <div v-else>
      <el-button
        type="primary"
        class="Content__Button--big"
        icon="el-icon-circle-plus-outline"
        @click="createDialog = true"
      >{{ $t('Create your first budget') }}</el-button>
    </div>
    <el-dialog :title="$t('Create a new budget')" :visible.sync="createDialog">
      <budget-form
        :budgetForm="budgetForm"
        @submitBudget="handleCreateBudget"
        @cancel="handleCancel"
      />
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import BudgetForm from "./Form.vue";
import MiniAddButton from "../button/miniAdd.vue";

export default {
  components: {
    BudgetForm,
    MiniAddButton
  },
  props: {
    existsBudgets: Boolean
  },
  data() {
    return {
      createDialog: false,
      budgetForm: { name: "", startDate: "", endDate: "" }
    };
  },
  methods: {
    ...mapActions(["createBudget"]),
    handleCreateBudget: function(formName) {
      // Create budget
      this.createBudget(this.budgetForm)
        .then(response => {
          this.$cs({
            title: this.$t("Budget creation"),
            h: this.$createElement,
            message: this.$t("Budget {name} was created", {
              name: this.budgetForm.name
            }),
            type: "success"
          });
          // close the dialogbox and set the new budget as the active one
          this.budgetForm = { name: "", startDate: "", endDate: "" };
          this.createDialog = false;
          this.$store.commit("SET_ACTIVEBUDGETID", response.id);
        })
        .catch(e => {
          this.$cs({
            title: this.$t("Budget creation"),
            h: this.$createElement,
            message: this.$t("Oops ! Something went wrong"),
            type: "error"
          });
          console.log(e);
        });
    },
    handleCancel: function() {
      this.createDialog = false;
    },
    displayCreateDialog: function() {
      this.createDialog = true;
    }
  }
};
</script>
