<template>
  <div class="Content__BorderedForm">
    <div 
      class='Content__ColumnForm'
      v-for="(position, counter) in positionsForm"
      v-bind:key="counter">
      <div style="width:40%">
      <el-form-item prop="position" :label="$t('Position')">
        <el-input v-model="position.name" autocomplete="off" />
      </el-form-item>

      </div>
      <div style="width:35%">
      <TeamSelect :myForm="position" prop="teamID" :label="$t('Team')" />

      </div>
      <div style="width:20%">
      <el-form-item prop="position" :label="$t('Part-time')">
        <el-input v-model="position.parttime" autocomplete="off" />
      </el-form-item>
      </div>
      <div style="width:5%;float:right;padding:5px;">
        <mini-delete-button :actionFunc="deletePosition" :count="counter" style="float:right;"/>
      </div>
  </div>
  <div style="padding-left:20px;">
    <el-button type="primary" @click="addPosition">{{ $t('Add position') }}</el-button>
  </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import TeamSelect from "../form/teamSelect.vue";
  import MiniDeleteButton from "../button/miniDelete.vue";

  export default {
    components: {
      MiniDeleteButton,
      TeamSelect
    },
    props: {
      positionsForm: {
        type: Array,
        required: false
      }
    },
    computed: {
      ...mapGetters(["teamTreeSelector"])
    },
    created() {
      this.$store.dispatch("getTeams");
    },
    methods: {
      addPosition(){
        this.positionsForm.push({
          name:'',
          teamID: 0
        })
      },
      deletePosition(counter){
        this.positionsForm.splice(counter,1);
      }
    }
  };
</script>
