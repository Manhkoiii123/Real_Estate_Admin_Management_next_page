import HeadContent from "@/components/HeadContent";
import { LayoutMain } from "@/components/layout";
import { addNewProperty } from "@/store/property.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

const PropertyCreatePage = () => {

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addNewProperty,
    onSuccess: () => {
      //như kiểu tự động reload lại lấy dl mới
      // qeuery key trùng với cái bên kia
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
  });

  const handleCreateNewProperty = () => {
    mutation.mutate(); // do cái hàm addnewP kia ko truyền cái gì vào cả
  };
  return (
    <LayoutMain>
      <HeadContent title="Properties add new" />
      <button onClick={handleCreateNewProperty}>Add new property</button>
    </LayoutMain>
  );
};

export default PropertyCreatePage;
