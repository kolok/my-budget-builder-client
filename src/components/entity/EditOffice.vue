<template>
  <div>
    <el-button
      type="text"
      icon="el-icon-edit"
      @click="handleEditOffice"
    />
    <el-button
      icon="el-icon-delete"
      type="text"
      @click="handleDeleteOffice()"
    />
    <office-form 
      :title="$t('Edit the office')"
      :officeForm="officeForm"
      :displayDialog="editOfficeDialog"
      @submitForm="handleUpdateOffice"
      @cancel="handleCancel"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CountrySelect from '../form/countrySelect.vue'
import OfficeForm from './OfficeForm.vue'

export default {
  components: {
    CountrySelect,
    OfficeForm
  },
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
          { max: 25, message: this.$t('Too long') },
          { min: 3, message: this.$t('Too short') }
        ],
        address: [
          { required: true, message: this.$t('Address can\'t be blank') },
          { max: 25, message: this.$t('Too long') },
          { min: 3, message: this.$t('Too short') }
        ],
        zipcode: [
          { required: true, message: this.$t('Zipcode can\'t be blank') },
          { max: 25, message: this.$t('Too long') },
          { min: 3, message: this.$t('Too short') }
        ],
        town: [
          { required: true, message: this.$t('Town can\'t be blank') },
          { max: 25, message: this.$t('Too long') },
          { min: 3, message: this.$t('Too short') }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['countries'])
  },
  methods: {
    ...mapActions(['updateOffice', 'deleteOffice']),

    handleEditOffice() {
      // display the form to edit an office
      this.editOfficeDialog = true
    },
    handleUpdateOffice: function(formName) {
      // Create office
      this.updateOffice(this.officeForm)
        .then(() => {
          this.editOfficeDialog = false
        })
        .catch(e => {
          console.log(e)
        })
    },
    handleCancel: function(formName) {
      this.editOfficeDialog = false
    },
    handleDeleteOffice() {
      this.$confirm(this.$t('Do you really want to delete this Office?'), this.$t('Warning'), {
        confirmButtonText: this.$t('Yes'),
        cancelButtonText: this.$t('No'),
        type: 'warning'
      }).then(() => {
        this.deleteOffice(this.officeForm.id)
      })
    },

  }
}
</script>
