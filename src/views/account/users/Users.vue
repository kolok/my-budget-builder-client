<template>
  <div>
    <UserList />
    <UserCreateButton />
  </div>
</template>

<script>
  import UserList from '../../../components/user/List.vue'
  import UserCreateButton from '../../../components/user/CreateButton.vue'

  export default {
    components: {
      UserList,
      UserCreateButton
    }
  }
</script>
