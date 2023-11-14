import { LayoutMain } from "@/components/layout";
import PropertyList from "@/modules/property/PropertyList";
import PropertyListLoadmore from "@/modules/property/PropertyListLoadmore";
import Link from "next/link";

const PropertyPage = () => {
  return (
    <LayoutMain>
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-bold text-primaryText text-[25px]">
          Property List
        </h1>
        <Link
          href="/properties/create"
          className="flex items-center justify-center py-[13px] px-5 text-white bg-primary rounded-[10px] text-sm font-medium leading-[22px]"
        >
          + Add Property
        </Link>
      </div>
      {/* <PropertyList /> */}
      <PropertyListLoadmore />
    </LayoutMain>
  );
};

export default PropertyPage;
