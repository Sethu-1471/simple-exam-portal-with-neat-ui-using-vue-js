<template>
<div>
    <v-banner single-line>
        Assignment
        <template v-slot:actions>
            <v-btn color="red" class="white--text" @click="$router.go(-1)">
                back
            </v-btn>
            <v-btn color="deep-purple darken-3" class="white--text" @click="submit" v-if="file">
                Submit
            </v-btn>
        </template>
    </v-banner>
    <v-container fluid>
        <v-layout row wrap v-if="task">
            <v-flex xs12 md5>
                <v-img :src="task.image" max-height="400" max-width="95%" contain alt="loading..." class="mx-auto" style="cursor: pointer"></v-img>
                <v-btn class="ml-4" color="deep-purple darken-5" text :href="task.image" download target="_blank">
                    Download Image
                </v-btn>
            </v-flex>
            <v-flex xs12 md7>
                <v-card elevation="0">
                    <v-card-title style="color:#311B92">
                        {{ task.name }}
                    </v-card-title>

                    <v-card-text>
                        <div>
                            <v-icon class="mr-2" small color="green">
                                mdi-clock-outline
                            </v-icon>
                            <span class="caption grey--text font-weight-light">
                                {{ task.end }}
                            </span>
                        </div>
                        <div class="text--black overline my-3">Task Description</div>
                        <div> {{ task.desc }} </div>
                    </v-card-text>
                    <image-input v-model="avatar">
                        <div slot="activator">
                            <v-sheet v-if="!avatar" class="grey lighten-4 mx-auto" v-ripple height="50" width="200" style="cursor: pointer">
                                <v-layout justify-center fill-height>
                                    <v-icon color="deep-purple darken-4" large>mdi-plus</v-icon>
                                </v-layout>
                            </v-sheet>
                            <p v-if="!avatar" class="overline grey--text layout justify-center">
                                Upload Answer
                            </p>
                            <v-img v-else :src="avatar.imageURL ? avatar.imageURL : avatar" max-height="400" max-width="95%" contain alt="loading..." class="mx-auto" style="cursor: pointer"></v-img>
                            <p v-if="avatar" class="overline grey--text layout justify-center">
                                click over the image to change
                            </p>
                        </div>
                    </image-input>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</div>
</template>

<script>
import imageInput from "../../components/imageInput";

export default {
    components: {
        imageInput
    },
    data: () => ({
        task: null,
        file: null,
        avatar: null
    }),
    watch: {
        avatar: {
            handler: function () {
                const reader = new FileReader()
                reader.readAsDataURL(this.avatar.imageData)
                reader.addEventListener("load", () => {
                    this.file = reader.result;
                }, false);
                // this.file = this.avatar.imageData;
            },
            deep: true,
        },
    },
    mounted() {
        let task = JSON.parse(localStorage.getItem("task"));
        task.forEach(e => {
            if (e.id == this.$router.currentRoute.params.id) {
                this.task = e;
            }
        });
    },
    created() {

    },
    methods: {
        submit() {
            let task = JSON.parse(localStorage.getItem("task"));
            let stud = task[this.$router.currentRoute.params.id].student;
            let newPost = {
                id: stud.length,
                image: this.file,
                mark: 0,
                date: new Date
            }
            stud.push(newPost);
            localStorage.setItem("task", JSON.stringify(task));
            this.$vToastify.success("Assignment Submitted");
            this.$router.go(-1);
        }
    }
};
</script>

<style></style>
