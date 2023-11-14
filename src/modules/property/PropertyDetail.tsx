import HeadContent from "@/components/HeadContent";
import { Button } from "@/components/button";
import { IconCall, IconMessage, IconRating } from "@/components/icons";
import Spinner from "@/components/loading/Spinner";
import { getProperty } from "@/store/property.service";

import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const PropertyDetail = () => {
  const router = useRouter();
  const id = parseInt(router.query.id as string);
  const { data, isLoading, error } = useQuery({
    queryKey: ["properties", id],
    queryFn: () => getProperty(id),
    enabled: !!id, // khi nào có id mới chạy !! là convert sang boolean
  });
  const facilities = Object.entries(data?.facility || {});
  const agent = data?.agent;
  const renderFacilitiIcon = (name: string) => {
    //cách 1 điều kiện để render ra ntn là cái name tức là cái item[1] phải gioogns hệt với cái tên comp icons
    const Icon = dynamic(
      () => import(`../../components/icons/Icon${name.replace(/ /, "")}`)
    );
    return <Icon></Icon>;
  };
  if (!data || error) return null;
  if (isLoading) return <Spinner />;

  return (
    <>
      <HeadContent title={data.title}></HeadContent>
      <div className="p-5 bg-grayfc rounded-2xl">
        <Link
          href="/properties"
          className="flex items-center gap-5 mb-6 text-xl font-medium"
        >
          <span>
            <svg
              width="9"
              height="16"
              viewBox="0 0 9 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.79292 0.792893C8.18345 1.18342 8.18345 1.81658 7.79292 2.20711L2.00003 8L7.79292 13.7929C8.18345 14.1834 8.18345 14.8166 7.79292 15.2071C7.4024 15.5976 6.76923 15.5976 6.37871 15.2071L0.585817 9.41422C-0.195233 8.63317 -0.195231 7.36683 0.585817 6.58579L6.37871 0.792893C6.76923 0.402369 7.4024 0.402369 7.79292 0.792893Z"
                fill="#11142D"
              />
            </svg>
          </span>
          Details
        </Link>
        <div className="grid grid-cols-[2fr_1fr] gap-6">
          <div aria-label="left">
            <div aria-label="gallery" className="mb-4">
              <div className="grid grid-cols-[3fr_1fr] grid-rows-[162px_162px] gap-5">
                {data.image && data.image[0] && (
                  <div className="relative  row-[1/-1] col-[1/2]">
                    <Image
                      src={data.image[0]}
                      alt=""
                      fill
                      //   col-[1/2] nghĩa cột bắt đầu từ 1 và kết thúc tịa 2
                      //row-[1/-1] nghĩa là từ đầu đế cuoois cùng
                      className="object-cover w-full h-full rounded-lg"
                    />
                  </div>
                )}
                {data.image &&
                  data.image.slice(1, 3).map((item, index) => (
                    <div className="relative" key={index}>
                      <Image
                        src={item}
                        fill
                        alt=""
                        className="object-cover rounded-lg row-[1/2] h-full"
                      />
                      {index === 1 && data.image && data?.image?.length > 3 && (
                        <div className="absolute inset-0 flex items-center justify-center text-lg font-medium text-white bg-black bg-opacity-50 rounded-lg overlay">
                          +{data.image.length - 3}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
            <div>
              <div className="grid grid-cols-[3fr_1fr] gap-6 mb-5">
                <div className="flex flex-col gap-2">
                  <span className="block text-lg font-medium">{data.type}</span>
                  <h1 className="text-xl font-medium">{data.title}</h1>
                  <div className="flex items-center gap-1 text-sm text-gray80">
                    <span></span>
                    <span>{data.address}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div>
                    {Array(Math.floor(data.rating || 0))
                      .fill(0)
                      .map((item, index) => (
                        <span key={index} className="inline-block w-6 h-6">
                          <IconRating></IconRating>
                        </span>
                      ))}
                  </div>
                  <div className="text-base font-medium">Price</div>
                  <div>
                    <strong className="text-2xl font-bold text-primary">
                      $ {data.price}
                    </strong>
                    <span className="text-sm text-gray80"> For One Day</span>
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-medium mb-7">Facillity</h3>
              <div className="grid grid-cols-4 gap-5 mb-6">
                {facilities.length > 0 &&
                  facilities.map((item, index) => (
                    <div className="flex items-center gap-1" key={index}>
                      <span>{renderFacilitiIcon(item[0])}</span>
                      <span className="text-sm font-medium">
                        {item[1]} {item[0]}
                      </span>
                    </div>
                  ))}
              </div>
              <h3 className="text-lg font-medium mb-2.5">Description</h3>
              <div className="text-sm leading-normal text-gray80">
                {data.description}
              </div>
            </div>
          </div>
          <div aria-label="right" className="flex flex-col gap-5">
            <div
              aria-label="agent"
              className="flex flex-col items-center justify-center px-6 py-4 border rounded-lg border-graye4 bg-grayfc"
            >
              <div className="relative w-[90px] aspect-square">
                <Image
                  fill
                  src="https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80"
                  className="object-cover mb-4 rounded-full "
                  alt=""
                />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{agent?.name}</h3>
              <div className="text-sm text-gray80">{agent?.address}</div>
              <div className="my-2 font-semibold">
                {agent?.properties} Propertis
              </div>
              <div className="grid grid-cols-2 gap-5 mt-6">
                <Button
                  variant="primary"
                  size="md"
                  className="rounded-[5px] px-4"
                >
                  <span>
                    <IconMessage />
                  </span>
                  <span>Message</span>
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  className="rounded-[5px] px-4"
                >
                  <span>
                    <IconCall />
                  </span>
                  <span>Call</span>
                </Button>
              </div>
            </div>
            <div aria-label="map">
              <Image src="/map.png" alt="" width={400} height={400} />
            </div>
            <div>
              <Button
                variant="primary"
                size="lg"
                className="w-full rounded-[10px] h-12"
              >
                Book now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyDetail;