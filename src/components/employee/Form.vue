<template>
  <div>
    <el-form
      ref="employeeForm"
      :model="employeeForm"
      :rules="employeeRule"
      label-width="120px"
    >
      <div class="Content__ColumnForm">
        <div class="Content__ColumnForm1o2">
          <el-form-item
            prop="name"
            :label="$t('Employee or Open Position')"
            label-width="200px"
          >
            <el-input
              v-model="employeeForm.name"
              autocomplete="off"
            />
          </el-form-item>
          <OfficeSelect
            :my-form="employeeForm"
            prop="officeID"
          />
          <div class="Content__FormLink--Right">
            <a @click="redirectToEntitiesOffices">{{ $t('Manage Entities and Offices') }}</a>
          </div>
          <div class="Content__ColumnForm1o2Column">
            <el-form-item 
              prop="payroll" 
              :label="$t('Annual Payroll')" 
              class="Content__ColumnForm1o2Column1o2"
            >
              <el-input-number
                v-model="employeeForm.payroll"
                :controls="false"
                style="width:100%"
              />
            </el-form-item>
            <el-form-item
              prop="bonus" 
              :label="$t('Annual Bonus')"
              class="Content__ColumnForm1o2Column1o2"
            >
              <el-input-number
                v-model="employeeForm.bonus"
                :controls="false"
                style="width:100%"
              />
            </el-form-item>
          </div>
        </div>
        <div class="Content__ColumnForm1o2">
          <email-form-item
            :my-form="employeeForm"
            :required="false"
          />
          <div class="Content__ColumnForm1o2Column">
            <my-date
              class="Content__ColumnForm1o2Column1o2"
              :my-form="employeeForm"
              prop="startDate"
              :label="$t('Start date')"
            />
            <my-date
              class="Content__ColumnForm1o2Column1o2"
              :my-form="employeeForm"
              prop="endDate"
              :label="$t('End date')"
            />
          </div>
          <div class="Content__ColumnForm1o2Column">
            <my-date
              class="Content__ColumnForm1o2Column1o2"
              :my-form="employeeForm"
              prop="birthDate"
              :label="$t('Birth date')"
            />
          </div>
        </div>
      </div>


      <PositionsForm :employee-form="employeeForm" />

      <div class="Content__ColumnForm">
        <div class="Content__ColumnForm1o2">
          <div />

          <span slot="footer">
            <el-button @click="handleCancel('employeeForm')">{{ $t('Cancel') }}</el-button>
            <el-button
              type="primary"
              @click="submitForm('employeeForm')"
            >{{ $t('Save') }}</el-button>
          </span>
        </div>
        <div class="Content__ColumnForm1o2" />
      </div>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MyDate from '../form/date.vue'
import OfficeSelect from '../form/officeSelect.vue'
import PositionsForm from '../position/PositionsForm.vue'
import EmailFormItem from '../../components/form/email.vue'

export default {
  components: {
    MyDate,
    OfficeSelect,
    EmailFormItem,
    PositionsForm
  },
  props: {
    budgetID: {
      type: String,
      required: false,
      default: ''
    },
    employeeForm: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      employeeRule: {
        name: [
          { required: true, message: this.$t('Employee name can\'t be blank') },
          { max: 255, message: this.$t('Too long') }
        ],
        officeID: [
          { required: true, message: this.$t('Office is required') },
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['offices', 'teamTreeSelector'])
  },
  created() {
    this.$store.dispatch('getTeams')
  },
  methods: {
    submitForm: function(formName) {
      this.employeeForm.budgetID = this.budgetID
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit('submitForm')
        } else {
          return false
        }
      })
    },
    handleCancel: function() {
      this.$emit('cancel')
    },
    redirectToEntitiesOffices: function() {
      this.$router.push({ name: 'Account', params: {  activeRedirect: 'entities' } })
    },
  }
}
</script>
