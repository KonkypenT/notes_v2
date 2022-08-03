export interface PlaceModel {
  meta: MetaModel;
  result: ResultModel;
}

export interface PointModel {
  lat: number;
  lon: number;
}

interface MetaModel {
  api_version: string;
  code: number;
  issue_date: string;
}

interface ResultModel {
  items: ItemModel[];
  total: number;
}

interface ItemModel {
  address_name: string;
  building_name: string;
  full_name: string;
  id: string;
  name: string;
  point: PointModel;
  purpose_name: string;
  type: string;
}
