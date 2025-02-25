export default defineNuxtRouteMiddleware((to, from) => {
  const cookie = useCookie("s1s2n3").value;
  if (cookie && !useSession().user.userName.value) {
    useSession().create(cookie).catch((e) => {
      useToast().add({
        title: "Hubo un error al procesar la solicitud",
        description: e,
        color: "red",
        icon: "material-symbols:error",
      });
    });
  }

  const allowedPaths = ["/login"];

  if (!cookie && !allowedPaths.includes(to.path)) {
    return navigateTo("/login");
  } else if (cookie && allowedPaths.includes(to.path))
    return navigateTo("/home");
});
