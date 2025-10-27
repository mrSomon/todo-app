"use client";
import React from "react";

import List from "./List";
import { IColumn, Id, ITask } from "@/types/appType";

const columnsData: IColumn[] = [
  {
    id: "TODO",
    order: 0,
    title: "TODO",
    tasks: []
  },
  {
    id: "INPROGRESS",
    order: 1,
    title: "INPROGRESS",
    tasks: []
  },
  {
    id: "DONE",
    order: 2,
    title: "DONE",
    tasks: []
  },
];

const tasksData: ITask[] = [
  {
    id: 1,
    order: 0,
    status: "TODO",
    title: "task 1",
    columnId: "TODO"
  },
  {
    id: 2,
    order: 1,
    status: "TODO",
    title: "task 2",
    columnId: "TODO"
  },
  {
    id: 3,
    order: 2,
    status: "TODO",
    title: "task 3",
    columnId: "TODO"
  },
]

const SimpleTasksDragger = () => {
  const [columns, setColumns] = React.useState<IColumn[]>(columnsData);
  const [tasks, setTasks] = React.useState<ITask[]>(tasksData);
  const [activeCard, setActiveCard] = React.useState<Id | null>(null);

  function dropHandler(status: Id, position: number) {
    if(!activeCard) return; // если нету активной (перетаскиваемой) карточки то ничего не делаем

    const taskToMove = tasks.find(t=>t.id===activeCard); // находим и сохраняем объект который перетаскиваем
    if(!taskToMove) return; // если переменная пуста то ничего не делаем
    const updatedTasks = tasks.filter(t=> t.id!=activeCard); // удаляем активированную карточку
    // добавляем нашу таску в позицию
    updatedTasks.splice(position, 0, {
      ...taskToMove, status,columnId: status
    });
    setTasks(updatedTasks);
  }

  return (
    <div className="grid grid-cols-3 gap-5">
      {columns.map((c) => (
        <List key={c.id} title={c.title} id={c.id} data={tasks} setActiveCard={setActiveCard} dropHandler={dropHandler} />
      ))}
    </div>
  );
};

export default SimpleTasksDragger;


