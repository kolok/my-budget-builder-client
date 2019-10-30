<template>
  <div>
    <el-input v-model="search" class="Content__Input--Search" :placeholder="$t<('Type to search')" />
    <div style="display:flex;align-items:center;">
      <mini-add-button :actionFunc="showCreateDialog" />
      <el-button
        type="text"
        size="mini"
        style="font-size:14px"
        @click="showCreateDialog()"
      >{{ $t('Add a root team') }}</el-button>
    </div>

    <el-dialog :title="$t('Create a new team')" :visible.sync="createDialog">
      <team-form :teamForm="teamForm" @cancel="handleCancel" @submitForm="handleCreateTeam" />
    </el-dialog>

    <el-tree
      :data="filterTree(teamTree)"
      node-key="id"
      default-expand-all
      draggable
      :expand-on-click-node="false"
      @node-drop="handleDrop"
    >
      <span slot-scope="{ node, data }" class="Content__TreeNode">
        <span
          :class="data.search"
          v-html="displaySearchedName(data)"
        >{{ displaySearchedName(data) }}</span>
        <span>
          <div
            class="Content__TreeButton"
            style="display:flex;justify-content:flex-end;align-items:center;"
          >
            <team-actions :teamForm="data" @showCreateDialog="showCreateDialog" />
          </div>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import MiniAddButton from "../button/miniAdd.vue";
import TeamActions from "./Actions.vue";
import TeamForm from "./Form.vue";

export default {
  components: {
    MiniAddButton,
    TeamActions,
    TeamForm,
  },
  data() {
    return {
      root: { id: 0, parent_id: null, children: [] },
      teamData: [],
      search: "",
      createDialog: false,
      teamForm: {
        name: "",
        parentTeamID: ""
      },
      teamRule: {
        name: [
          { required: true, message: "Team name can't be blank" },
          { max: 25, message: "Too long" },
          { min: 3, message: "Too short" }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["teams", "teamTree", "teamTreeSelector"])
  },
  created() {
    this.$store.dispatch("getTeams");
  },
  methods: {
    ...mapActions(["createTeam", "deleteTeam", "updateTeam", "getTeams"]),
    handleDrop(draggingNode, dropNode, dropType) {
      var node = draggingNode.data;
      if (dropType == "inner") {
        node.parentTeamID = dropNode.data.id;
      } else if (dropType == "before" || dropType == "after") {
        node.parentTeamID = dropNode.data.parentTeamID;
      }

      this.updateTeam(node)
        .then(() => {
          const h = this.$createElement;
          this.$notify({
            title: "Move team",
            message: h(
              "i",
              { style: "color: teal" },
              "team " + node.name + " was moved"
            ),
            type: "success"
          });
        })
        .catch(e => {
          const h = this.$createElement;
          this.$notify({
            title: "Move team",
            message: h(
              "i",
              { style: "color: red" },
              "something went wrong, the team wasn't moved"
            ),
            type: "error"
          });
          this.getTeams();
          console.log(e);
        });
    },
    filterTree(teamTree) {
      var result = [];
      teamTree.forEach(node => {
        if (filterTree(node, this.search)) {
          result.push(node);
        }
      });
      return result;
    },
    displaySearchedName: function(data) {
      var name = data.name;
      if (this.search !== undefined && this.search.length > 0) {
        var n = name.toLowerCase().indexOf(this.search.toLowerCase());
        if (n == -1) {
          return name;
        }
        name =
          name.substring(0, n) +
          "<b>" +
          name.substring(n, n + this.search.length) +
          "</b>" +
          name.substring(n + this.search.length, name.length);
      }
      return name;
    },

    /*
     * Team Management
     */

    showCreateDialog(parentTeamID) {
            console.log('showCreateDialog', parentTeamID)

      if (parentTeamID !== undefined) {
        this.teamForm.parentTeamID = parentTeamID;
      }
      this.createDialog = true;
    },

    handleCreateTeam: function(dialogToClose) {
      // Create team
      this.createTeam(this.teamForm)
        .then(() => {
          // reset form data
          if (dialogToClose) {
            //this.$refs["teamForm"].resetFields();
            this.createDialog = false;
            this.teamForm.name = ""
            this.teamForm.parentTeamID = "";
          } else {
            var parentTeamID = this.teamForm.parentTeamID;
            //this.$refs["teamForm"].resetFields();
            this.teamForm.name = ""
            this.teamForm.parentTeamID = parentTeamID;
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    handleCancel: function() {
      this.createDialog = false;
    },
    append(data) {
      console.log("data: ", data);
    },
  }
};

function filterTree(treeNode, search) {
  if (treeNode.children === undefined || treeNode.children.length == 0) {
    return treeNode.name.toLowerCase().includes(search.toLowerCase());
  } else {
    var found = false;
    treeNode.children.forEach(node => {
      if (filterTree(node, search)) {
        found = true;
      }
    });
    return treeNode.name.toLowerCase().includes(search.toLowerCase()) || found;
  }
}
</script>

<style>
.el-tree-node__content {
  margin-top: 5px !important;
  margin-bottom: 5px !important;
}
</style>