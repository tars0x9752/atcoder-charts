<template lang="pug">
.organism-main-page-header
  .container
    h1.title {{ title }}
    .links
      a.link.github(
        target="_blank"
        :href="github"
        ) GitHub
      a.link.twitter(
        target="_blank"
        :href="twitter"
        ) Twitter
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'

@Component
export default class MainPageHeader extends Vue {
  github = 'https://github.com/havveFn/atcoder-charts'

  twitter = 'https://twitter.com/havveFn'

  @Prop({ default: 'AtCoder Charts' })
  title!: string
}
</script>

<style scoped lang="scss">
.organism-main-page-header {
  display: flex;
  height: 80px;
  justify-content: center;
  background: var(--white);
  overflow: hidden;
}

.container {
  width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
}

.title {
  margin: 0 0px;
  padding: 10px 5px;
  color: var(--black);
  font-size: 35px;
  font-family: 'Righteous', cursive;
  text-align: center;
}

.links {
  display: flex;
  margin: 0 0px;
  font-family: 'Poppins', sans-serif;
  font-weight: bold;
}

.link {
  display: block;
  padding: 0 20px;
  color: var(--black);
  font-size: 16px;
}

a:visited {
  color: var(--black);
}

.github {
  padding: 0 20px;
  border-right: 5px solid var(--teal);
}
</style>
