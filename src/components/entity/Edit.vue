<template>
  <div>
    <mini-edit-button :action-func="displayAddDialog" />
    <mini-delete-button :action-func="handleDelete" />
    <entity-form 
      :entity-form="entityForm"
      :display-dialog="editDialog"
      :title="$t('Update entity')"
      @submitForm="handleEdit"
      @cancel="handleCancel"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import MiniEditButton from '../button/miniEdit.vue'
import MiniDeleteButton from '../button/miniDelete.vue'
import EntityForm from './Form.vue'

export default {
  components: {
    MiniEditButton,
    MiniDeleteButton,
    EntityForm
  },
  props: {
    entityForm: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editDialog: false,
    }
  },
  methods: {
    ...mapActions(['updateEntity', 'deleteEntity']),
    /*eslint no-unused-vars: ["error", { "args": "none" }]*/
    handleEdit: function(formName) {
      this.updateEntity(this.entityForm)
        .then(response => {
          this.editDialog = false
        })
        .catch(e => {
          console.log(e)
        })
    },
    handleCancel: function() {
      this.editDialog = false
    },
    handleDelete() {
      this.$confirm(
        this.$t('Do you really want to delete this Entity?'),
        this.$t('Warning'),
        {
          confirmButtonText: this.$t('Yes'),
          cancelButtonText: this.$t('No'),
          type: 'warning'
        }
      ).then(() => {
        this.deleteEntity(this.entityForm.id)
      })
    },
    displayAddDialog() {
      this.editDialog = true
    }
  }
}
</script>
