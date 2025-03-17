import { RULES_VALIDATION } from "~/constants/config/validation";
import validator from 'validator';
import { PER_PAGE } from "~/constants/config/application";

export const useValidator = () => {
  return {
    isInvalidEmail: (email: string, required: boolean = false) => {
      if (email == '' && !required) {
        return true;
      }

      return validator.isEmail(email);
    },

    isFullWidth: (string: string) => {
      return validator.isFullWidth(string);
    },

    isHalfWidth: (string: string) => {
      return validator.isHalfWidth(string);
    },

    isPhoneNumber: (phone: number) => {
      var regex = RULES_VALIDATION.PHONE_FORMAT;
      return String(phone).match(regex);
    },

    isZipCode: (code: string) => {
      var regex = RULES_VALIDATION.ZIP_CODE;
      return String(code).match(regex);
    },

    isValidTime: (string: string) => {
      let res = string.match(RULES_VALIDATION.VALID_TIME);
      return !(res == null);
    },

    isValidCode: (code: string) => {
      if (code == '') {
        return false;
      }

      return code.length == RULES_VALIDATION.CODE.LENGTH;
    },

    isValidRangeDate(dateString: string, format: string = "YYYY/MM/DD") {
      const dates = dateString.split(",");
      if (dates.length !== 2) return false;
    
      return dates.every(date => validator.isDate(date, { format, strictMode: true }));
    },

    isValidDate(dateString: string, format: string = "YYYY/MM/DD") {
      return validator.isDate(dateString, { format, strictMode: true });
    },

    isValidPage(page: any) {
      if (page == undefined || page == null || page == '') return false;
      if (!validator.isNumeric(page)) return false;
      if (page <= 0) return false;

      return true;
    },

    isValidPerPage(perPage: any) {
      if (perPage == undefined || perPage == null || perPage == '') return false;
      if (!validator.isNumeric(perPage)) return false;
      if (!PER_PAGE.includes(Number(perPage))) return false;

      return true;
    }
  }
}
