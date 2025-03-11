import { H3Event } from 'h3'
import logger from '~/utils/logger';
import api from '~/api/axios';
import { ErrorResponse, ResponseData } from '~/types/common/res';
import { JWT_KEY_ACEESS_TOKEN_NAME } from '~/constants/config/application';

export default defineEventHandler(async (event: H3Event) => {
  const token = getCookie(event, JWT_KEY_ACEESS_TOKEN_NAME) ?? '';
  let data;
  await api.auth.logout(
    {},
    (res: ResponseData) => {
      data = res;
    },
    (err: ErrorResponse) => {
      logger.error(err);
      throw createError({
        status: err.code,
        data: err,
      });
    },
    token
  );

  return data;
})