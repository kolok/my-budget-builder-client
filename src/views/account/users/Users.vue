<template>
  <div>
    <UserList />
    <UserCreate />
  </div>
</template>

<script>
  import UserList from '../../../components/user/List.vue'
  import UserCreate from '../../../components/user/Create.vue'

  export default {
    components: {
      UserList,
      UserCreate
    }
  }
</script>
