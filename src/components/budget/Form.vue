<template>
  <div>
    <el-form
      ref="budgetForm"
      :model="budgetForm"
      :rules="budgetRule"
      label-width="auto"
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
      <BudgetDates :budget-form="budgetForm" />
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
          { required: true, message: this.$t('Budget name can\'t be blank'), trigger: ['blur'] },
          { max:25, message: this.$t('Too long'), trigger: ['blur']},
          { min:3, message: this.$t('Too short'), trigger: ['blur']}
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
