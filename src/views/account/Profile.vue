<template>
  <div>
    <h1 class="Content__Head1">
      {{$t('Your profile')}}
    </h1>
    <user-edit-me-form />
    <h1 class="Content__Head1">
      {{$t('Manage your Credentials')}}
    </h1>
    <p>{{ $t('How it works ?') }}</p>
    <p>{{ $t('Click on the button bellow, an email to change your password will be sent to you') }}</p>
    <el-button type="primary" @click="updatePasswordRequest()">{{ $t('Update your password') }}</el-button>
  </div>
</template>

<script>
import UserEditMeForm from '../../components/user/EditMeForm.vue'
import AuthService from '../../api/auth.service'

export default {
  components: {
    UserEditMeForm,
  },
  methods: {
    updatePasswordRequest() {
      AuthService.updatePasswordRequest()
        .then( () => {
          console.log("update password email sent")
        })
        .catch( err => {
          console.log("Oops ! Something went wrong")
        })
    }
  }
}
</script>
