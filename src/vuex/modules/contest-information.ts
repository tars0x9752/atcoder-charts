import axios from 'axios'
import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/vuex/store'
import { ContestInformation } from '@/types/contest-information'

const httpClient = axios.create({
  baseURL: 'https://kenkoooo.com/atcoder/resources/contests.json',
})

@Module({ dynamic: true, name: 'ContestInformationModule', store, namespaced: true })
class ContestInformationModule extends VuexModule {
  private contestInformations: ContestInformation[] | null = null

  get getContestInformations(): ContestInformation[] | null {
    return this.contestInformations
  }

  @Mutation
  setContestInformations(contestInformations: ContestInformation[] | null) {
    this.contestInformations = contestInformations
  }

  @Action({ rawError: true })
  async fetchContestInformation() {
    const res = await httpClient.get('/')

    const contestInformations = res.data

    this.setContestInformations(contestInformations)
  }
}

export const contestInformationModule = getModule(ContestInformationModule)
