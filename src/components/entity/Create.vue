<template>
  <div>
    <template>
      <el-button
        type="primary"
        @click="createDialog = true"
      >
        {{ $t('Create a new entity') }}
      </el-button>
    </template>

    <el-dialog
      :title="$t('Create an entity')"
      :visible.sync="createDialog"
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
        <CountrySelect :form="entityForm"/>
        <CurrencySelect :form="entityForm"/>
      </el-form>
      <span
        slot="footer"
      >
        <el-button @click="handleCancel">{{ $t('Cancel') }}</el-button>
        <el-button
          type="primary"
          @click="handleCreateEntity('entityForm')"
        >{{ $t('Save') }}</el-button>
      </span>
    </el-dialog>
  </div>
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
  data() {
    return {
      currencyList: [],
      createDialog: false,
      entityForm: {
        name: '',
        countryID:'',
        defaultCurrencyID: ''
      },
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
  computed: {
    ...mapGetters(['currencies', 'countries'])
  },
  methods: {
    ...mapActions(['createEntity']),
    /*eslint no-unused-vars: ["error", { "args": "none" }]*/
    handleCreateEntity: function(formName) { // Create entity
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.createEntity(this.entityForm)
            .then(response => {
              // reset form data
              this.$refs[formName].resetFields()
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
