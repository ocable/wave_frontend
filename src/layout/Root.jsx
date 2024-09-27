import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";


export default function Root() {
  return (
    <>
      <main className="w-full">
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        ></meta>
        <Outlet />
      </main>
    </>
  );
}
