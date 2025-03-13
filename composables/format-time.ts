import moment from "moment";

export const formatDate = (time: string, format: string = 'YYYY/MM/DD') => {
  return moment(time).format(format);
};

export const serializeRangeDate = (fields: Array<string>, formState: Record<string, any>) => {
  fields.forEach((key) => {
    if (formState[key]) formState[key] = formState[key].join(",");
  });
  return formState;
};