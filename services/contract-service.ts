import { DUMMY_API } from '~/api/dummy';
import { API_CONST } from '~/constants/config/api';
import type { SearchContractParams } from '~/types/contract/req';

export default class ContractService {
    list = async (params: SearchContractParams) => {
        // const endpoint = API_CONST.CONTRACT.LIST; // TODO: uncomment after integration
        const endpoint = DUMMY_API.CONTRACT.LIST; // TODO: remove after integration
        return await useCustomFetch(endpoint, { method: "GET", params: params });
    };
}
