export default defineNuxtRouteMiddleware((to) => {
    if(to.path === '/')
        if(useSession().user.token.value) return navigateTo('/home')
        else return navigateTo('/login')
})