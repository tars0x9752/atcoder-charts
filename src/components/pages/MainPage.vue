<template lang="pug">
.main-page
  h1.title {{ title }}
  user-name-input
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { submissionModule } from '@/vuex/modules/submission'
import UserNameInput from '@/components/organisms/UserNameInput.vue'

@Component({
  components: {
    UserNameInput,
  },
})
export default class MainPage extends Vue {
  title = 'AtCoder IroIro Charts'

  mounted() {
    submissionModule.fetchSubmissions('HaveFunWP')
  }
}
</script>

<style scoped lang="scss">
.title {
  padding: 30px;
  margin-bottom: 30px;
  background: var(--black);
  color: #fff;
  font-size: 35px;
  font-family: 'Righteous', cursive;
  text-align: center;
}

.msg {
  text-align: center;
  font-size: 16px;
}
</style>
