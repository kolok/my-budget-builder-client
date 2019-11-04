<template>
  <user-form @submitForm="handleEdit" @cancel="handleCancel" :userForm="userForm" :isAdmin="isAdmin" />
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
      userForm: {}
    };
  },
  computed: {
    isAdmin() {
      return this.userForm.userCompanies !== undefined &&
          this.userForm.userCompanies[0] !== undefined &&
          this.userForm.userCompanies[0].role == "client_admin"
    }
  },
  created() {
    this.initUser();
  },
  methods: {
    ...mapActions(["getUser", "updateUser"]),

    initUser: function() {
      this.getUser(this.$route.params.id).then(response => {
        this.userForm = response.data;
        this.userForm.isAdmin =
          this.userForm.userCompanies !== undefined &&
          this.userForm.userCompanies[0] !== undefined &&
          this.userForm.userCompanies[0].role == "client_admin";
      });
    },
    handleEdit: function(formName) {
      // Create user
      this.updateUser(this.userForm)
        .then(() => {
          const h = this.$createElement;
          this.$notify({
            title: this.$t("Update user"),
            message: h(
              "i",
              { style: "color: teal" },
              this.$t("User {name} was updated", { name: this.userForm.name })
            ),
            type: "success"
          });
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
