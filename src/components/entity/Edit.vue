<template>
  <div>
    <mini-edit-button :actionFunc="displayAddDialog" />
    <mini-delete-button :actionFunc="handleDelete" />
    <el-dialog :title="$t('Update entity')" :visible.sync="addDialog" :modalAppendToBody="false">
      <el-form
        ref="entityForm"
        :model="entityForm"
        :rules="entityRule"
        label-width="250px"
        class="Dialog__Form"
      >
        <el-form-item prop="name" :label="$t('Entity')">
          <el-input v-model="entityForm.name" autocomplete="off" />
        </el-form-item>
        <CountrySelect :form="entityForm" />
        <CurrencySelect :form="entityForm" />
      </el-form>
      <span slot="footer">
        <el-button @click="handleCancel('entityForm')">{{ $t('Cancel') }}</el-button>
        <el-button type="primary" @click="handleEdit('entityForm')">{{ $t('Save') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CountrySelect from "../form/countrySelect.vue";
import CurrencySelect from "../form/currencySelect.vue";
import MiniEditButton from "../button/miniEdit.vue";
import MiniDeleteButton from "../button/miniDelete.vue";

export default {
  components: {
    CountrySelect,
    CurrencySelect,
    MiniEditButton,
    MiniDeleteButton
  },
  props: {
    entityForm: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      addDialog: false,
      entityRule: {
        name: [
          { required: true, message: this.$t("Entity name can't be blank") },
          { max: 25, message: this.$t("Too long") },
          { min: 3, message: this.$t("Too short") }
        ],
        countryID: [
          { required: true, message: this.$t("A country should be selected") }
        ],
        defaultCurrencyID: [
          { required: true, message: this.$t("A currency should be selected") }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["currencies", "countries"])
  },
  methods: {
    ...mapActions(["updateEntity", "deleteEntity"]),
    /*eslint no-unused-vars: ["error", { "args": "none" }]*/
    handleEdit: function(formName) {
      // Create entity
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.updateEntity(this.entityForm)
            .then(response => {
              this.addDialog = false;
            })
            .catch(e => {
              console.log(e);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleCancel: function(formName) {
      this.$refs[formName].resetFields();
      this.addDialog = false;
    },
    handleDelete() {
      this.$confirm(
        this.$t("Do you really want to delete this Entity?"),
        this.$t("Warning"),
        {
          confirmButtonText: this.$t("Yes"),
          cancelButtonText: this.$t("No"),
          type: "warning"
        }
      ).then(() => {
        this.deleteEntity(this.entityForm.id);
      });
    },
    displayAddDialog() {
      this.addDialog = true;
    }
  }
};
</script>
