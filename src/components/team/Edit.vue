<template>
  <div class="Content__Button--right">
    <el-button
      type="text"
      size="mini"
      @click="() => showEditDialog()"
    >
      Edit
    </el-button>


    <el-dialog
      title="Update team"
      :visible.sync="editDialog"
    >
      <el-form
        ref="teamForm"
        :model="teamForm"
        :rules="teamRule"
        label-width="250px"
        class="Dialog__Form"
        @keyup.enter.native="handleCreateTeam('teamForm', false)"
      >
        <el-form-item
          prop="name"
          label="Team"
        >
          <el-input
            v-model="teamForm.name"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="Parent Team"
          prop="parent_team_id"
        >
          <el-cascader
            v-model="teamForm.parent_team_id"
            :options="teamTreeSelector"
            :props="{ checkStrictly: true }"
            placeholder="Select a parent team"
            clearable>
          </el-cascader>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
      >
        <el-button @click="handleCancel">Cancel</el-button>
        <el-button
          type="primary"
          @click="handleUpdateTeam('teamForm')"
        >Save</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    props: {
      teamForm: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        editDialog: false,
        teamRule: {
          name: [
            { required: true, message: 'Entity name can\'t be blank' },
            { max:25, message: 'Too long'},
            { min:3, message: 'Too short'}
          ]
        },
      }
    },
    computed: {
      ...mapGetters(['teamTreeSelector'])
    },
    methods: {
      ...mapActions(['updateTeam']),
      showEditDialog: function() {
        this.editDialog = true;
      },
      handleCancel: function(){
        this.editDialog = false
      },
      handleUpdateTeam: function(formName) { // Create entity
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.updateTeam(this.teamForm)
              .then(response => {
                // reset form data
                this.editDialog = false
              })
              .catch(e => {
                console.log(e)
              })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
    },
  }


</script>
