export interface LanguageItem {
  id: number;
  itemName: string;
}
export interface SharedSD {
  Name: string;
  Versions: string[];
  Status: string;
  DateCreated: Date;
  CreatedBy: string;
  Entity: string[];
  Language: LanguageItem[][];
}
