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
        class="Content__Button--Big"
        type="primary"
        icon="el-icon-circle-plus-outline"
        @click="createDialog = true"
      >
        Create your first budget
      </el-button>
    </div>
    <el-dialog
      title="Create an new budget"
      :visible.sync="createDialog"
    >
      <el-form
        ref="budgetForm"
        :model="budgetForm"
        :rules="budgetRule"
        label-width="250px"
        class="Dialog__Form"
        @keyup.enter.native="handleCreateBudget('budgetForm')"
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
          @click="handleCreateBudget('budgetForm')"
        >Save</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import budgetDatesForm from './DatesForm.vue'
import { mapActions } from 'vuex'

export default {
  components: {
    budgetDatesForm,
  },
  props: {
    existsBudgets: Boolean,
  },
  data () {
    return {
      createDialog: false,
      budgetForm: {
        name: '',
        startDate: '',
        endDate: '',
      },
      budgetRule: {
        name: [
          { required: true, message: 'Budget name can\'t be blank' },
          { max:25, message: 'Too long'},
          { min:3, message: 'Too short'}
        ]
      },
    }
  },
  methods: {
    ...mapActions(['createBudget']),
    handleCreateBudget: function(formName) { // Create budget
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.createBudget(this.budgetForm)
            .then(response => {
              // reset form data
              this.$refs[formName].resetFields()
              this.createDialog = false
              this.$store.commit('SET_ACTIVEBUDGETID', response.id)
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
      this.createDialog = false
    }
  }
}
</script>

<style>
  .Content__Button--Big {
    font-size: 30px;
  }
</style>
