export const getDate = (date:Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekday = ["일", "월", "화", "수", "목", "금", "토"];
  const week = weekday[date.getDay()];
  const today = `${year}년 ${month}월 ${day}일 ${week}요일`;
  return today;
};
