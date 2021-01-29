<template>
  <v-app>
    <v-app-bar
      app
      dark
      height="70"
      class="sidecut hidden-sm-and-down"
      v-if="$router.currentRoute.name !== 'Home'"
    >
      <div class="d-flex align-center header" @click="$router.push('/')">
        examly
      </div>
      <v-spacer></v-spacer>

      <v-btn text @click="$router.push('/home')">
        Home
      </v-btn>

      <v-btn class="hidden-sm-and-down" text @click="logout">
        Logout
      </v-btn>
    </v-app-bar>
    <v-app-bar
      app
      dark
      height="68"
      color="#4527A0"
      class="hidden-md-and-up"
      v-if="$router.currentRoute.name !== 'Home'"
    >
      <div
        class="d-flex align-center header white--text"
        @click="$router.push('/')"
      >
        examly
      </div>
      <v-spacer></v-spacer>
      <v-btn @click.stop="drawer = !drawer" icon>
        <v-icon size="24px">mdi-tune</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" fixed temporary>
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Welcome {{ name }} </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item @click="$router.push('/home')">
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="logout">
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>

    <v-footer padless v-if="$router.currentRoute.name !== 'Home'" class="mt-5">
      <v-card width="100%" class="white grey--text text-center elevation-12">
        <v-card-text>
          <a
            :href="icon.link"
            style="text-decoration: none;"
            v-for="(icon, j) in icons"
            :key="j"
            target="_blank"
          >
            <v-btn class="grey--text" icon>
              <v-icon size="24px">{{ icon.icon }}</v-icon>
            </v-btn>
          </a>
        </v-card-text>

        <v-card-text class="grey--text pt-0">
          examly Event Management Portal
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text class="grey--text">
          &#169; Copyright {{ new Date().getFullYear() }} -
          <strong>examly</strong> | Developed with ❤️
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    name: null,
    drawer: false,
    icons: [
      {
        icon: "mdi-facebook",
        link: "",
      },
      {
        icon: "mdi-twitter",
        link: "",
      },
      {
        icon: "mdi-linkedin",
        link: "",
      },
      {
        icon: "mdi-instagram",
        link: "",
      },
      {
        icon: "mdi-email",
        link: "mailto:",
      },
    ],
  }),
  updated() {
    this.name = localStorage.getItem("name");
  },
  mounted() {},
  methods: {
    logout() {
      localStorage.removeItem("name");
      this.$vToastify.success("Logged Out");
      this.$router.push("/");
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@200&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Hanalei+Fill&display=swap");

.body {
  font-family: "Nunito", sans-serif;
}

.header {
  font-family: "Hanalei Fill", cursive;
  font-size: 35px;
  letter-spacing: 1px;
  color: #311b92;
}

.sidecut {
  background-image: -webkit-linear-gradient(150deg, #311b92 65%, white 25%);
  height: 100%;
  width: 100%;
}

.myHeadingBolder {
  font-family: "Raleway", sans-serif;
  font-weight: 800 !important;
  font-size: 33px;
  text-transform: uppercase !important;
  line-height: 1.2em;
}

.myHeadingLinear {
  font-family: "Raleway", sans-serif !important;
  color: #4527a0 !important;
  font-weight: 100 !important;
  font-size: 28px;
  text-transform: uppercase !important;
  line-height: 1.2em;
}

/* .border {
  border: 1px solid rgb(182, 177, 177);
  border-radius: 5px;
} */
</style>
