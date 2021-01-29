<template>
  <div>
    <center>
      <div class="my-5">
        <span class="myHeadingBolder">Welcome</span>
        <span class="myHeadingLinear"> {{ name }} </span>
      </div>
    </center>
    <v-container class="border pa-4">
      <v-layout wrap v-if="!loading">
        <v-flex md4 xs12 v-for="i in 3" :key="i" my-2>
          <v-skeleton-loader
            class="mx-auto"
            max-width="300"
            type="card"
          ></v-skeleton-loader>
        </v-flex>
      </v-layout>

      <v-layout wrap v-else>
        <v-flex xs12 md4 v-for="(list, i) in lists" :key="i" px-2>
          <v-card
            class="mx-auto elevation-2"
            max-width="95%"
            v-show="list.user === name || list.user === 'all'"
          >
            <v-img
              class="white--text align-end"
              max-width="1280"
              :src="list.image"
            >
              <template v-slot:placeholder>
                <v-layout align-center justify-center fill-height>
                  <v-progress-circular
                    indeterminate
                    color="#EB5310"
                  ></v-progress-circular>
                </v-layout>
              </template>
            </v-img>
            <v-card-title style="color: #4527A0;">
              {{ list.name }}
            </v-card-title>
            <v-card-subtitle class="pb-0"> {{ list.level }} </v-card-subtitle>
            <v-card-text class="text--primary">
              <div class="myText">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere
                voluptates blanditiis ipsa incidunt aliquid odio obcaecati
                corrupti consequatur optio assumenda eius omnis velit
                consequuntur libero, soluta sit dolore nobis ullam!
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="#4527A0"
                class="white--text"
                small
                @click="
                  name == 'student'
                    ? $router.push('/stduent/assignment')
                    : $router.push('/teacher/assignment')
                "
              >
                Assignment
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import poster from "../assets/poster.png";
export default {
  components: {},
  data() {
    return {
      name: null,
      loading: true,
      lists: [
        {
          name: "Image Editing Bootcamp",
          level: "Easy",
          image: poster,
          user: "all",
        },
        {
          name: "Image Editing Bootcamp",
          level: "Intermediate",
          image: poster,
          user: "staff",
        },
        {
          name: "Image Editing Bootcamp",
          level: "Hard",
          image: poster,
          user: "staff",
        },
      ],
    };
  },
  mounted() {
    document.title = "examly | Home";
    this.name = localStorage.getItem("name");
  },
  methods: {},
};
</script>
