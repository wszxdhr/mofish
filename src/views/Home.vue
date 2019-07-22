<template>
  <div class="home">
    home
  </div>
</template>

<script>
import { getPlugins } from '@/api/service/plugins'
export default {
  name: 'home',
  components: {
  },
  created () {
    console.log(getPlugins)
    getPlugins()
  }
}
</script>
