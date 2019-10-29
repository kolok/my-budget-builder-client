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
          <div class="Content__ButtonContainer">
            <el-button
              class="Content__Button"
              type="text"
              icon="el-icon-delete"
              @click="handleDeleteOffice(item)"
            />
          </div>
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
import { mapActions } from 'vuex'

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
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {
    ...mapActions(['deleteOffice']),
    handleDeleteOffice(office) {
      this.$confirm(this.$t('Do you really want to delete this Office?'), this.$t('Warning'), {
        confirmButtonText: this.$t('Yes'),
        cancelButtonText: this.$t('No'),
        type: 'warning'
      }).then(() => {
        this.deleteOffice(office.id)
      })
    }
  }
}
</script>
