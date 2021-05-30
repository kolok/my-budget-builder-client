<template>
  <div>
    <el-table
      :data="entities"
      :default-sort="{prop: 'name', order: 'descending'}"
      :empty-text="$t('No entity...')"
      class="Content__Table"
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
        :label="$t('Entity')"
        prop="name"
        sortable
      />
      <el-table-column type="expand">
        <template slot-scope="props">
          <ListOffice :entity="props.row" />
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('Taxe rate')"
        sortable
      >
        <template slot-scope="props">
          {{ props.row.taxeRate }} %
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('Country')"
        sortable
      >
        <template slot-scope="props">
          {{ getCountry(props.row.countryID) }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('Currency')"
        sortable
      >
        <template slot-scope="props">
          {{ getCurrency(props.row.defaultCurrencyID) }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('Offices')"
        sortable
      >
        <template slot-scope="props">
          {{ getOfficeNames(props.row.offices) }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('Actions')"
        fixed="right"
        width="120"
      >
        <template slot-scope="scope">
          <EntityEdit :entity-form="scope.row" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import EntityEdit from './Edit.vue'
import ListOffice from './ListOffices.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    EntityEdit,
    ListOffice
  },
  data() {
    return {
      loading: true,
      multipleSelection: [],
    }
  },
  beforeCreate() {
    this.$store.dispatch('getCountries')
  },
  computed: {
    ...mapGetters(['entities'])
  },
  created() {
    this.$store.dispatch('getEntitiesWithOffices').then(() => {
      this.loading = false
    })
  },
  methods: {
    getCountry: function(countryID) {
      if (this.$store.getters.getCountryById(countryID)) {
        return this.$store.getters.getCountryById(countryID).name
      }
    },
    getCurrency: function(currency_id) {
      var currency = this.$store.getters.getCurrencyById(currency_id)
      return currency.name + '( ' + currency.symbol + ' )'
    },
    getOfficeNames: function(offices) {
      return offices.map( office => office.name).join(', ')
    },
    handleSelectionChange: function(val) {
      this.multipleSelection = val
    },
  }
}
</script>
