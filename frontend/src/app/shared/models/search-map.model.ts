import { SearchType } from '../enums/search-type.enum';

export interface SearchMapModel {
  meta: MetaModel;
  result: ResultModel;
}

export interface ItemsResultModel {
  address_comment: string;
  address_name: string;
  id: string;
  name: string;
  type: SearchType;
}

interface ResultModel {
  items: ItemsResultModel[];
  total: number;
}

interface MetaModel {
  api_version: string;
  code: number;
  issue_date: string;
}
