<template>
  <div class="Content__ButtonContainer--left">
    <mini-edit-button :action-func="handleEditBudget" />
    <mini-delete-button :action-func="handleDeleteBudget" />
    <el-dialog
      :visible.sync="updateDialog"
      :title="$t('Update budget')"
    >
      <BudgetForm
        :budget-form="budgetForm"
        @cancel="handleCancel"
        @submitBudget="handleUpdateBudget"
      />
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BudgetForm from './Form.vue'
import MiniEditButton from '../button/miniEdit.vue'
import MiniDeleteButton from '../button/miniDelete.vue'
import { i18n } from '../../i18n'

export default {
  components: {
    BudgetForm,
    MiniEditButton,
    MiniDeleteButton
  },
  data() {
    return {
      budgetForm: {},
      updateDialog: false
    }
  },
  computed: {
    ...mapGetters(['activeBudgetID'])
  },
  methods: {
    ...mapActions(['updateBudget', 'getBudget', 'getBudgets', 'deleteBudget']),
    handleDeleteBudget: function() {
      this.$confirm(
        this.$t('Do you really want to delete this budget?'),
        this.$t('Warning'),
        {
          confirmButtonText: this.$t('Yes'),
          cancelButtonText: this.$t('No'),
          type: 'warning'
        }
      )
        .then(() => {
          this.deleteBudget(this.activeBudgetID)
            .then(budget => {
              this.$cs({
                title: i18n.t('Delete budget'),
                h: this.$createElement,
                message: i18n.t('Budget {name} was deleted', {
                  name: budget.name
                }),
                type: 'success'
              })
              this.getBudgets().then(budgets => {
                if (budgets !== undefined && budgets.length > 0) {
                  this.$store.commit('SET_ACTIVEBUDGETID', budgets[0].id)
                }
              })
            })
            .catch(e => {
              this.$cs({
                title: i18n.t('Delete budget'),
                h: this.$createElement,
                message: i18n.t('Oops ! Something went wrong'),
                type: 'success'
              })
              console.log(e)
            })
        })
        .catch(e => {
          console.log(e)
        })
    },
    handleEditBudget: function() {
      this.getBudget(this.activeBudgetID).then(response => {
        this.budgetForm = response.data
        this.updateDialog = true
      })
    },
    handleUpdateBudget: function() {
      this.updateBudget(this.budgetForm)
        .then(budget => {
          this.$cs({
            title: this.$t('Update budget'),
            h: this.$createElement,
            message: this.$t('Budget {name} was updated', {
              name: budget.name
            }),
            type: 'success'
          })
          this.updateDialog = false
        })
        .catch(e => {
          this.$cs({
            title: this.$t('Update budget'),
            h: this.$createElement,
            message: this.$t('Oops ! Something went wrong'),
            type: 'error'
          })
          console.log(e)
        })
    },
    handleCancel: function() {
      this.updateDialog = false
    }
  }
}
</script>
