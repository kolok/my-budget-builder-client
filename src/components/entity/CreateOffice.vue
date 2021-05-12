<template>
  <div class="Content__Card">
    <template>
      <el-card class="Content__Card">
        <div
          slot="header"
          class="Content__CardHeader--italic"
        >
          <span>{{ $t('Create a new Office') }}</span>
        </div>
        <div
          class="Content__CardButtonContainer"
        >
          <el-button
            class="Content__CardButton--CenterBig"
            icon="el-icon-circle-plus-outline"
            type="text"
            @click="handleAddOffice"
          />
        </div>
      </el-card>
    </template>
    <el-dialog
      :title="$t('Create an office')"
      :visible.sync="addOfficeDialog"
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
        <CountrySelect :form="officeForm" />
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleCancel('officeForm')">{{ $t('Cancel') }}</el-button>
        <el-button
          type="primary"
          @click="handleCreateOffice('officeForm')"
        >{{ $t('Save') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CountrySelect from '../form/countrySelect.vue'

export default {
  components: {
    CountrySelect,
  },
  props: {
    entityID: {
      type: String,
      required: true
    },
    countryID: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      officeForm: {
        name:'',
        countryID: this.countryID,
        entityID: this.entityID
      },
      addOfficeDialog: false,
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
    ...mapActions(['createOffice']),
    handleAddOffice: function() {
      // display the form to add an office
      this.addOfficeDialog = true
    },
    handleCreateOffice: function(formName) { // Create office
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.createOffice(this.officeForm)
            .then(() => {
              // reset form data
              this.$refs[formName].resetFields()
              this.addOfficeDialog = false
            })
            .catch(e => {
              console.log(e)
            })
        } else {
          return false
        }
      })
    },
    handleCancel: function(formName){
      this.$refs[formName].resetFields()
      this.addOfficeDialog = false
    }
  }
}
</script>
