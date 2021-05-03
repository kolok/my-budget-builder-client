<template>
  <div>
    <mini-edit-button :action-func="handleEdit" />
    <mini-delete-button :action-func="handleDelete" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import MiniEditButton from '../button/miniEdit.vue'
import MiniDeleteButton from '../button/miniDelete.vue'

export default {
  components: {
    MiniEditButton,
    MiniDeleteButton,
  },
  props: {
    employeeID: {
      type: Number,
      required: true
    }
  },
  methods: {
    ...mapActions(['deleteEmployee']),
    handleEdit: function() {
      this.$router.push('employees/' + this.employeeID)
    },
    handleDelete: function() {
      this.$confirm(this.$t('Do you really want to delete this employee?'), this.$t('Warning'), {
        confirmButtonText: this.$t('Yes'),
        cancelButtonText: this.$t('No'),
        type: 'warning'
      }).then(() => {
        this.deleteEmployee(this.employeeID)
      })
    },
  }
}
</script>
