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

export default {
  components: {
    MiniEditButton,
    MiniDeleteButton,
  },
  props: {
    userID: {
      type: Number,
      required: true
    }
  },
  methods: {
    ...mapActions(["deleteEmployee"]),
    handleEdit: function() {
      this.$router.push('users/' + this.userID)
    },
    handleDelete: function() {
      this.$confirm('Do you really want to delete this User?', 'Warning', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(() => {
        this.deleteUser(this.userID)
      })
    },
  }
};
</script>
