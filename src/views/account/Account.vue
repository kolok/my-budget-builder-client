<template>
  <div>
    <div v-if="userCompanyExists">
      <el-tabs v-model="activeName">
        <el-tab-pane
          :label="$t('Company')"
          name="company"
        >
          <CompanyEdit :id="getCurrentCompany.id" />
        </el-tab-pane>
        <el-tab-pane
          :label="$t('Entities & Offices')"
          name="entities"
        >
          <EntityList />
          <EntityCreate />
        </el-tab-pane>
        <el-tab-pane
          :label="$t('Teams')"
          name="teams"
        >
          <TeamTree />
        </el-tab-pane>
      </el-tabs>
    </div>
    <div v-else>
      <h1 class="Content__Head1">
        {{ $t('Oops ! Something went wrong') }}
      </h1>
      {{ $t('you need to associated to at least one company') }}
    </div>
  </div>
</template>

<script>
import CompanyEdit from '../../components/company/Edit.vue'
import EntityList from '../../components/entity/List.vue'
import EntityCreate from '../../components/entity/Create.vue'
import TeamTree from '../../components/team/Tree.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    CompanyEdit,
    EntityList,
    EntityCreate,
    TeamTree,
  },
  props: {
    activeRedirect: {
      type: String,
      default: 'company'
    }
  },
  data() {
    console.log(this.activeRedirect)
    return {
      activeName: this.activeRedirect
    }
  },
  computed: {
    ...mapGetters(['getCurrentCompany']),
    userCompanyExists: function() {
      return !this.getCurrentCompany || this.getCurrentCompany.id !== undefined
    }
  }
}
</script>
