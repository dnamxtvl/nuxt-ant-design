import moment from "moment";

export const formatDate = (time: string, format: string = 'YYYY/MM/DD') => {
  return moment(time).format(format);
};