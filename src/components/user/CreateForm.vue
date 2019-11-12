<template>
  <user-form
    @submitForm="handleCreate"
    @cancel="handleCancel"
    :userForm="userForm"
    :isAdmin="isAdmin"
  />
</template>

<script>
import { mapActions } from "vuex";
import userForm from "./Form.vue";

export default {
  components: {
    userForm
  },
  data() {
    return {
      userForm: {
        name: "",
        email: "",
        defaultLanguage: "en",
        role: "client_user"
      }
    };
  },
  methods: {
    ...mapActions(["createUser"]),

    handleCreate: function(formName) {
      // Create user
      this.createUser(this.userForm)
        .then(() => {
          // reset form data
          this.$router.push("/users");
        })
        .catch(e => {
          console.log(e);
        });
    },
    handleCancel: function() {
      this.$router.push("/users");
    }
  }
};
</script>
