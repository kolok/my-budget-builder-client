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
      <el-form
        ref="budgetForm"
        :model="budgetForm"
        :rules="budgetRule"
        label-width="250px"
        class="Dialog__Form"
        @keyup.enter.native="handleUpdateBudget('budgetForm')"
      >
        <el-form-item
          prop="name"
          label="Budget"
        >
          <el-input
            v-model="budgetForm.name"
            autocomplete="off"
          />
        </el-form-item>
        <budgetDatesForm :budgetForm="budgetForm" />
      </el-form>
      <span
        slot="footer"
      >
        <el-button @click="handleCancel">Cancel</el-button>
        <el-button
          type="primary"
          @click="handleUpdateBudget('budgetForm')"
        >Save</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import budgetDatesForm from './DatesForm.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    budgetDatesForm,
  },
  data() {
    return {
      'updateDialog': false,
      'budgetForm': {},
      'budgetRule': {
        'name': [
          { required: true, message: 'Budget name can\'t be blank' },
          { max:25, message: 'Too long'},
          { min:3, message: 'Too short'}
        ]
      }

    }
  },
  computed: {
    ...mapGetters(['activeBudgetID']),
  },
  methods: {
    ...mapActions(['updateBudget', 'getBudget', 'getBudgets','deleteBudget']),
    handleDeleteBudget: function() {
      this.$confirm('Do you really want to delete this Budget?', 'Warning', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(() => {
        this.deleteBudget(this.activeBudgetID).then( () => {
          this.getBudgets().then( budgets => {
            if (budgets !== undefined && budgets.length > 0) {
              this.$store.commit('SET_ACTIVEBUDGETID', budgets[0].id)
            }
          })
        })
      })
    },
    handleEditBudget: function() {
      this.getBudget(this.activeBudgetID).then(response => {
        this.budgetForm = response.data
        this.updateDialog = true
      })
    },
    handleUpdateBudget: function(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.budgetForm.startDate)
          this.updateBudget(this.budgetForm)
            .then( () => {
              const h = this.$createElement
              this.$notify({
                title: 'Update budget',
                message: h('i', { style: 'color: teal' }, 'user ' + this.budgetForm.name + ' was updated'),
                type: 'success'
              })
              this.updateDialog = false
            })
            .catch(e => {
              console.log(e)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleCancel: function(){
      this.updateDialog = false
    },
    startDateChanged: function(startDate) {
      var date = new Date(startDate)
      var endDate = new Date(date.getFullYear() + 1, date.getMonth(), date.getDate() -1)
      this.budgetForm.endDate = endDate.getFullYear() + '-' + (endDate.getMonth() + 1) + '-' + endDate.getDate()
    },
  },
}
</script>
