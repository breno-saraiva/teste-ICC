import axios, { AxiosResponse } from "axios";
import { ListDrugsOutput } from "./listDrugs.Dto";

type GetProps = {
  search?: string;
  limit?: number;
  skip?: number;
};

async function getMedications({
  search,
  limit,
  skip,
}: GetProps): Promise<ListDrugsOutput> {
  try {
    const params = {
      search: search ? `openfda.brand_name:"${search}"` : null,
      limit: limit ? limit : 100,
      skip: skip ? skip : 0,
    };

    const response: AxiosResponse<ListDrugsOutput> = await axios.get(
      "https://api.fda.gov/drug/label.json",
      { params }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching medications:", error);
    throw error;
  }
}

export { getMedications };
