export type TSidebarLink = {
  title: string;
  icon: JSX.Element;
  path: string;
};
export type TDropdownData = {
  value: string;
  label: string;
};
//với cái status thì cái data của nó chỉ có thể là label và value. value chỉ được chứa các loại là '','rent','sale
export type TPropertyStatusData = Omit<TDropdownData, "value"> & {
  value: "" | "sale" | "rent";
};
//tương tự cái trên
export type TPropertyTypeData = Omit<TDropdownData, "value"> & {
  value: "" | "apartments" | "houses" | "commercial" | "garages" | "lots";
};
export type TPropertyStatus = "sale" | "rent" | "";
export type TPropertyType =
  | ""
  | "apartments"
  | "houses"
  | "commercial"
  | "garages"
  | "lots";
export type TFilter = {
  text?: string;
  status: TPropertyStatusData["value"];
  country?: string;
  type?: TPropertyTypeData["value"];
  state?: string;
  offset?: number;
  limit?: number;
};
