<template>
  <div class="Content__ButtonContainer">
    <el-button
      class="Content__Button"
      type="text"
      icon="el-icon-edit"
      @click="handleEditOffice"
    />

    <el-dialog
      :title="$t('Edit the office')"
      :visible.sync="editOfficeDialog"
    >
      <el-form
        ref="officeForm"
        :model="officeForm"
        :rules="officeRule"
        label-width="250px"
        class="Dialog__Form"
      >
        <el-form-item
          prop="name"
          :label="$t('Office')"
        >
          <el-input
            v-model="officeForm.name"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          prop="address"
          :label="$t('Address')"
        >
          <el-input
            v-model="officeForm.address"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          prop="zipcode"
          :label="$t('Zipcode')"
        >
          <el-input
            v-model="officeForm.zipcode"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          prop="town"
          :label="$t('Town')"
        >
          <el-input
            v-model="officeForm.town"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          :label="$t('Country')"
          prop="countryID"
        >
          <el-select
            v-model="officeForm.countryID"
            :placeholder="$t('Select a country')"
            filterable
          >
            <el-option
              v-for="country in countries"
              :key="country.id"
              :label="country.name"
              :value="country.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleCancel('officeForm')">{{ $t('Cancel') }}</el-button>
        <el-button
          type="primary"
          @click="handleUpdateOffice('officeForm')"
        >{{ $t('Save') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    officeForm: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editOfficeDialog: false,
      officeRule: {
        name: [
          { required: true, message: this.$t('Office name can\'t be blank') },
          { max:25, message: this.$t('Too long')},
          { min:3, message: this.$t('Too short')}
        ],
        address: [
          { required: true, message: this.$t('Address can\'t be blank') },
          { max:25, message: this.$t('Too long')},
          { min:3, message: this.$t('Too short')}
        ],
        zipcode: [
          { required: true, message: this.$t('Zipcode can\'t be blank') },
          { max:25, message: this.$t('Too long')},
          { min:3, message: this.$t('Too short')}
        ],
        town: [
          { required: true, message: this.$t('Town can\'t be blank') },
          { max:25, message: this.$t('Too long')},
          { min:3, message: this.$t('Too short')}
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['countries'])
  },
  methods: {
    ...mapActions(['updateOffice']),
    handleEditOffice() {
      // display the form to edit an office
      this.editOfficeDialog = true
    },
    handleUpdateOffice: function(formName) { // Create office
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updateOffice(this.officeForm)
            .then(() => {
              this.editOfficeDialog = false
            })
            .catch(e => {
              console.log(e)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleCancel: function(formName){
      this.$refs[formName].resetFields()
      this.editOfficeDialog = false
    }
  }
}
</script>
