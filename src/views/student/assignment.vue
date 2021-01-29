<template>
<div>
    <v-toolbar flat class="hidden-sm-and-down">
        <p class="heading">Assignment</p>
        <v-spacer></v-spacer>

        <v-tabs v-model="model" right>
            <v-tab v-for="(tab, i) in tab" :key="i" :href="`#tab-${i}`">
                {{ tab }}
            </v-tab>
        </v-tabs>
    </v-toolbar>

    <v-tabs v-model="model" fixed-tabs class="hidden-md-and-up ">
        <v-tabs-slider></v-tabs-slider>
        <v-tab href="#tab-0" class="primary--text">
            <v-icon>mdi-package</v-icon>
        </v-tab>

        <v-tab href="#tab-1" class="primary--text">
            <v-icon>mdi-note</v-icon>
        </v-tab>
    </v-tabs>

    <v-tabs-items v-model="model">
        <v-tab-item :value="`tab-0`">
            <v-layout wrap ma-5>
                <v-flex md4 pa-3 xs12 v-for="i in 4" :key="i">
                    <iframe width="100%" height="215" src="https://www.youtube.com/embed/7rbRs5om6Po" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </v-flex>
            </v-layout>
        </v-tab-item>
        <v-tab-item :value="`tab-1`">
            <v-container>
                <v-card color="white" v-ripple style="cursor: pointer" class="mx-auto my-1" max-width="400" v-for="(i, j) in task" :key="j" @click="$router.push('/stduent/assignmentView/' + i.id)">
                    <v-card-actions>
                        <v-list-item class="grow">
                            <v-list-item-avatar color="grey darken-3">
                                <v-img class="elevation-6" alt="" :src="i.image"></v-img>
                            </v-list-item-avatar>

                            <v-list-item-content class="black--text">
                                <v-list-item-title style="cursor: pointer">{{ i.name }}</v-list-item-title>
                                <small class="subheading"> Task {{ j+1 }} </small>
                            </v-list-item-content>

                        </v-list-item>
                    </v-card-actions>
                </v-card>

            </v-container>
        </v-tab-item>

    </v-tabs-items>

</div>
</template>

<script>
export default {
    data() {
        return {
            model: "tab-1",
            tab: ["Stream", "Classwork"],
            task: []
        };
    },
    mounted() {
        this.task = JSON.parse(localStorage.getItem("task"));
    }
};
</script>

<style>
.heading {
    color: #4527a0 !important;
    font-size: 18px;
    line-height: 1.2em;
}
</style>
