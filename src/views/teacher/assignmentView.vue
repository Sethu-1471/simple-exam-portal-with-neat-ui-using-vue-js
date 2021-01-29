<template>
  <div>
    <v-banner single-line>
      Assignment
      <template v-slot:actions>
        <v-btn color="red" class="white--text" @click="$router.go(-1)">
          back
        </v-btn>
      </template>
    </v-banner>
    <v-layout row wrap mt-5>
      <v-flex xs12 md3 pa-5>
        <v-card class="mx-auto elevation-0" max-width="95%" v-if="task" flat>
          <v-img
            class="white--text align-end"
            max-width="1280"
            :src="task.image"
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
          <v-card-title style="color: #4527A0;"> {{ task.name }} </v-card-title>
          <v-card-subtitle class="pb-0"> {{ task.end }} </v-card-subtitle>
          <v-card-text class="text--primary">
            <div class="myText">
              {{ task.desc }}
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="#4527A0" small v-if="task.student">
              Student Completed - {{ task.student.length }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 md8 pa-5>
        <div class="mb-3 ml-3"><span class="myHeading">Submitted Assignment</span></div>
        <v-layout align-start justify-start row wrap v-if="task">
          <v-flex v-for="(i, j) in task.student" :key="j" xs12 md4 pa-2>
            <v-card max-width="90%" class="mx-auto elevation-1 " @click="open(i)">
              <v-img :src="i.image" height="200px"></v-img>
              <v-card-subtitle> Assigned Mark - {{ i.mark }} </v-card-subtitle>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <v-dialog v-model="dialog" persistent max-width="90%">
      <v-card v-if="dialog">
        <v-card-title class="headline">
          Assignment Photo Of Student
        </v-card-title>
        <v-card-text>
          <v-img :src="single.image" class="mx-auto" width="60%"></v-img>
          <v-text-field
            color="deep-purple darken-4"
            label="Mark"
            v-model="mark"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn color="deep-purple darken-4" text @click="update">
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    task: null,
    dialog: false,
    single: null,
    mark: null,
  }),
  mounted() {
    let task = JSON.parse(localStorage.getItem("task"));
    task.forEach((e) => {
      if (e.id == this.$router.currentRoute.params.id) {
        this.task = e;
      }
    });
  },
  methods: {
    open(value) {
      this.single = value;
      this.mark = value.mark;
      this.dialog = true;
    },
    update() {
      if (this.mark <= 10 && this.mark >= 0) {
        let task = JSON.parse(localStorage.getItem("task"));
        task[this.$router.currentRoute.params.id].student[
          this.single.id
        ].mark = this.mark;
        localStorage.setItem("task", JSON.stringify(task));
        this.dialog = false;
        this.$vToastify.success("Mark Assigned");
        task.forEach((e) => {
          if (e.id == this.$router.currentRoute.params.id) {
            this.task = e;
          }
        });
      } else {
        this.$vToastify.error("Mark Assigned should be 0 to 10");
      }
    },
  },
};
</script>

<style scoped>
.myHeading {
  font-family: "Raleway", sans-serif !important;
  color: #4527a0 !important;
  font-weight: 600 !important;
  font-size: 20px;
  text-transform: uppercase !important;
  line-height: 1.2em;
}
</style>
