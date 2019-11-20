<template>
  <div class="Header">
    <div class="Header--Left">
      <div class="Header__LogoContainer">
        <a href="/">
          <img class="Header__Logo" src="/static/images/pipauls-logo.png" />
        </a>
      </div>
    </div>
    <div v-if="isAuthenticated" class="Header--Right">
      <el-dropdown @command="handleClickDropdown">
        <div class="Header__Dorpdown">
          <div>
            <el-avatar size="medium" :src="avatarURL" />
          </div>
          <div>
            <i class="el-icon-arrow-down el-icon--right" />
          </div>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="adminMenuItem in adminMenuItems"
            :key="adminMenuItem.index"
            :command="adminMenuItem.path"
            :icon="adminMenuItem.icon"
            :index="adminMenuItem.index"
          >{{ adminMenuItem.name }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  components: {},
  data() {
    return {
      adminMenuItems: [
        {
          index: "profile",
          name: this.$t("Profile"),
          path: "/profile",
          icon: "el-icon-user"
        },
        {
          index: "account",
          path: "/account",
          name: this.$t("Account"),
          icon: "el-icon-house"
        },
        {
          index: "users",
          path: "/users",
          name: this.$t("Users"),
          icon: "el-icon-user",
          roles: ["admin"]
        },
        {
          index: "logout",
          name: this.$t("Logout"),
          path: "/logout",
          icon: "el-icon-logout"
        }
      ],
      avatarURL:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated"])
  },
  methods: {
    logout: function() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
    },
    handleClickDropdown: function(name) {
      if (name === "/logout") {
        this.logout();
      } else {
        this.$router.push(name);
      }
    }
  }
};
</script>
