<template>
  <user-form
    @submitForm="handleEdit"
    :userForm="userForm"
    :isAdmin="isAdmin"
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
  computed: {
    isAdmin() {
      return (
        this.userForm.userCompanies !== undefined &&
        this.userForm.userCompanies[0] !== undefined &&
        this.userForm.userCompanies[0].role == "client_admin"
      );
    }
  },
  created() {
    this.initUser();
  },
  methods: {
    ...mapGetters(["getCurrentUser"]),
    ...mapActions(["updateUser"]),

    initUser: function() {
      this.userForm = this.getCurrentUser();
      this.userForm.isAdmin =
        this.userForm.userCompanies !== undefined &&
        this.userForm.userCompanies[0] !== undefined &&
        this.userForm.userCompanies[0].role == "client_admin";
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
