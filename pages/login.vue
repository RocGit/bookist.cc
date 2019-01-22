<template>
  <div id="p-login">
    <h1 class="title">用户登录</h1>
    <form>
      <div class="field">
        <label>用户名</label>
        <input v-model="form.username" class="input is-medium" />
      </div>
      <div class="field">
        <label>密码</label>
        <input v-model="form.password" type="password" class="input is-medium" @keyup.enter="submit" />
      </div>
      <a class="button is-primary is-medium" @click="submit">登 录</a>
    </form>
  </div>
</template>

<script>
import sessionStore from '@/store/sessionStore'
import { accountApi } from '@/api/admin'

export default {
  layout: 'plain',
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    submit() {
      accountApi.login(this.form).then(data => {
        sessionStore.setToken(data.accessToken)
        this.$router.replace('/admin/book-edit')
      })
    }
  }
}
</script>

<style lang="scss">
#p-login {
  max-width: 400px;
  margin: 0 auto;
  padding-top: 40px;
  h1 {
    text-align: center;
  }
  form {
    margin: 40px 0 100px;
  }
  .button {
    min-width: 90px;
    margin-top: 10px;
  }
}
</style>


