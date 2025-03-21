export interface SearchContract {
    keiyaku_no?: string;
    kouji_name?: string;
    keiyaku_status?: string;
    keiyaku_card_syubetsu?: string;
    jyutyu_jigyousyo_name?: string;
    keiyakusya_name?: string;
    jyutyu_eigyousyo?: string;
    keiyaku_teiketsu_date_from?: string;
    keiyaku_teiketsu_date_to?: string;
    eigyo_tantousya?: string;
    keiyaku_keijyou_date_from?: string;
    keiyaku_keijyou_date_to?: string;
    syoukai_card_syutoku?: string;
    jyutyu_jigyousyo?: string;
}

export interface SearchContractParams extends SearchContract {
    page: number;
    limit: number;
}