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
        label="Actions"
      >
        <template slot-scope="scope">
          <UserEdit :user-form="scope.row" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import UserEdit from './Edit.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    UserEdit,
  },
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
  }
}
</script>
