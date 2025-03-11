import moment from "moment";

export const formatDate = (time: string) => {
  return moment(time).format("YYYY/MM/DD");
};