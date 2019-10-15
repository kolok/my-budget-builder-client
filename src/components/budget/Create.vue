<template>
  <div class="Content__Button--light">
    <div v-if="existsBudgets">
      <el-button
        type="text"
        icon="el-icon-circle-plus-outline"
        @click="createDialog = true"
        style="font-size:30px;"
      >
      </el-button>
    </div>
    <div v-else>
      <el-button
        class="Content__Button--Big"
        type="primary"
        icon="el-icon-circle-plus-outline"
        @click="createDialog = true"
      > Create your first budget
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
        <el-form-item
          prop="dates"
          label="From"
        >
          <el-date-picker
            v-model="budgetForm.startDate"
            type="date"
            @change="startDateChanged($event)"
            placeholder="Pick a day"
            format="yyyy/MM/dd"
            value-format="yyyy-MM-dd">
          </el-date-picker>
    
        </el-form-item>
        <el-form-item
          prop="dates"
          label="To"
        >
          <el-date-picker
            v-model="budgetForm.endDate"
            type="date"
            placeholder="Pick a day"
            format="yyyy/MM/dd"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
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
  import { mapActions, mapGetters } from 'vuex'

  export default {
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
      startDateChanged: function(startDate) {
        var date = new Date(startDate)
        var endDate = new Date(date.getFullYear() + 1, date.getMonth(), date.getDate() -1)
        this.budgetForm.endDate = endDate.getFullYear() + '-' + (endDate.getMonth() + 1) + '-' + endDate.getDate()
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
