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

    <e-form 
      :entityForm="entityForm"
      :displayDialog="createDialog"
      @submitForm="handleCreateEntity"
      @cancel="handleCancel"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import EForm from './Form.vue'

export default {
  components: {
    EForm
  },
  data() {
    return {
      currencyList: [],
      createDialog: false,
      entityForm: {
        name: '',
        countryID: '',
        taxeRate: 50,
        defaultCurrencyID: ''
      }
    }
  },
  methods: {
    ...mapActions(['createEntity']),
    handleCreateEntity: function(formName) { // Create entity
      this.createEntity(this.entityForm)
        .then(response => {
          // reset form data
          this.createDialog = false
        })
        .catch(e => {
          console.log(e)
        })
    },
    handleCancel: function(){
      this.createDialog = false
    }
  }
}
</script>
