<template>
  <div class="Content__BorderedForm">
    <div 
      v-for="(item, index) in employeeForm.positions" 
      :key="index" 
      class="Content__ColumnForm"
    >
      <div style="width:40%">
        <el-form-item 
          :label="$t('Position')" 
          :prop="'positions.' + index + '.name'"
          :rules="positionRules"
        >
          <el-input v-model="item.name" />
        </el-form-item>
      </div>
      <div style="width:35%">
        <el-form-item
          :label="$t('Team')"
          :prop="'positions.' + index + '.teamID'"
          :rules="teamRules"
        >
          <el-cascader
            v-model="item.teamID"
            :options="teamTreeSelector"
            :props="{ checkStrictly: true }"
            :placeholder="$t('Select a team')"
            style="width: 100%;"
            clearable
          />
        </el-form-item>
        <div class="Content__FormLink--Right">
          <a @click="redirectToTeams">{{ $t('Manage Teams') }}</a>
        </div>
      </div>
      <div style="width:20%">
        <el-form-item
          :prop="'positions.' + index + '.parttime'"
          :label="$t('Part-time')"
          :rules="positionRules"
        >
          <el-input
            v-model="item.parttime"
            autocomplete="off"
          />
        </el-form-item>
      </div>

      <div style="width:5%;float:right;padding:5px;">
        <mini-delete-button
          :action-func="deletePosition"
          :count="counter"
          style="float:right;"
        />
      </div>
    </div>
    <div style="padding-left:20px;">
      <el-button
        type="primary"
        @click="addPosition"
      >
        {{ $t('Add position') }}
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MiniDeleteButton from '../button/miniDelete.vue'

export default {
  components: {
    MiniDeleteButton,
  },
  props: {
    employeeForm: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      positionRules: [{required: true, message: 'position is required', trigger: 'blur'}],
      teamRules: [{required: true, message: 'team is required', trigger: 'blur'}],
      parttimeRules: [{required: true, message: 'parttime is required', trigger: 'blur'}]
    }
  },
  computed: {
    ...mapGetters(['teamTreeSelector'])
  },
  created() {
    this.$store.dispatch('getTeams')
  },
  methods: {
    addPosition(){
      this.employeeForm.positions.push({
        name:'',
        teamID: '',
        parttime: 0
      })
    },
    deletePosition(counter){
      this.employeeForm.positions.splice(counter,1)
    },
    redirectToTeams: function() {
      this.$router.push({ name: 'Account', params: {  activeRedirect: 'teams' } })
    }
  }
}
</script>
