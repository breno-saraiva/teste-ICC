type Drug = {
  brand_name: string[];
  generic_name: string[];
  manufacturer_name: string[];
  substance_name: string[];
  route: string[];
};

type Drugslist = {
  id: string;
  openfda: Drug;
};

type ListDrugsOutput = {
  meta: {
    disclaimer: string;
    license: string;
    last_updated: string;
    results: {
      skip: number;
      limit: number;
      total: number;
    };
  };
  results: Drugslist[];
};

export type { Drug, Drugslist, ListDrugsOutput };
