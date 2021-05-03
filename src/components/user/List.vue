<template>
  <div>
    <el-table
      :data="users"
      :default-sort="{prop: 'name', order: 'descending'}"
      class="Content__Table"
      empty-text="No user..."
      row-key="id"
      stripe
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        fixed
        type="selection"
        width="55"
      />
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
        label="Language"
        prop="defaultLanguage"
        sortable
      />
      <el-table-column
        label="Nb of login"
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
        :label="$t('Actions')"
        fixed="right"
        width="120"
      >
        <template slot-scope="scope">
          <user-actions :user-i-d="scope.row.id" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserActions from './Actions.vue'

export default {
  components: {
    UserActions,
  },
  data() {
    return {
      loading: true,
      multipleSelection: [],
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
    getRole: function(userCompanies) {
      if (userCompanies === undefined)
      {
        return ''
      }
      switch (userCompanies[0].role) {
      case 'client_admin': 
        return 'Administrator'
      default: 
        return 'Client user'
      }
    },
    handleSelectionChange: function(val) {
      this.multipleSelection = val
      console.log(val)
    },
  }
}
</script>
