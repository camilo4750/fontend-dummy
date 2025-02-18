export default defineNuxtRouteMiddleware((to, from) => {
  const cookie = useCookie("s1s2n3").value;
  // if (cookie) {

  // }

  const allowedPaths = ["/login"];

  console.log("estoy en el middleware");

  console.log(to.path);

  if (!cookie && !allowedPaths.includes(to.path)) {
    return navigateTo("/login");
  } else if (cookie && allowedPaths.includes(to.path))
    return navigateTo("/home");
});
