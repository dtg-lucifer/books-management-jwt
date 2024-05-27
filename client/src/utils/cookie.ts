export const getCookie = <T extends string | null>(name: string) => {
  const cookie = document.cookie
    .split("; ")
    .find((c) => c.startsWith(name))
    ?.split("=")[1] as T;
  return cookie;
};
