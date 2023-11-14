import React, { useState } from "react";
import PropertyItem, { PropertyItemLoading } from "./PropertyItem";
import { useQuery } from "@tanstack/react-query";
import { getProperties } from "@/store/property.service";
import { PropertyItemData } from "@/types/property.types";
import { IconSearch, IconTune } from "@/components/icons";
import { Dropdown } from "@/components/dropdown";
import {
  ITEMS_PER_PAGE,
  propertyStatusData,
  propertyTypeData,
} from "@/constants/general.const";
import {
  TFilter,
  TPropertyTypeData,
  TPropertyStatusData,
} from "@/types/general.types";
import { debounce } from "lodash";
import { twMerge } from "tailwind-merge";
import { DropdownItem } from "@/components/dropdown/Dropdown";

const PropertyList = () => {
  const [selected, setSelected] = useState({
    statusText: "Any Status",
    typeText: "Any Type",
    countryText: "All Countries",
    stateText: "All States",
  });
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<TFilter>({
    text: "",
    status: "",
    country: "",
    type: "",
    state: "",
  });
  const { data, isLoading, error } = useQuery({
    queryKey: ["properties", filter.text, filter.status, filter.type, page], //khi mà filet.text thay đổi thì gọi lại cái quẻyfn
    queryFn: () =>
      getProperties({
        text: filter.text,
        status: filter.status,
        type: filter.type,
        offset: (page - 1) * ITEMS_PER_PAGE,
        limit: ITEMS_PER_PAGE,
      }),
    refetchOnWindowFocus: false,
    cacheTime: 0,
    staleTime: 0,
    enabled: true, // mặc định là true nếu đẻ là false thì ko fetch đâu
    // áp dụng alf khi muốn tìm kiếm lúc đầu thì ko tìm kiếm => cho enabled = false
  });
  const handleFilterProperty = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilter({
        ...filter,
        text: e.target.value,
      });
    },
    500
  );

  const handleFilterByStatus = (value: TPropertyStatusData["value"]) => {
    setFilter({
      ...filter,
      status: value,
    });
    //tim cái label để set cho lúc chọn => hiển thị tiêu đề cho dd
    const foundStatus = propertyStatusData.find((item) => item.value === value);
    setSelected({
      ...selected,
      statusText: value ? foundStatus?.label! : "Any Status",
    });
    setPage(1);
  };
  const handleFilterByType = (value: TPropertyTypeData["value"]) => {
    setFilter({
      ...filter,
      type: value,
    });
    const foundType = propertyTypeData.find((item) => item.value === value);
    setSelected({
      ...selected,
      typeText: value ? foundType?.label! : "Any Status",
    });
    setPage(1);
  };
  const properties = data?.properties || [];
  const total = data?.total || 0;
  // console.log(total);
  const total_pages = Math.ceil(total / ITEMS_PER_PAGE);

  if (error) return null;

  return (
    <div className="p-5 bg-white rounded-2xl">
      <div aria-label="filter" className="flex gap-5 mb-6">
        <div className="rounded-lg gap-2.5 p-2.5 bg-grayf7 flex items-center  basis-[229px]">
          <IconSearch></IconSearch>
          <input
            type="text"
            onChange={handleFilterProperty}
            placeholder="Enter an address, city or Zip code"
            className="w-full text-xs font-medium bg-transparent outline-none"
          />
        </div>
        <Dropdown
          selected={selected.statusText}
          // onClick={handleFilterByStatus}
          data={propertyStatusData}
          renderItems={(item) => (
            <DropdownItem
              key={item.value}
              onClick={() => handleFilterByStatus(item.value)}
            >
              {item.label}
            </DropdownItem>
          )}
        ></Dropdown>
        <Dropdown
          selected={selected.typeText}
          data={propertyTypeData}
          renderItems={(item) => (
            <DropdownItem
              key={item.value}
              onClick={() => handleFilterByType(item.value)}
            >
              {item.label}
            </DropdownItem>
          )}
        ></Dropdown>
        <Dropdown selected="All Countries" />
        <Dropdown selected="All States" />
        <button className="p-2 flex items-center gap-2.5 rounded-lg bg-grayf7 text-xs font-medium text-gray80">
          <IconTune />
          <span>More</span>
        </button>
      </div>
      <div aria-label="list" className="grid grid-cols-2 gap-y-6 mb-9">
        {isLoading &&
          Array(4)
            .fill(0)
            .map((item, index) => (
              <PropertyItemLoading key={index}></PropertyItemLoading>
            ))}
        {!isLoading &&
          properties &&
          properties.length > 0 &&
          properties.map((item: PropertyItemData) => (
            <PropertyItem data={item} key={item.id}></PropertyItem>
          ))}

        {!isLoading && properties && properties.length === 0 && (
          <h1>Không Có Kết Quả Phù Hợp</h1>
        )}
      </div>

      <div
        aria-label="pagiantion"
        className="flex items-center justify-between"
      >
        {properties.length > 0 && (
          <>
            <p className="text-gray80">
              Showing {(page - 1) * ITEMS_PER_PAGE + 1} to{" "}
              {page === total_pages ? total : page * ITEMS_PER_PAGE} Properties
            </p>
            <div className="flex items-center gap-[10px]">
              {Array(total_pages)
                .fill(0)
                .map((item, index) => (
                  <button
                    key={index}
                    className={twMerge(
                      "items-center justify-center border border-gray-200 rounded-lg w-9 h-9",
                      page === index + 1
                        ? "bg-primary text-white pointer-events-none"
                        : ""
                    )}
                    onClick={() => setPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default PropertyList;
