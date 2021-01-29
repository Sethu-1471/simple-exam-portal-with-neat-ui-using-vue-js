<template>
<div>
    <v-banner single-line>
        Post assignment
        <template v-slot:actions>
            <v-btn color="red" class="white--text" @click="$router.go(-1)">
                Cancel
            </v-btn>
            <v-btn color="deep-purple darken-4" class="white--text" @click="post">
                Post
            </v-btn>
        </template>
    </v-banner>
    <v-container fluid>
        <v-layout row mt-5 wrap>
            <v-flex xs12 md5>
                <image-input v-model="avatar">
                    <div slot="activator">
                        <v-sheet v-if="!avatar" class="grey lighten-4 mx-auto" v-ripple height="200" width="400" style="cursor: pointer">
                            <v-layout justify-center fill-height>
                                <v-icon color="deep-purple darken-4" large>mdi-plus</v-icon>
                            </v-layout>
                        </v-sheet>
                        <p v-if="!avatar" class="overline grey--text layout justify-center">
                            Image
                        </p>
                        <v-img v-else :src="avatar.imageURL ? avatar.imageURL : avatar" max-height="400" max-width="95%" contain alt="loading..." class="mx-auto" style="cursor: pointer"></v-img>
                        <p v-if="avatar" class="overline grey--text layout justify-center">
                            click over the image to change
                        </p>
                    </div>
                </image-input>
            </v-flex>
            <v-flex xs12 md7 pl-3 pr-5 justify-center>
                <v-text-field color="deep-purple darken-4" label="Task Name" v-model="name"></v-text-field>
                <v-textarea name="input-7-1" label="Descrption" v-model="desc"></v-textarea>

                <v-row>
                    <v-menu v-model="taskenddate" :close-on-content-click="false" transition="scale-transition" offset-y min-width="290px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field color="deep-purple darken-4" label="Task final date" readonly v-bind="attrs" v-on="on" v-model="taskenddatevalue" class="pl-3" clearable></v-text-field>
                        </template>
                        <v-date-picker v-model="taskenddatevalue" color="deep-purple darken-4" header-color="deep-purple darken-4" scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="deep-purple darken-4" @click="taskenddate = false">
                                ok
                            </v-btn>
                        </v-date-picker>
                    </v-menu>
                </v-row>
            </v-flex>
        </v-layout>
    </v-container>
</div>
</template>

<script>
import imageInput from "../../components/imageInput";

export default {
    components: {
        imageInput,
    },
    data: () => ({
        dialog: false,
        taskenddate: false,
        taskenddatevalue: null,
        avatar: null,
        name: null,
        desc: null,
        file: null,
    }),
    updated() {},
    watch: {
        avatar: {
            handler: function () {
                console.log(this.avatar.imageData);
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
    methods: {
        async post() {
            if (localStorage.getItem("task")) {
                let task = localStorage.getItem("task");
                let tasks = JSON.parse(task);
                let len = tasks.length
                tasks.push({
                    id: len,
                    image: this.file,
                    name: this.name,
                    desc: this.desc,
                    end: this.taskenddatevalue,
                    student: []
                })
                await localStorage.setItem("task", JSON.stringify(tasks));
                this.$vToastify.success("Task Created");
                this.$router.go(-1);
            } else {
                localStorage.setItem("task", JSON.stringify([{
                    id: 0,
                    image: this.file,
                    name: this.name,
                    desc: this.desc,
                    end: this.taskenddatevalue,
                    student: []
                }]))
                this.$vToastify.success("Task Created");
                this.$router.go(-1);
            }
        }
    },
    created() {

    },
    mounted() {

    },
};
</script>

<style></style>
