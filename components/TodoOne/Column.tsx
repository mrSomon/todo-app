import React from "react";
import { IColumn, Id } from "@/types/appType";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus, Trash } from "lucide-react";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskCard from "./TaskCard";
import AddTaskForm from "../forms/AddTaskForm";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ColumnProps extends IColumn {
  onChangeTitle: (columnId: Id, title: string) => void;
  deleteColumn: (columnId: Id) => void;

  addTaskHandler: (columnId: Id, title: string) => void;
  deleteTask: (columnId: Id, taskId: Id) => void;
  editTaskHandler: (columnId: Id, taskId: Id, title: string) => void;
}

const Column: React.FC<ColumnProps> = ({
  id,
  order,
  tasks,
  title,
  onChangeTitle,
  deleteColumn,
  addTaskHandler,
  deleteTask,
  editTaskHandler
}) => {
  const [editable, setEditalbe] = React.useState<boolean>(false); // редактируемый ли
  const [titleValue, setTitleValue] = React.useState<string>(title); // значение при редактировании названии

  const tasksId = React.useMemo(() => tasks.map((t) => t.id), [tasks]); // берём в переменную id нащих задач для сортировки

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({// хук для сортировки
    id,
    data: {
      type: "Column",
      column: {
        id,
        order,
        tasks,
        title,
      },
    },
    disabled: editable,
  });

  // стили от библиотеки dnd
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  // при перетаскивании
  if (isDragging) {
    return (
      <div
        className="min-h-96 rounded bg-gray-50 w-60 max-h-[550px] border border-dashed border-rose-200"
        ref={setNodeRef}
        style={style}
      ></div>
    );
  }

  return (
    <div
      className="min-h-96 rounded bg-gray-50 w-60 max-h-[480px]"
      style={style}
      ref={setNodeRef}
    >
      <div
        {...attributes}
        {...listeners}
        className="bg-gray-400 py-1 px-2 flex flex-row items-center justify-between rounded-t"
      >
        {editable ? (
          <Input
            autoFocus
            onChange={(event) => setTitleValue(event.target.value)}
            value={titleValue}
            onKeyDown={(event) => {
              if (event.code === "Enter") {
                setEditalbe(false);
                onChangeTitle(id, titleValue);
              }
            }}
            onBlur={() => {
              if (titleValue) {
                setEditalbe(false);
                onChangeTitle(id, titleValue);
              }
            }}
          />
        ) : (
          <h3 onClick={() => setEditalbe(true)}>{title}</h3>
        )}
        <Button
          title="double click to delete the column"
          variant={"link"}
          className="cursor-pointer"
          onDoubleClick={() => deleteColumn(id)}
        >
          <Trash />
        </Button>
      </div>
      <div className="flex flex-col gap-5 px-2 py-4 h-96 overflow-y-auto">
        <SortableContext items={tasksId}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              {...task}
              deleteTask={deleteTask}
              columnId={id}
              editTaskHandler={editTaskHandler}
            />
          ))}
        </SortableContext>
      </div>
      <div className="px-2 bg-gray-50 py-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full">
              <Plus />
              Add task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add task</DialogTitle>
            </DialogHeader>
            <AddTaskForm add={(t) => addTaskHandler(id, t)} loading={false} />
            <DialogFooter>
              <DialogClose asChild>
                <Button form="add-task-form" type="submit">
                  Submit
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button variant={"outline"}>Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Column;
