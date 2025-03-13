import moment from "moment";

export const formatDate = (time: string, format: string = 'YYYY/MM/DD') => {
  return moment(time).format(format);
};

export const serializeRangeDate = (fields: Array<string>, formValue: Record<string, any>) => {
  fields.forEach((key) => {
    if (formValue[key]) formValue[key] = formValue[key].join(",");
  });
  
  return formValue;
};