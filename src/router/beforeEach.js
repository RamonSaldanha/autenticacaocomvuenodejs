import store from '../store'

export default async (to, from, next) => {
  document.title = `${to.name} - Series Wished`
  const token = localStorage.getItem('token')
  if( to.meta.auth ) {
    if(!token) {
      next({
        path: '/login'
      })
    } else {
      store.dispatch("auth/getAuthProfile")
      next()
    }
  }
  next()
}