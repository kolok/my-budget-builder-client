<template>
  <div>
      <el-form
        ref="budgetForm"
        :model="budgetForm"
        :rules="budgetRule"
        label-width="100px"
        class="Dialog__Form"
        @keyup.enter.native="submitBudget('budgetForm')"
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
          @click="submitBudget('budgetForm')"
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
  props: {
    budgetForm: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
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
    submitBudget: function(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('submitBudget')


          /*
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
            })*/
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleCancel: function() {
      this.$emit('cancel')
    },

  },
}
</script>
