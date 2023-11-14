import React, { useState } from "react";
import PropertyItem, { PropertyItemLoading } from "./PropertyItem";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
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
import { debounce, last } from "lodash";
import { Button } from "@/components/button";
import { DropdownItem } from "@/components/dropdown/Dropdown";

const PropertyListLoadmore = () => {
  const [selected, setSelected] = useState({
    statusText: "Any Status",
    typeText: "Any Type",
    countryText: "All Countries",
    stateText: "All States",
  });
  const [filter, setFilter] = useState<TFilter>({
    text: "",
    status: "",
    country: "",
    type: "",
    state: "",
  });
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["properties", filter.text, filter.status, filter.type],
    queryFn: ({ pageParam = 0 }) => {
      return getProperties({
        text: filter.text,
        status: filter.status,
        type: filter.type,
        limit: ITEMS_PER_PAGE,
        offset: pageParam,
        //mỗi lần ấn thì lấy 6
        // mỗi lần ấn thì cái pageparam tự cập nhật lên là 0, 6 12 do cái return ở hàm dưới....
      });
    },
    getNextPageParam: (lastPage) => {
      //console.log(lastPage); // là vừa fetch ra
      // return 1;
      // nếu retrun 0 thì cái laod ra nó sẽ là cái cũ ví dụ 1 2 => 1 2 1 2
      // nếu là return  1 thì nó sẽ load thêm 6 cái tiếp theo nữa ví dụ 1 2 => 1 2 2 3 => đây là set cho cái pageparam
      const properties = lastPage?.properties || [];
      if (properties?.length < ITEMS_PER_PAGE) {
        return undefined;
      }
      return properties.length + (lastPage?.offset || 0); // phầm return này  là set cho cái page parma  = vị trí lấy mới
    },
    refetchOnWindowFocus: false,
    cacheTime: 0,
    staleTime: 0,
    enabled: true,
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
  };
  const handleFilterByTypes = (value: TPropertyTypeData["value"]) => {
    setFilter({
      ...filter,
      type: value,
    });
    const foundType = propertyTypeData.find((item) => item.value === value);
    setSelected({
      ...selected,
      typeText: value ? foundType?.label! : "Any Status",
    });
  };
  //load more với reactquery
  const handleLoadMore = () => {
    fetchNextPage();
  };
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
              onClick={() => handleFilterByTypes(item.value)}
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
        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page?.properties &&
              page?.properties.length > 0 &&
              page?.properties.map((item: PropertyItemData) => (
                <PropertyItem data={item} key={item.id}></PropertyItem>
              ))}
          </React.Fragment>
        ))}
      </div>
      {hasNextPage && (
        <Button
          isLoading={isFetchingNextPage || isFetching}
          className="mx-auto text-sm font-medium rounded-lg w-30"
          onClick={handleLoadMore}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          Load more
        </Button>
      )}
    </div>
  );
};
export default PropertyListLoadmore;
