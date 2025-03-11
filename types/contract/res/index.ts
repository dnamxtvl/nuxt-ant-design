import type { Pagination } from "~/types/common/res";

export interface ItemListContract {
    tuika_kbn: number;
    keiyaku_card_url: string;
    kouji_bukken_name: string;
    keiyaku_teiketsu_yotei_date: string;
    keiyaku_teiketsu_date: string;
    keiyaku_kbn_name: string;
    keiyakusya_name: string;
    syounin_zyoukyou: string;
    keiyaku_keijyou_yotei_date: string;
    keiyaku_keijyou_date: string;
    keiyaku_status_name: string;
    jyutyu_yotei_tsuki_sekininsya: number;
    zeikomi_keiyaku_kingaku: string;
    jyutyu_keijyou_yotei_date: string;
    keiyaku_no?: string | null;
}

export interface ListContract {
    data: ItemListContract[];
    pagination: Pagination;
}