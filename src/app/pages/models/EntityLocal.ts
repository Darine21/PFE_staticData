export interface EntityLocal {

  Name: string;
  Types: string;
  Category: string;
  Status: "Inactive/Draft"; // Utiliser une chaîne au lieu d'un type spécifique
  DateCreated: Date;
  CreatedBy: string;
  null: string[];
}
