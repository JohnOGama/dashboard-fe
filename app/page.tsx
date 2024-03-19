"use client";

import CardData from "@/components/Dashboard/CardData";

const Home = () => {
  return (
    <div className="">
      <h1>Dashboard</h1>
      <div className="mt-5 flex gap-5">
        <CardData label="Websites" />
        <CardData label="APIs" />
        <CardData label="Totals" />
      </div>
    </div>
  );
};

export default Home;
