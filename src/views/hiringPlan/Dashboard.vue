<template>
  <div class="Content__ObjectManagement">
    <BudgetCreate :existsBudgets="existsBudgets"/>
    <BudgetSelector v-if="existsBudgets"/>
    <div class="Content__ButtonContainer" v-if="existsBudgets">
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
          ref="currentBudgetForm"
          :model="currentBudgetForm"
          :rules="budgetRule"
          label-width="250px"
          class="Dialog__Form"
          @keyup.enter.native="handleUpdateBudget('currentBudgetForm')"

        >
          <el-form-item
            prop="name"
            label="Budget"
          >
            <el-input
              v-model="currentBudgetForm.name"
              autocomplete="off"
            />
          </el-form-item>
        </el-form>
        <span
          slot="footer"
        >
          <el-button @click="handleCancel">Cancel</el-button>
          <el-button
            type="primary"
            @click="handleUpdateBudget('currentBudgetForm')"
          >Save</el-button>
        </span>
      </el-dialog>

    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import BudgetCreate from '../../components/budget/Create.vue'
  import BudgetSelector from '../../components/budget/Selector.vue'

  export default {
    components: {
      BudgetCreate,
      BudgetSelector,
    },
    created(){
      this.setActiveBudget()
    },
    computed: {
      ...mapGetters(['budgets', 'activeBudgetID']),
      existsBudgets: function() {
        return this.budgets.length > 0;
      },
    },
    methods: {
      ...mapActions(['updateBudget', 'getBudget', 'getBudgets', 'deleteBudget']),
      setActiveBudget: function() {
        this.getBudgets().then( budgets => {
          if (budgets !== undefined && budgets.length > 0) {
            this.$store.commit('SET_ACTIVEBUDGETID', budgets[0].id)
          }
        })
      },
      setNewBudget: function(budget) {
        this.$store.commit('SET_ACTIVEBUDGETID', budget.id)
      },
      handleSelectBudget: function(val) {
        this.$store.commit('SET_ACTIVEBUDGETID', val)
      },
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
          this.currentBudgetForm = response.data
          this.updateDialog = true
        })
      },
      handleUpdateBudget: function(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.updateBudget(this.currentBudgetForm)
              .then(response => {
                const h = this.$createElement
                this.$notify({
                  title: 'Update budget',
                  message: h('i', { style: 'color: teal' }, 'user ' + this.currentBudgetForm.name + ' was updated'),
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

    },
    data() {
      return {
        'updateDialog': false,
        'currentBudgetForm': {},
        'budgetRule': {
          'name': [
            { required: true, message: 'Budget name can\'t be blank' },
            { max:25, message: 'Too long'},
            { min:3, message: 'Too short'}
          ]
        }

      }
    },
  }
</script>

<style>
  .Content__ObjectManagement {
    display:flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
</style>
