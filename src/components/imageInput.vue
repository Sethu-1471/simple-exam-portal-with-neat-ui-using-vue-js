<template>
<div>
    <div @click="launchFilePicker()">
        <slot name="activator"></slot>
    </div>
    <input type="file" ref="file" :name="uploadFieldName" @change="onFileChange(
          $event.target.name, $event.target.files)" style="display:none">
    <v-dialog v-model="errorDialog" max-width="300">
        <v-card class="pa-5">
            <v-card-text class="subheading">{{errorText}}</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="deep-purple darken-5" class="white--text" @click="errorDialog = false">Got it!</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
export default {
    name: 'image-input',
    data: () => ({
        errorDialog: null,
        errorText: '',
        uploadFieldName: 'file',
        maxSize: 1024
    }),
    props: ["value"],
    methods: {
        launchFilePicker() {
            this.$refs.file.click();
        },
        onFileChange(fieldName, file) {
            const {
                maxSize
            } = this
            let imageFile = file[0]

            if (file.length > 0) {
                let size = imageFile.size / maxSize / maxSize
                if (!imageFile.type.match('image.*')) {
                    this.errorDialog = true
                    this.errorText = 'Please choose an image file'
                } else if (size > 1) {
                    this.errorDialog = true
                    this.errorText = 'Your file is too big! Please select an image under 1MB'
                } else {
                    let imageURL = URL.createObjectURL(imageFile)
                    let imageData = this.$refs.file.files[0]
                    this.$emit('input', {
                        imageURL,
                        imageData
                    })
                }
            }
        }
    }
}
</script>
