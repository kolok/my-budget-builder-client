<template>
  <div>
    <score-card :title="$t('Head count')" :count="headcount" :unit="$t('People')"/>
    <el-table
      :data="employees"
      class="Content__Table"
      :default-sort="{prop: 'name', order: 'descending'}"
      row-key="id"
      stripe
      :empty-text="$t('No employee...')"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
        fixed
      >
      </el-table-column>
      <el-table-column
        :label="$t('Employee')"
        prop="name"
        sortable
      />
      <el-table-column
        :label="$t('Email')"
        prop="email"
        sortable
      />
      <el-table-column
        :label="$t('Actions')"
        fixed="right"
        width="120"
      >
        <template slot-scope="scope">
          <employee-actions :employeeID="scope.row.id" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import EmployeeActions from './Actions.vue'
import ScoreCard from '../common/ScoreCard.vue'

export default {
  components: {
    EmployeeActions,
    ScoreCard
  },
  data() {
    return {
      loading: true,
      multipleSelection: [],
    }
  },
  computed: {
    ...mapGetters(['employees']),
    headcount() {
      return this.employees.length;
    }
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
    },
  }
}
</script>
