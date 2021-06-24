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
    <office-form 
      :title="$t('Create an office')"
      :officeForm="officeForm"
      :displayDialog="addOfficeDialog"
      @submitForm="handleCreateOffice"
      @cancel="handleCancel"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import OfficeForm from './OfficeForm.vue'

export default {
  components: {
    OfficeForm
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
          this.createOffice(this.officeForm)
            .then(() => {
              // reset form data
              this.addOfficeDialog = false
            })
            .catch(e => {
              console.log(e)
            })
    },
    handleCancel: function(formName){
      this.addOfficeDialog = false
    },
  }
}
</script>
