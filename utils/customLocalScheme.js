import LocalScheme from '@nuxtjs/auth-next/dist/schemes/local.js'

export default class CustomLocalScheme extends LocalScheme {
  mounted({
    tokenCallback = () => this.$auth.reset(),
    refreshTokenCallback = undefined,
  } = {}) {
    const { tokenExpired, refreshTokenExpired } = this.check(true)
    if (refreshTokenExpired && typeof refreshTokenCallback === 'function') {
      refreshTokenCallback()
    } else if (tokenExpired && typeof tokenCallback === 'function') {
      tokenCallback()
    }
    // Initialize request interceptor
    this._initializeRequestInterceptor()

    const { ctx } = this.$auth
    const { route } = ctx

    // если НЕ на странице авторизации, сначала получаем пользователя
    if (this.options.user && this.options.user.skipFetchUserOnceOnRoutes) {
      const regExp = new RegExp(this.options.user.skipFetchUserOnceOnRoutes)
      console.debug(
        'customLocalScheme route matching',
        regExp,
        route.path,
        regExp.exec(route.path)
      )
      if (regExp.exec(route.path)) {
        console.debug('Skipping init fetchUserOnce')
        return true
      }
    }
    return this.$auth.fetchUserOnce()
  }
}
