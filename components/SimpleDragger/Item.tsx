"use client";
import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "../ui/input";
import { Id, ITask } from "@/types/appType";

interface ItemProps extends ITask {
  setActiveCard: (v: Id | null) => void;
}

const Item: React.FC<ItemProps> = ({
  id,
  order,
  status,
  title,
  setActiveCard,
}) => {
  const [editable, setEditable] = React.useState<boolean>(false);

  return (
    <Card
      draggable
      onDragStart={() => setActiveCard(id)}
      onDragEnd={() => setActiveCard(null)}
    >
      <CardHeader>
        {editable ? (
          <Input value={title} />
        ) : (
          <CardTitle
            onDoubleClick={() => {
              setEditable(true);
            }}
          >
            {title}
          </CardTitle>
        )}
      </CardHeader>
    </Card>
  );
};

export default Item;
