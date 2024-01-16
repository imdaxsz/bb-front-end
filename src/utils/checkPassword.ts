export const checkPassword = (password: string) => {
  const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;
  return passwordReg.test(password);
};
