<template>
  <user-form
    :user-form="userForm"
    @submitForm="handleEdit"
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
      userForm: {}
    }
  },
  created() {
    this.initUser()
  },
  methods: {
    ...mapActions(['getUser', 'updateUser']),

    initUser: function() {
      this.getUser(this.$route.params.id).then(user => {
        this.userForm = user
      })
    },
    handleEdit: function() {
      // Create user
      this.updateUser(this.userForm)
        .then(() => {
          this.$cs({
            h: this.$createElement,
            title: this.$t('Update user'),
            message: this.$t('User {name} was updated', { name: this.userForm.name }),
            type: 'success'
          })
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
