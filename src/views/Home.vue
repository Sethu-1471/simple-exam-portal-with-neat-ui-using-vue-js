<template>
  <div class="home">
    <signup/>
  </div>
</template>

<script>
// @ is an alias to /src
import signup from '@/components/First/signup.vue'

export default {
  name: 'Home',
  components: {
    signup
  }
}
</script>
