<template>
  <div>
    <el-table
      :data="users"
      class="Content__Table"
      :default-sort="{prop: 'name', order: 'descending'}"
      row-key="id"
      border
      default-collapse-all
      empty-text="No user..."
    >
      <el-table-column
        label="User"
        prop="name"
        sortable
      />
      <el-table-column
        label="Email"
        prop="email"
        sortable
      />
      <el-table-column
        label="Default Language"
        prop="defaultLanguage"
        sortable
      />
      <el-table-column
        label="nb of login"
        prop="loginCount"
        sortable
      />
      <el-table-column
        label="Role"
        sortable
      >
        <template slot-scope="props">
          {{ getRole(props.row.userCompanies) }}
        </template>
      </el-table-column>
      <el-table-column
        label="Actions"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="handleEdit(scope.row.id)"
          >
            Edit
          </el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.row.id)"
          >
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      loading: true,
    }
  },
  computed: {
    ...mapGetters(['users'])
  },
  created() {
    this.$store.dispatch('getUsers').then(() => {
      this.loading = false
    })
  },
  methods: {
    ...mapActions(['deleteUser']),
    getRole: function(userCompanies) {
      return userCompanies[0].role
    },
    handleEdit: function(userID) {
      this.$router.push('users/' + userID)
    },
    handleDelete: function(userID) {
      this.$confirm('Do you really want to delete this User?', 'Warning', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(() => {
        this.deleteUser(userID)
      })
    },
  }
}
</script>
