import { RULES_VALIDATION } from "~/constants/config/validation";
import validator from 'validator';

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
    }
  }
}
