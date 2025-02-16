import { H3Event } from 'h3'
import logger from '~/utils/logger';
import api from '~/api/axios';
import { ErrorResponse } from '~/types/common/res';
import { LoginResponse } from '~/types/auth/res';

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody(event)
  let data;
  await api.auth.login(
    body,
    (res: LoginResponse) => {
      data = res;
    },
    (err: ErrorResponse) => {
      logger.error(err);
      throw createError({
        data: err,
      });
    },
  );

  return data;
})