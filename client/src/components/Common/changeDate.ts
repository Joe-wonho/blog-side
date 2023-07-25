export const changeDate = (date: string): string => {
  const temp = new Date(date);
  return `${temp.getFullYear()}년 ${temp.getMonth() + 1}월 ${temp.getDate()}일`;
};
