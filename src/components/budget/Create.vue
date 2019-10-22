<template>
  <div class="Content__Button--light">
    <div v-if="existsBudgets">
      <el-button
        type="text"
        icon="el-icon-circle-plus-outline"
        style="font-size:30px;"
        @click="createDialog = true"
      />
    </div>
    <div v-else>
      <el-button
        type="primary"
        class="Content__Button--Big"
        icon="el-icon-circle-plus-outline"
        @click="createDialog = true"
      >Create your first budget</el-button>
    </div>
    <el-dialog title="Create an new budget" :visible.sync="createDialog">
      <budgetForm
        :budgetForm="budgetForm"
        @submitBudget="handleCreateBudget"
        @cancel="handleCancel"
      />
    </el-dialog>
  </div>
</template>

<script>
import budgetForm from "./form/Form.vue";
import { mapActions } from "vuex";

export default {
  components: {
    budgetForm
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
    }
  }
};
</script>

<style>
.Content__Button--Big {
  font-size: 30px;
}
</style>
