export const signOut = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};
