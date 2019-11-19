<template>
  <div>
    <mini-edit-button :actionFunc="handleEdit" />
    <mini-delete-button :actionFunc="handleDelete" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import MiniEditButton from "../button/miniEdit.vue";
import MiniDeleteButton from "../button/miniDelete.vue";
import { i18n } from "../../i18n/index";

export default {
  components: {
    MiniEditButton,
    MiniDeleteButton
  },
  props: {
    userID: {
      type: Number,
      required: true
    }
  },
  methods: {
    ...mapActions(["deleteUser"]),
    handleEdit: function() {
      this.$router.push("users/" + this.userID);
    },
    handleDelete: function() {
      this.$confirm("Do you really want to delete this User?", "Warning", {
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        type: "warning"
      }).then(() => {
        this.deleteUser(this.userID)
          .then(() => {
            this.$cs({
              h: this.$createElement,
              title: i18n.t("Delete user"),
              message: i18n.t("The user was deleted"),
              type: "success"
            });
          })
          .catch(() => {
            this.$cs({
              h: this.$createElement,
              title: i18n.t("Delete user"),
              message: i18n.t("Something went wrong! The user wasn't deleted"),
              type: "error"
            });
          });
      });
    }
  }
};
</script>
