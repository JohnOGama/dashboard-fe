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
  count?: number;
};

const CardData: React.FC<CardDataProps> = ({ label, count = 20 }) => {
  return (
    <Card className="w-full ">
      <CardHeader>
        <CardTitle className="text-sm text-gray-500">{label}</CardTitle>
      </CardHeader>
      <CardContent className="text-4xl font-bold text-gray-500">
        {count}
      </CardContent>
    </Card>
  );
};

export default CardData;
