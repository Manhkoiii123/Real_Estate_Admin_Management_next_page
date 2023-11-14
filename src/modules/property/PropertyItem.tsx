import { IconBeds, IconCross, IconLocation } from "@/components/icons";
import Skeleton from "@/components/loading/Skeleton";
import { PropertyItemData } from "@/types/property.types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface PropertyItemProps {
  children?: React.ReactNode;
  data: PropertyItemData;
}
const PropertyItem = ({ children, data }: PropertyItemProps) => {
  if (!data) return null;
  return (
    <Link
      href={{
        pathname: "/properties/[id]",
        query: { id: data.id },
      }}
      className="flex gap-2"
    >
      <div className="relative">
        <Image
          width={200}
          height={125}
          alt="image"
          className=" object-cover w-[200px] h-[125px] rounded-xl"
          src={data.image && data.image.length > 0 ? data.image[0] : ""}
        ></Image>
      </div>
      <div className="flex-1">
        <span className="inline-block py-2 text-xl font-semibold text-primary px-[10px] rounded-md bg-primary bg-opacity-20 mb-2">
          ${data.price}
        </span>
        <h3 className="mb-1 text-base font-semibold text-primaryText">
          {data.title}
        </h3>
        <div className="flex items-center gap-1 mb-2 text-gray83">
          <IconLocation></IconLocation>
          <span className="">{data.address}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <IconBeds />
            <span className="text-xs font-medium">
              {data.facility?.Beds} Beds
            </span>
          </div>
          <div className="flex items-center gap-1">
            <IconCross />
            <span className="text-xs font-medium">{data.facility?.Area}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
export const PropertyItemLoading = () => {
  return (
    <div className="flex gap-2">
      <Skeleton className="w-[200px] h-[150px] rounded-xl"></Skeleton>
      <div className="flex-1">
        <Skeleton className="w-[50px] h-[30px] mb-2"></Skeleton>
        <Skeleton className="w-full h-3 mb-3"></Skeleton>
        <div className="flex items-center gap-1 mb-2 text-gray80">
          <IconLocation></IconLocation>
          <Skeleton className="w-20 h-3"></Skeleton>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <IconBeds></IconBeds>
            <Skeleton className="w-5 h-3"></Skeleton>
          </div>
          <div className="flex items-center gap-1">
            <IconCross></IconCross>
            <Skeleton className="w-5 h-3"></Skeleton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyItem;
