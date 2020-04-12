<template>
  <div class="home">
    <MyApp />
  </div>
</template>

<script>
// @ is an alias to /src
import MyApp from '@/components/MyApp.vue'

export default {
  name: 'Home',
  components: {
    MyApp
  }
}
</script>
