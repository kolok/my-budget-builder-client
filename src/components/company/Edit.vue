<template>
  <div class="Content__FormContainer">
    <el-form
      ref="companyForm"
      class="Content__Form"
      :model="companyForm"
      label-position="top"
      label-width="auto"
    >
      <el-form-item :label="$t('Company name')">
        <el-input v-model="companyForm.name" />
      </el-form-item>

      <el-form-item
        prop="subdomain"
        :label="$t('Subdomain')"
      >
        <el-input
          v-model="companyForm.subdomain"
          :placeholder="$t('Subdomain')"
          :disabled="true"
        >
          <template slot="append">
            .pipauls.com
          </template>
        </el-input>
      </el-form-item>

      <el-form-item :label="$t('Fiscal year start month')">
        <el-select
          v-model="companyForm.firstMonthFiscalYear"
          :placeholder="$t('Select')"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <currency-select :form="companyForm" />

      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
        >
          {{ $t('Save') }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CompanyResource from '../../api/company.service'
import CurrencySelect from '../form/currencySelect.vue'

export default {
  components: {
    CurrencySelect
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      companyForm: {},
      options: [
        {
          value: '1',
          label: this.$t('January')
        },
        {
          value: '2',
          label: this.$t('February')
        },
        {
          value: '3',
          label: this.$t('March')
        },
        {
          value: '4',
          label: this.$t('April')
        },
        {
          value: '5',
          label: this.$t('May')
        },
        {
          value: '6',
          label: this.$t('June')
        },
        {
          value: '7',
          label: this.$t('July')
        },
        {
          value: '8',
          label: this.$t('August')
        },
        {
          value: '9',
          label: this.$t('September')
        },
        {
          value: '10',
          label: this.$t('October')
        },
        {
          value: '11',
          label: this.$t('November')
        },
        {
          value: '12',
          label: this.$t('December')
        }
      ],
      value: ''
    }
  },
  computed: {
    ...mapGetters(['currencies'])
  },
  beforeMount() {
    this.getCompany()
  },
  created() {
    this.$store.dispatch('getCurrencies')
  },
  methods: {
    ...mapActions(['updateCompany']),

    getCompany: function() {
      CompanyResource.get(this.id)
        .then(response => {
          this.companyForm = response.data
        })
        .catch(err => {
          this.$Message.error(err.message)
        })
    },
    onSubmit: function() {
      let payload = { _id: this.id, content: this.companyForm }
      this.updateCompany(payload)
        .then(() => {
          this.$cs({
            title: this.$t('Company update'),
            h: this.$createElement,
            message: this.$t('company {name} was updated', {
              name: this.companyForm.name
            }),
            type: 'success'
          })
        })
        .catch(e => {
          this.$cs({
            title: this.$t('Company update'),
            h: this.$createElement,
            message: this.$t(
              'Something went wrong! the company wasn\'t updated'
            ),
            type: 'error'
          })
          console.log(e)
        })
    }
  }
}
</script>
