export interface IGetAllBrand {
  id: number;
  name: string;
  brandDetail: string;
  imageUrl?: string;
  noOfProducts: number;
  brandPosition: number;
  subBrands: {
    name: string;
    position: number;
    id: number;
  }[];
}
