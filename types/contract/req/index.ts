export interface SearchContractReq {
    keiyaku_no?: string;
    kouji_name?: string;
    keiyaku_status?: string;
    keiyaku_card_syubetsu?: string;
    jyutyu_jigyousyo_name?: string;
    keiyakusya_name?: string;
    jyutyu_eigyousyo?: string;
    keiyaku_teiketsu_date?: Array<string>;
    eigyo_tantousya?: string;
    keiyaku_keijyou_date?: Array<string>;
    syoukai_card_syutoku?: string;
    jyutyu_jigyousyo?: string;
    page: number;
    limit: number;
}