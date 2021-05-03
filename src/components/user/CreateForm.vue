<template>
  <user-form
    :user-form="userForm"
    :is-admin="isAdmin"
    @submitForm="handleCreate"
    @cancel="handleCancel"
  />
</template>

<script>
import { mapActions } from 'vuex'
import userForm from './Form.vue'

export default {
  components: {
    userForm
  },
  data() {
    return {
      userForm: {
        name: '',
        email: '',
        defaultLanguage: 'en',
        role: 'client_user'
      }
    }
  },
  methods: {
    ...mapActions(['createUser']),

    handleCreate: function() {
      // Create user
      this.createUser(this.userForm)
        .then(() => {
          // reset form data
          this.$router.push('/users')
        })
        .catch(e => {
          console.log(e)
        })
    },
    handleCancel: function() {
      this.$router.push('/users')
    }
  }
}
</script>
