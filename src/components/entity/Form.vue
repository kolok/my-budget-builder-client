<template>
    <el-dialog
      :title="title"
      :visible.sync="displayDialog"
      :modal-append-to-body="false"
    >
  <el-form
    ref="entityForm"
    :model="entityForm"
    :rules="entityRule"
    label-width="250px"
    class="Dialog__Form"
  >
    <el-form-item
      prop="name"
      :label="$t('Entity')"
    >
      <el-input
        v-model="entityForm.name"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item 
      prop="taxeRate" 
      :label="$t('Taxe Rate in %')" 
    >
      <el-input-number
        v-model="entityForm.taxeRate"
        :controls="false"
      />
    </el-form-item>
    <CountrySelect :form="entityForm" />
    <CurrencySelect :form="entityForm" />
  </el-form>
        <span
        slot="footer"
      >
        <el-button @click="handleCancel">{{ $t('Cancel') }}</el-button>
        <el-button
          type="primary"
          @click="submitForm('entityForm')"
        >{{ $t('Save') }}</el-button>
      </span>
    </el-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CountrySelect from '../form/countrySelect.vue'
import CurrencySelect from '../form/currencySelect.vue'

export default {
  components: {
    CountrySelect,
    CurrencySelect,
  },
  props: {
    entityForm: {
      type: Object,
      required: true
    },
    displayDialog: {
      type:Boolean,
      required: true
    },
    title: {
      type: String,
      required: false,
      default: "Create an Entity"
    }
  },
  data() {
    return {
      currencyList: [],
      entityRule: {
        name: [
          { required: true, message: this.$t('Entity name can\'t be blank') },
          { max:25, message: this.$t('Too long')},
          { min:3, message: this.$t('Too short')}
        ],
        countryID: [
          { required: true, message: this.$t('A country should be selected') }
        ],
        defaultCurrencyID: [
          { required: true, message: this.$t('A currency should be selected') }
        ]
      }
    }
  },
  methods: {
    submitForm: function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit('submitForm')
        } else {
          return false
        }
      })
    },
    handleCancel: function() {
      this.$emit('cancel')
    }
  }
}
</script>
