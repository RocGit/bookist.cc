import sessionStore from '@/store/sessionStore'

export default context => {
  context.app.router.beforeEach((to, from, next) => {
    if (
      to.path.startsWith('/admin') &&
      (process.server || !sessionStore.getToken())
    ) {
      next('/login')
    } else {
      next()
    }
  })
}
