export const convertDate = (date) => {
  let newDate = new Date(date);

  return newDate.toDateString();
};
