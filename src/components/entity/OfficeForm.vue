<template>
    <el-dialog
      :title="title"
      :visible.sync="displayDialog"
    >
      <el-form
        ref="officeForm"
        :model="officeForm"
        :rules="officeRule"
        label-width="250px"
        class="Dialog__Form"
      >
        <el-form-item
          prop="name"
          :label="$t('Office')"
        >
          <el-input
            v-model="officeForm.name"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          prop="address"
          :label="$t('Address')"
        >
          <el-input
            v-model="officeForm.address"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          prop="zipcode"
          :label="$t('Zipcode')"
        >
          <el-input
            v-model="officeForm.zipcode"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          prop="town"
          :label="$t('Town')"
        >
          <el-input
            v-model="officeForm.town"
            autocomplete="off"
          />
        </el-form-item>
        <CountrySelect :form="officeForm" />
      </el-form>
            <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleCancel('officeForm')">{{ $t('Cancel') }}</el-button>
        <el-button
          type="primary"
          @click="handleCreateOffice('officeForm')"
        >{{ $t('Save') }}</el-button>
      </span>
    </el-dialog>
</template>

<script>
import CountrySelect from '../form/countrySelect.vue'

export default {
  components: {
    CountrySelect
  },
  props: {
    officeForm: {
      type: Object,
      required: true
    },
    displayDialog: {
      type:Boolean,
      required: true
    },
    title: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      officeRule: {
        name: [
          { required: true, message: this.$t('Office name can\'t be blank') },
          { max:255, message: this.$t('Too long')},
          { min:3, message: this.$t('Too short')}
        ]
      }
    }
  },
  watch: {
    'displayDialog': function(displayDialog) {
      if (displayDialog == true && this.$refs['officeForm'] && this.officeForm.id === undefined){
        this.$refs['officeForm'].resetFields()
      }
    }
  },
  methods: {
    handleCreateOffice: function(formName) { // Create office
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('submitForm')
        } else {
          return false
        }
      })
    },
    handleCancel: function(formName){
      this.$refs[formName].resetFields()
      this.$emit('cancel')
    }
  }
}
</script>
