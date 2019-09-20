<template>
  <div>
    <el-input
      v-model="search"
      class="Content__Input--Search"
      placeholder="Type to search"
    />
    <br>
    <el-button
      type="text"
      size="mini"
      @click="showCreateDialog()">
      <i class="el-icon-plus" />
      Add a root team
    </el-button>

    <el-dialog
      title="Create a new team"
      :visible.sync="createDialog"
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
          @click="handleCreateTeam('teamForm', false)"
        >Save and continue</el-button>
        <el-button
          type="primary"
          @click="handleCreateTeam('teamForm', true)"
        >Save and close</el-button>
      </span>
    </el-dialog>
    <el-tree
      :data="filterTree(teamTree)"
      node-key="id"
      default-expand-all
      @node-drop="handleDrop"
      draggable
      :expand-on-click-node="false">
      <span class="Content__TreeNode" slot-scope="{ node, data }">
        <span :class="data.search" v-html="displaySearchedName(data)">{{ displaySearchedName(data) }}</span>
        <span>
          <div class="Content__Button--right">
            <el-button
              type="text"
              size="mini"
              @click="() => removeTeam(data)">
              Remove
            </el-button>
          </div>
          <div class="Content__Button--right">
            <el-button
              type="text"
              size="mini"
              @click="() => showCreateDialog(data)">
              Add
            </el-button>
          </div>
          <TeamEdit :teamForm="data"/>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
  import TeamEdit from '../../components/team/Edit.vue'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    components: {
      TeamEdit
    },
    data() {
      return {
        root: {id:0, parent_id: null, children: []},
        teamData: [],
        search: '',
        createDialog: false,
        teamForm: {
          name: '',
          parent_team_id:''
        },
        teamRule: {
          name: [
            { required: true, message: 'Team name can\'t be blank' },
            { max:25, message: 'Too long'},
            { min:3, message: 'Too short'}
          ]
        }

      }
    },
    computed: {
      ...mapGetters(['teams', 'teamTree', 'teamTreeSelector'])
    },
    created() {
      this.$store.dispatch('getTeams')
    },
    methods: {
      ...mapActions(['createTeam', 'deleteTeam', 'updateTeam', 'getTeams']),
      handleDrop(draggingNode, dropNode, dropType, ev) {
        var node = draggingNode.data
        if (dropType == "inner") {
          node.parent_team_id = dropNode.data.id
        } else if (dropType == "before" || dropType == "after") {
          node.parent_team_id = dropNode.data.parent_team_id
        }

        this.updateTeam(node)
        .then( () => {
          const h = this.$createElement
          this.$notify({
            title: 'Move team',
            message: h('i', { style: 'color: teal' }, 'team ' + node.name + ' was moved'),
            type: 'success'
          })
        })
        .catch(e => {
          const h = this.$createElement
          this.$notify({
            title: 'Move team',
            message: h('i', { style: 'color: red' }, 'something went wrong, the team wasn\'t moved'),
            type: 'error'
          })
          this.getTeams();
          console.log(e)
        })

      },
      filterTree(teamTree) {
        var result = []
        teamTree.forEach( node => {
          if (filterTree(node, this.search)){
            result.push(node)
          }
        })
        return result
        if (this.search == ""){
          return teamTree
        }
        teamTree.forEach( data => {
          if (data.name.toLowerCase().includes(this.search.toLowerCase()))
          {
            result.push(data)
          }
        })
        return result
        //return teamTree.filter(data => !this.search || data.name.toLowerCase().includes(this.search.toLowerCase()))
      },
      displaySearchedName: function(data){
        var name = data.name
        if ( this.search !== undefined && this.search.length > 0) {
          var n = name.toLowerCase().indexOf(this.search.toLowerCase())
          if (n == -1) {
            return name
          }
          name = name.substring(0,n) + "<b>" + name.substring(n,n+this.search.length) +"</b>"+ name.substring(n+this.search.length, name.length)
        }
        return name
      },

      //////////////////////////
      // Team Management //
      //////////////////////////

      showCreateDialog(data) {
        if (data !== undefined) {
          this.teamForm.parent_team_id = data.id
        }
        this.createDialog = true
      },

      handleCreateTeam: function(formName, close) { // Create team
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.createTeam(this.teamForm)
              .then(response => {
                // reset form data
                if (close) {
                  this.$refs[formName].resetFields()
                  this.createDialog = false
                } else {
                  var parent_team_id = this.teamForm.parent_team_id
                  this.$refs[formName].resetFields()
                  this.teamForm.parent_team_id = parent_team_id
                }
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
      handleCancel: function(){
        this.createDialog = false
      },
      append(data) {
        console.log('data: ', data)
      },
      removeTeam(data) {
        this.deleteTeam(data.id).catch(e => {
          console.log(e)
        })
      },
    }
  }

  function filterTree( treeNode, search ) {
    if (treeNode.children === undefined || treeNode.children.length == 0 ){
      return treeNode.name.toLowerCase().includes(search.toLowerCase())
    }
    else {
      var found = false
      treeNode.children.forEach( node => {
        if (filterTree( node, search )) {
          found = true
        }
      })
      return treeNode.name.toLowerCase().includes(search.toLowerCase()) || found;
    }
  }
</script>
