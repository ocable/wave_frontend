import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import "../index.css";
import Navbar from "./Navbar";

export default function Root() {
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState("/");

  useEffect(() => {
    setActivePage(window.location.pathname);
  }, []);

  console.log(activePage);

  return (
    <>
      <main className="w-full">
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        ></meta>
        <Outlet context={[activePage, setActivePage]} />
      </main>
      <Navbar activePage={activePage} setActivePage={setActivePage} />
    </>
  );
}
