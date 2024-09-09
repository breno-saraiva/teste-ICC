import { useEffect, useState } from "react";
import { getMedications } from "../service/listDrugs/listDrugs.service";
import { DrugsListTable } from "../../types/dataTable";
import { Input } from "@/shared/components/ui/input";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { DataTable } from "@/shared/components/dataTable/dataTable";
import { columnsShad } from "../components/columns";
import { Button } from "@/shared/components/ui/button";
import { Link } from "react-router-dom";
import { Label } from "@/shared/components/ui/label";

function HomePage() {
  const [filterDrug, setFilterDrug] = useState("");
  const [listDrugs, setListDrugs] = useState<DrugsListTable[]>([]);
  const [page, setPage] = useState(0);
  const debouncedFilterDrug = useDebounce(filterDrug, 500);

  async function loadDrugs(search: string, skip: number) {
    try {
      const params = {
        search: search,
        limit: 10,
        skip: skip,
      };

      const response = await getMedications(params);

      const responseDrugs = response.results.map((item) => {
        if (!item?.openfda?.brand_name?.[0]) {
          return;
        }

        return {
          id: item.id,
          brand_name: item?.openfda?.brand_name?.[0],
          generic_name: item?.openfda?.generic_name?.[0],
          manufacturer_name: item?.openfda?.manufacturer_name?.[0],
          substance_name: item?.openfda?.substance_name?.[0],
          route: item?.openfda?.route?.[0],
        };
      });

      const filteredResponse = responseDrugs.filter(
        (item) => item !== undefined
      );

      setListDrugs(filteredResponse);
    } catch (error) {
      console.error("Error fetching medications:", error);
    }
  }

  useEffect(() => {
    loadDrugs(filterDrug, page);
  }, [page, debouncedFilterDrug]);

  return (
    <div className="w-full p-12 flex flex-col gap-5 ">
      <h1 className="my-4 font-bold text-5xl flex justify-center">
        U.S. Food and Drug Administration
      </h1>
      <div className="flex justify-between">
        <div className="w-3/5">
          <div>
            <Label className="text-lg">search medicine</Label>
          </div>
          <Input
            placeholder="Search..."
            type="text"
            onChange={(event) => {
              setFilterDrug(event.target.value);
            }}
          />
        </div>

        <div className="flex items-end gap-4">
          <Link to={"/favorites"}>
            <Button type="button">favorite list</Button>
          </Link>
        </div>
      </div>
      <DataTable
        columns={columnsShad}
        data={listDrugs}
        page={page}
        setPage={setPage}
      />
    </div>
  );
}

export default HomePage;
