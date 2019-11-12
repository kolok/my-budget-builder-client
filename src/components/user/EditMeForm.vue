<template>
  <user-form
    @submitForm="handleEdit"
    :userForm="userForm"
    :isCancelable="false"
  />
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import userForm from "./Form.vue";

export default {
  components: {
    userForm
  },
  data() {
    return {
      userForm: {}
    };
  },
  created() {
    this.initUser();
  },
  methods: {
    ...mapGetters(["getCurrentUser"]),
    ...mapActions(["updateUser"]),

    initUser: function() {
      this.userForm = this.getCurrentUser();
      if (
        this.userForm.userCompanies !== undefined &&
        this.userForm.userCompanies[0] !== undefined
      ) {
        this.userForm.role = this.userForm.userCompanies[0].role;
      } else {
        this.userForm.role = "client_user";
      }
    },
    handleEdit: function(formName) {
      // Create user
      this.updateUser(this.userForm)
        .then(() => {
          const h = this.$createElement;
          this.$notify({
            title: this.$t("Update your profile"),
            message: h(
              "i",
              { style: "color: teal" },
              this.$t("Your profile was updated")
            ),
            type: "success"
          });
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>
