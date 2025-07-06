import React from "react";
import { DrawerWithNavigation } from "../components/drawer";
import ChartsPage from "../components/charts";

export default function Home() {
  return (
    <>
      <div><DrawerWithNavigation /></div>
      <div>
      <ChartsPage/>
      </div>
    </>
  );
}
