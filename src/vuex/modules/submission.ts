import axios from 'axios'
import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/vuex/store'
import { Submission } from '@/types/submission'

const httpClient = axios.create({
  baseURL: 'https://kenkoooo.com/atcoder/atcoder-api',
})

@Module({ dynamic: true, name: 'SubmissionModule', store, namespaced: true })
class SubmissionModule extends VuexModule {
  private submissions: Submission[] | null = null

  get getSubmissions(): Submission[] | null {
    return this.submissions
  }

  @Mutation
  setSubmissions(submissions: Submission[] | null) {
    this.submissions = submissions
  }

  @Action({ rawError: true })
  async fetchSubmissions(username: string) {
    if (!username) {
      throw new Error('username required')
    }

    const res = await httpClient.get('/results', {
      params: {
        user: username,
      },
    })

    const submissions: Submission[] = res.data

    this.setSubmissions(submissions)
  }
}

export const submissionModule = getModule(SubmissionModule)
