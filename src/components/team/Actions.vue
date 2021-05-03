<template>
  <div
    class="Content__TreeButton"
    style="display:flex;justify-content:flex-end;align-items:center;"
  >
    <mini-add-button :action-func="showCreateDialog" />
    <mini-edit-button :action-func="showEditDialog" />
    <mini-delete-button :action-func="removeTeam" />
    <el-dialog
      :title="$t('Update team')"
      :visible.sync="editDialog"
    >
      <team-form
        :team-form="teamForm"
        @cancel="handleCancel"
        @submitForm="handleUpdateTeam"
      />
    </el-dialog>
  </div>
</template>


<script>
import { i18n } from '../../i18n'
import { mapActions } from 'vuex'
import MiniAddButton from '../button/miniAdd.vue'
import MiniEditButton from '../button/miniEdit.vue'
import MiniDeleteButton from '../button/miniDelete.vue'
import TeamForm from './Form.vue'

export default {
  components: {
    MiniAddButton,
    MiniEditButton,
    MiniDeleteButton,
    TeamForm
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
    }
  },
  methods: {
    ...mapActions(['deleteTeam', 'updateTeam', 'getTeams']),

    showCreateDialog() {
      //emit show create dialog
      this.$emit('showCreateDialog', this.teamForm.id)
    },
    showEditDialog: function() {
      this.editDialog = true
    },
    handleCancel: function() {
      this.editDialog = false
    },
    removeTeam() {
      this.$confirm(
        i18n.t('Do you really want to delete this employee?'),
        i18n.t('Warning'),
        {
          confirmButtonText: i18n.t('Yes'),
          cancelButtonText: i18n.t('No'),
          type: 'warning'
        }
      ).then(() => {
        this.deleteTeam(this.teamForm.id)
          .then(() => {
            /*
             *FIXME: make the translate works,
             * vue this.$t is not more accessible after deleteTeam
             */
            this.$cs({
              h: this.$createElement,
              title: i18n.t('Delete team'),
              message: i18n.t('Team was deleted'),
              type: 'warning'
            })
          })
          .catch(e => {
            console.log(e)
          })
      })
    },
    handleUpdateTeam: function() {
      // Update entity
      this.updateTeam(this.teamForm)
        .then(() => {
          this.$cs({
            h: this.$createElement,
            title: i18n.t('Update team'),
            message: i18n.t('Team {name} was updated', { name: this.teamForm.name }),
            type: 'success'
          })
          this.editDialog = false
        })
        .catch(e => {
          this.$cs({
            h: this.$createElement,
            title: i18n.t('Update team'),
            message: i18n.t('Something went wrong! the team wasn\'t moved'),
            type: 'error'
          })
          this.getTeams()
          console.log(e)
        })
    }
  }
}
</script>
