import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IconNotification, IconSearch } from "../icons";
import { UserButton, useAuth } from "@clerk/nextjs";

const Topbar = () => {
  return (
    <div className="flex items-center justify-between px-5 py-4 bg-grayfc">
      <div className="flex items-center gap-[82px] flex-1">
        <Logo />
        <Search />
      </div>
      <User />
    </div>
  );
};

export default Topbar;

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <Image src="/logo-full.png" alt="Yariga" width={173} height={35} />
    </Link>
  );
}

function Search() {
  return (
    <div className=" px-[10px] rounded-lg bg-grayf4 flex items-center gap-2 flex-[0_1_405px] h-[38px]">
      {/* @ts-ignore */}
      <IconSearch />
      <input
        type="text"
        placeholder="Search Property, Custormer etc"
        className="w-full text-xs font-normal bg-transparent outline-none text-primaryText placeholder:text-gray80"
      />
    </div>
  );
}

function User() {
  const { userId } = useAuth();
  return (
    <div className="flex items-center flex-shrink-0 gap-5">
      <span className="flex-shrink-0">
        {/* @ts-ignore */}
        <IconNotification />
      </span>

      <div className="flex items-center flex-shrink-0 gap-[10px]">
        {userId ? (
          <>
            <UserButton afterSignOutUrl="/" />{" "}
            <div className="flex flex-col">
              <h4 className="text-sm font-semibold text-primary">
                Tran Duc Manh
              </h4>
              <span className="text-sm font-semibold text-gray80 ">
                Company Manager
              </span>
            </div>
          </>
        ) : (
          <>
            <Link
              href="/sign-in"
              className="p-3 text-white rounded-lg bg-primary"
            >
              Sign in
            </Link>
            <Link href="/sign-up">Sign up</Link>
          </>
        )}
      </div>
    </div>
  );
}
