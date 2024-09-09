import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { DrugsListTable } from "@/types/dataTable";
import { ColumnDef } from "@tanstack/react-table";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Label } from "@/shared/components/ui/label";

const columnsShad: ColumnDef<DrugsListTable>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const [favoriteList, setFavoriteList] = useState<DrugsListTable[]>([]);

      const drugs = row.original;

      function getFavorite() {
        let favDrugs: DrugsListTable[] = JSON.parse(
          localStorage.getItem("favorites") || "[]"
        );
        setFavoriteList(favDrugs);
      }

      function addFavorite() {
        let favDrugs: DrugsListTable[] = JSON.parse(
          localStorage.getItem("favorites") || "[]"
        );
        favDrugs.push(drugs);
        setFavoriteList(favDrugs);
        localStorage.setItem("favorites", JSON.stringify(favDrugs));
        getFavorite();
      }

      function deleteFavorite() {
        let favDrugs: DrugsListTable[] = JSON.parse(
          localStorage.getItem("favorites") || "[]"
        );
        const newFavDrugs = favDrugs.filter((item) => item.id !== drugs.id);
        setFavoriteList(newFavDrugs);
        localStorage.setItem("favorites", JSON.stringify(newFavDrugs));
        getFavorite();
      }

      useEffect(() => {
        getFavorite();
      }, []);

      return (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                {!!favoriteList.find((item) => item.id === drugs.id) ? (
                  <FaStar className="h-4 w-4 text-yellow-400" />
                ) : (
                  <FaRegStar className="h-4 w-4" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={addFavorite}
                disabled={!!favoriteList.find((item) => item.id === drugs.id)}
              >
                <div className="flex gap-1">
                  <div className="flex justify-between items-center">
                    <IoIosAddCircleOutline className="h-5 w-5" />
                  </div>
                  <span>add favorite</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={deleteFavorite}
                disabled={
                  !!favoriteList.find((item) => item.id === drugs.id)
                    ? false
                    : true
                }
              >
                <div className="flex gap-1">
                  <div className="flex justify-center items-center">
                    <FaTrashAlt className="h-4 w-4 text-red-600" />
                  </div>
                  <span>exclude favorite</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost">
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-screen-md p-12">
              <DialogHeader className="my-4">
                <DialogTitle>Medicinal Information</DialogTitle>
                <DialogDescription>
                  Information about the medicine
                </DialogDescription>
              </DialogHeader>
              <div className="flex gap-12">
                <div className="flex flex-col gap-2">
                  <Label>Madication Name</Label>
                  <span>{drugs.brand_name}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Generic Name </Label>
                  <span>{drugs.generic_name}</span>
                </div>
              </div>
              <div className="flex gap-12">
                <div className="flex flex-col gap-2">
                  <Label>Manufacturer</Label>
                  <span>{drugs.manufacturer_name}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Substance</Label>
                  <span>{drugs.substance_name}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Route</Label>
                  <span>{drugs.route}</span>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
  { accessorKey: "brand_name", header: "Madication Name" },
  { accessorKey: "substance_name", header: "Substance" },
  { accessorKey: "manufacturer_name", header: "Manufacturer" },
];
export { columnsShad };
