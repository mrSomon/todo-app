import React from "react";
import Item from "./Item";
import { Id, ITask } from "@/types/appType";

interface ListProps {
  id: Id;
  data: ITask[];
  title: string;
  setActiveCard: (v: Id | null) => void;
  dropHandler: (id: Id, position: number) => void;
}

const List: React.FC<ListProps> = ({ data, id, title, setActiveCard, dropHandler }) => {
  return (
    <div className="border rounded min-h-96 bg-gray-50">
      <div className="bg-gray-200 py-2">
        <h2 className="text-xl font-semibold uppercase px-5">{title}</h2>
      </div>
      <div className="flex flex-col py-5 overflow-y-auto  px-5">
        <DropableLayoutItem dropHandler={()=>dropHandler(id, 0)} />
        {data.map((item, index) =>
          item.status === id &&
        (
          <React.Fragment key={item.id}>
            <Item {...item} setActiveCard={setActiveCard} />
            <DropableLayoutItem dropHandler={()=>dropHandler(id, index + 1)} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default List;

// Компонент место для вставки
const DropableLayoutItem = ({ dropHandler }: any) => {
  const [showDrop, setShowDrop] = React.useState(false); // показывать место для вставки

  return (
    <div
      onDragEnter={() => setShowDrop(true)}
      onDragLeave={() => setShowDrop(false)}
      onDragOver={(event) => event.preventDefault()} // выключаем поведения поумолчанию
      className={`${
        showDrop ? "opacity-100 h-28" : "opacity-0"
      } transition-opacity border border-dashed rounded w-full h-10 bg-white`}
      onDrop={() => {dropHandler();setShowDrop(false)}}
    ></div>
  );
};
