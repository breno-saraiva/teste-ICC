import { columnsShad } from "@/home/components/columns";
import { DataTable } from "@/shared/components/dataTable/dataTable";
import { Button } from "@/shared/components/ui/button";
import { DrugsListTable } from "@/types/dataTable";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Favoritos() {
  const [favoriteList, setFavoriteList] = useState<DrugsListTable[]>(
    JSON.parse(localStorage.getItem("favorites") || "[]")
  );

  useEffect(() => {
    const updateFavoriteList = () => {
      setFavoriteList(JSON.parse(localStorage.getItem("favorites") || "[]"));
    };

    window.addEventListener("storage", updateFavoriteList);

    const intervalId = setInterval(() => {
      updateFavoriteList();
    }, 1000);

    return () => {
      window.removeEventListener("storage", updateFavoriteList);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="w-full h-screen m-auto p-12 flex flex-col gap-5 ">
      <h1 className="my-4 font-bold text-5xl flex justify-center">
        List of Favorite Medicines
      </h1>
      <div className="flex justify-end ">
        <div className="flex gap-4">
          <Link to={"/"}>
            <Button type="button">Back to Home</Button>
          </Link>
        </div>
      </div>
      <DataTable columns={columnsShad} data={favoriteList} />
    </div>
  );
}

export { Favoritos };
