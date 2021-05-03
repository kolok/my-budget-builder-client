<template>
  <div>
    <div
      v-for="item in entity.offices"
      :key="item.id"
      class="Content__CardContainer--Small"
    >
      <el-card
        class="Content__Card"
      >
        <div
          slot="header"
          class="Content__CardHeader"
        >
          <span>{{ item.name }}</span>
          <EditOffice :office-form="item" />
        </div>
        <div
          class="Card__Body"
        >
          <ul class="Content__List">
            <li class="Content__ListItem">
              {{ item.name }}
            </li>
            <li>{{ item.address }}</li>
            <li>{{ item.zipcode }}&nbsp;{{ item.town }}</li>
          </ul>
        </div>
      </el-card>
    </div>
    <div class="Content__CardContainer--Small">
      <CreateOffice
        :entity-i-d="entity.id"
        :country-i-d="entity.countryID"
      />
    </div>
  </div>
</template>

<script>
import CreateOffice from '../../components/entity/CreateOffice.vue'
import EditOffice from '../../components/entity/EditOffice.vue'

export default {
  components: {
    CreateOffice,
    EditOffice
  },
  props: {
    entity: {
      type: Object,
      required: true
    }
  },
}
</script>
