import { LayoutMain } from "@/components/layout";
import { UserProfile } from "@clerk/nextjs";
import React from "react";

const MyProfile = () => {
  return (
    <LayoutMain>
      <UserProfile></UserProfile>
    </LayoutMain>
  );
};

export default MyProfile;
