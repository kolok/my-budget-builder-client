<template>
  <div>
    <el-table
      :data="employees"
      class="Content__Table"
      :default-sort="{prop: 'name', order: 'descending'}"
      row-key="id"
      border
      default-collapse-all
      empty-text="No employee..."
    >
      <el-table-column
        label="Employee"
        prop="name"
        sortable
      />
      <el-table-column
        label="Email"
        prop="email"
        sortable
      />
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
    ...mapGetters(['employees'])
  },
  created() {
    this.$store.dispatch('getEmployees').then(() => {
      this.loading = false
    })
  },
  methods: {
    ...mapActions(['deleteEmployee']),
    handleEdit: function(employeeID) {
      this.$router.push('employees/' + employeeID)
    },
    handleDelete: function(employeeID) {
      this.$confirm('Do you really want to delete this Employee?', 'Warning', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(() => {
        this.deleteEmployee(employeeID)
      })
    },
  }
}
</script>
