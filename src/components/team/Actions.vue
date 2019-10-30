<template>
  <div
    class="Content__TreeButton"
    style="display:flex;justify-content:flex-end;align-items:center;"
  >
    <mini-add-button :actionFunc="showCreateDialog" />
    <mini-edit-button :actionFunc="showEditDialog" />
    <mini-delete-button :actionFunc="removeTeam" />
    <el-dialog :title="$t('Update team')" :visible.sync="editDialog">
      <team-form :teamForm="teamForm" @cancel="handleCancel" @submitForm="handleUpdateTeam" />
    </el-dialog>
  </div>
</template>


<script>
import { mapActions } from "vuex";
import MiniAddButton from "../button/miniAdd.vue";
import MiniEditButton from "../button/miniEdit.vue";
import MiniDeleteButton from "../button/miniDelete.vue";
import TeamForm from "./Form.vue";

export default {
  components: {
    MiniAddButton,
    MiniEditButton,
    MiniDeleteButton,
    TeamForm,
  },
  props: {
    teamForm: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editDialog: false
    };
  },
  methods: {
    ...mapActions(["deleteTeam", "updateTeam", "getTeams"]),

    showCreateDialog() {
      //emit show create dialog 
      this.$emit('showCreateDialog', this.teamForm.id)
    },
    showEditDialog: function() {
      this.editDialog = true;
    },
    handleCancel: function() {
      this.editDialog = false;
    },
    removeTeam() {
      this.$confirm(
        this.$t("Do you really want to delete this employee?"),
        this.$t("Warning"),
        {
          confirmButtonText: this.$t("Yes"),
          cancelButtonText: this.$t("No"),
          type: "warning"
        }
      ).then(() => {
        this.deleteTeam(this.teamForm.id)
          .then(() => {
        console.log(this.$t('test'))
            const h = this.$createElement;
            //FIXME: make the translate works, 
            // vue this.$t is not more accessible after deleteTeam
            this.$notify({
              title: "Delete team",
              message: h("i", { style: "color: teal" }, "Team was deleted"),
              type: "warning"
            });
          })
          .catch(e => {
            console.log(e);
          });
      });
    },
    handleUpdateTeam: function() {
      // Update entity
      this.updateTeam(this.teamForm)
        .then(() => {
          this.editDialog = false;
          const h = this.$createElement;
          this.$notify({
            title: this.$t("Update team"),
            message: h(
              "i",
              { style: "color: teal" },
              this.$t("Team {name} was updated", { name: this.teamForm.name })
            ),
            type: "success"
          });
        })
        .catch(e => {
          const h = this.$createElement;
          this.$notify({
            title: this.$t("Update team"),
            message: h(
              "i",
              { style: "color: red" },
              this.$t("Something went wrong! the team wasn't moved")
            ),
            type: "error"
          });
          this.getTeams();
          console.log(e);
        });
    },

  }
};
</script>
