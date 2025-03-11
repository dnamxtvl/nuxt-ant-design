import { DUMMY_API } from '~/api/dummy';
import BaseService from './base-service';
import { API_CONST } from '~/constants/config/api';
import type { ErrorResponse } from '~/types/common/res';
import type { SearchContractReq } from '~/types/contract/req';
import type { ListContract } from '~/types/contract/res';

export default class ContractService extends BaseService {
    list = async (params: SearchContractReq, success: (json: ListContract) => void, error: (error: ErrorResponse) => void, token: string) => {
        // const endpoint = useRuntimeConfig().BACKEND_URL + 'api/' + API_CONST.CONTRACT.LIST; // TODO: uncomment after integration
        const endpoint = DUMMY_API.CONTRACT.LIST; // TODO: remove after integration
        await this.get(endpoint, params, success, error, token);
    };
}
