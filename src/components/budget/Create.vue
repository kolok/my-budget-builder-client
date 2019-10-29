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
import BudgetForm from "./Form.vue";
import { mapActions } from "vuex";
import MiniAddButton from "../button/miniAdd.vue";

export default {
  components: {
    BudgetForm,
    MiniAddButton,
  },
  props: {
    existsBudgets: Boolean
  },
  data() {
    return {
      createDialog: false,
      budgetForm: {
        name: "",
        startDate: "",
        endDate: ""
      },
    };
  },
  methods: {
    ...mapActions(["createBudget"]),
    handleCreateBudget: function(formName) {
      // Create budget
      this.createBudget(this.budgetForm)
        .then(response => {
          // close the dialogbox and set the new budget as the active one
          this.createDialog = false;
          this.$store.commit("SET_ACTIVEBUDGETID", response.id);
        })
        .catch(e => {
          console.log(e);
        });
    },
    handleCancel: function() {
      this.createDialog = false;
    },
    displayCreateDialog: function() {
      this.createDialog = true
    },
  }
};
</script>
