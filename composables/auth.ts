export const useAuth = () => ({
  login: (userName: string, password: string) =>
    new Promise((resolve, reject) => {
      $fetch(useRuntimeConfig().public.baseApiUrl + "/auth/login", {
        method: "POST",
        timeout: 5000,
        headers: { "Content-Type": "application/json" },
        body: {
          username: userName,
          password: password,
        },
        onResponse: ({ response }) => {
          if (response.status === 200) {
            useCookie("a47d32", COOKIE_CONFIG).value =
              "RrM05tWTNJaXdpYm1GdFpTSTZJa0ZrYldsdU.ZXlKcGMzTWlPaUpvZEhSd09pOHZNVEF1TUM0d0xqRTJPamcxTDJGd2FTOWhkWFJvTDJ4dloybHVJaXdpYVdGMElqb3hOekV3TWpVd05UazFMQ0psZUhBaU9qRTNNVEF5TmpFek9UVXNJbTVpWmlJNk1UY3hNREkxTURVNU5Td2lhblJwSWpvaWFXWnRha3N4UWpkcFYwcEJhV1JzU3lJc0luTjFZaUk2SWpFaUxDSndjbllpT2lJeU0ySmtOV000T1RRNVpqWXdNR0ZrWWpNNVpUY3dNV00wTURBNE56SmtZamRoTlRrM0.EZwVFNUWkphMFpyWWxkc2RVbHBkMmxhVnpGb1lWZDN";
            useCookie("30dkk4", COOKIE_CONFIG).value =
              "aWEp0YVhOemFXOXVjeUk2ZXlJeElqb2lRV1J.RTNNVEF5TmpFek9UVXNJbTVpWmlJNk1UY3hNREkxTURVNU5Td2lhblJwSWpvaWFXWnRha3N4UWpkcFYwcEJhV1JzU3lJc0luTjFZaUk2SWpFaUxDSndjbllpT2lJeU0ySmtOV000T1RRNVpqWXdNR0ZrWWpNNVpUY3dNV00wTURBNE56SmtZamRoTlRrM05tWTNJaXdpYm1GdFpTSTZJa0ZrYldsdUlpd2laVzFoYVd3aU9pSmhaRzFwYmtCellYWnVaUzV1WlhRaUxDSnliMnhsY3lJNmV5SXhJam9pUVdxd2VxemN4Y3paWEp0YVhOemFXOXVje.ZWxsWVduVmFVelYxV2xoUmFVeERTbmxpTW5oc1kzbEpObVY1U1h";
            useCookie("x038ss", COOKIE_CONFIG).value =
              "TDJ4dloybHVJaXdpYVdGMElqb3hOekV3TW.WlhsS2NHTXpUV2xQYVVwdlpFaFNkMDlwT0haTlZFRjFUVU0wZDB4cVJUSlBhbWN4VERKR2QyRlRPV2hrV0ZKdlRESjRkbG95YkhWSmFYZHBZVmRHTUVscWIzaE9la1YzVFdwVmQwNVVhekZNUTBwc1pVaEJhVTlxUlROTlZFRjVUbXBGZWs5VVZYTkpiVFZwV21sSk5rMVVZM2hOUkVreFRVUlZOVTVUZDJsaGJsSndTV3B2YVdGWFduUmhhM040VVdwa2NGWXdjRUpoVjFKelUzbEpjMGx1VGpGWmFVazJTV3BGYVV4RFNuZGpibGxwVDJsSmVV.uZGpibGxwVDJsSmVVMHlTbXRPVjAwMFQxUlJO";
            useCookie("s1s2n3", COOKIE_CONFIG).value =
              response?._data?.accessToken;
            useCookie("s3sd445", COOKIE_CONFIG).value =
              "UM0d0xqRTJPamcxTDJGd2FTOWhkWFJv.GxwVDJsSmVVMHlTbXRPVjAwMFQxUlJOVnBxV1hkTlIwWnJXV3BOTlZwVVkzZE5WMDB3VFVSQk5FNTZTbXRaYW1Sb1RsUnJNMDV0V1ROSmFYZHBZbTFHZEZwVFNUWkphMFpyWWxkc2RVbHBkMmxhVnpGb1lWZDNhVTlwU21oYVJ6RndZbXRDZWxsWVduVmFVelYxV2xoUmFVeERTbmxpTW5oc1kzbEpObVY1U1hoSmFtOXBVVmR4ZDJWeGVtTjRZM3BhV0VwMFlWaE9lbUZYT1hWamVVazJaWGxKZUVscWIybFJWMUowWVZjMWNHTXpVbmxaV0ZKd1pHMDRhV1pZTUE9P.0haTlZFRjFUVU0wZDB4cVJUSlBhbWN4VERKR2";
            useSession().create(response?._data?.accessToken).catch((e) => {
              useToast().add({
                title: 'Hubo un error al procesar la solicitud', 
                description: e,
                color: 'red',
                icon: 'material-symbols:error'
              });
            });
            resolve(response);
          } else reject(response);
        },
      }).catch(({ response }) => reject(response));
    }),
});

export const useSession = () => ({
  user: {
    token: useCookie("s1s2n3"),
    fullName: useState<string | undefined>("sessionUserFullName", () => ""),
    email: useState<string | undefined>("sessionUserEmail", () => ""),
    userName: useState<string | undefined>("sessionUserName", () => ""),
    userImg: useState<string | undefined>("sessionUserImg", () => ""),
  },
  create: (token: string) =>
    new Promise<void>((resolve, reject) => {
      try {
        const userData = atob(token?.split(".")[1]);
        const userDataObj = JSON.parse(userData);
        useSession().user.token.value = token;
        useSession().user.fullName.value = `${userDataObj?.firstName} ${userDataObj?.lastName}`;
        useSession().user.email.value = userDataObj?.email ?? "";
        useSession().user.userName.value = userDataObj?.username ?? ""; 
        useSession().user.userImg.value = userDataObj?.image ?? ""; 
        resolve();
      } catch (e) {
        reject(e);
      }
    }),
});
