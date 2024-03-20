import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

type CardDataProps = {
  label: string;
};

const CardData: React.FC<CardDataProps> = ({ label }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-sm text-gray-500">{label}</CardTitle>
      </CardHeader>
      <CardContent className="text-4xl font-bold text-gray-500">20</CardContent>
    </Card>
  );
};

export default CardData;
