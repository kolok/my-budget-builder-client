<template>
  <div>
    <el-table
      :data="employees"
      class="Content__Table"
      :default-sort="{prop: 'name', order: 'descending'}"
      row-key="id"
      stripe
      empty-text="No employee..."
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
        fixed
      >
      </el-table-column>
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
        fixed="right"
        width="120"
      >
        <template slot-scope="scope">
          <employeeActions :employeeID="scope.row.id" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import employeeActions from './Actions.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    employeeActions,
  },
  data() {
    return {
      loading: true,
      multipleSelection: [],
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
    handleSelectionChange: function(val) {
      this.multipleSelection = val
      console.log(val)
    }
  }
}
</script>
