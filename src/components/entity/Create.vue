<template>
  <div>
    <template>
      <el-button
        type="primary"
        @click="displayCreate"
      >
        {{ $t('Create a new entity') }}
      </el-button>
    </template>
    <entity-form 
      :entity-form="entityForm"
      :display-dialog="createDialog"
      @submitForm="handleCreateEntity"
      @cancel="handleCancel"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import EntityForm from './Form.vue'

export default {
  components: {
    EntityForm
  },
  data() {
    return {
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
    handleCreateEntity: function() { // Create entity
      this.createEntity(this.entityForm)
        .then(() => {
          // reset form data
          this.createDialog = false
        })
        .catch(e => {
          console.log(e)
        })
    },
    handleCancel: function() {
      this.createDialog = false
    },
    displayCreate: function() {
      this.createDialog = true
    }
  }
}
</script>
