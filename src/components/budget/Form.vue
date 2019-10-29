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
          :label="$t('Budget')"
        >
          <el-input
            v-model="budgetForm.name"
            autocomplete="off"
          />
        </el-form-item>
        <BudgetDates :budgetForm="budgetForm" />
      </el-form>
      <span
        slot="footer"
      >
        <el-button @click="handleCancel">
          {{ $t('Cancel') }}
        </el-button>
        <el-button
          type="primary"
          @click="submitBudget('budgetForm')"
        >{{ $t('Save') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BudgetDates from '../form/budgetDates.vue'

export default {
  components: {
    BudgetDates,
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
          { required: true, message: this.$t('Budget name can\'t be blank') },
          { max:25, message: this.$t('Too long')},
          { min:3, message: this.$t('Too short')}
        ]
      }
    }
  },
  methods: {
    submitBudget: function(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('submitBudget')
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
