export interface Country {
  code: string;
  name: string;
  continent: {
    name: string;
  };
  capital?: string;
  currencies: string[];
  phone: string;
  languages: {
    code: string;
    name: string;
  }[];
}