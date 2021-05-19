<template>
  <el-form-item
    :label="label"
    prop="prop"
  >
    <el-cascader
      v-model="myForm[prop]"
      :options="getTeamTreeSelector"
      :props="{ checkStrictly: true }"
      :placeholder="$t('Select a team')"
      style="width: 100%;"
      clearable
    />
  </el-form-item>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    myForm: {
      type: Object,
      required: true
    },
    prop: {
      type: String,
      default: 'teamID'
    },
    label: {
      type: String,
      default: () => 'Team'
    }
  },
  computed: {
    ...mapGetters(['teamTreeSelector']),
    getTeamTreeSelector: function() {
      if (this.myForm.id !== undefined) {
        console.log('deactivate ', this.myForm.id)
      }
      return this.teamTreeSelector
    }
  },
  created() {
    this.$store.dispatch('getTeams')
  }
}
</script>
