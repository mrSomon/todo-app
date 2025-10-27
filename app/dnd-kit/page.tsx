"use client";
import React from "react";
import CreateColumnForm from "@/components/forms/CreateColumnForm";
import { IColumn, Id, ITask } from "@/types/appType";
import Column from "@/components/TodoOne/Column";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "@/components/TodoOne/TaskCard";
import { Button } from "@/components/ui/button";
import { CheckCheck, Eraser, Save, SaveAll, SaveOff } from "lucide-react";
import { toast } from "sonner";

const oldData = localStorage.getItem("columns");
const autoSave = localStorage.getItem("autoSave");

const ToDoOnePage = () => {
  const [columns, setColumns] = React.useState<IColumn[]>(
    oldData ? JSON.parse(oldData) : []
  ); // состаяние наших столбцов
  const [activeColumn, setActiveColumn] = React.useState<IColumn | null>(null); // сохраняем столбец вовремя перемещения
  const [activeTask, setActiveTask] = React.useState<ITask | null>(null); // сохраняем задачу вовремя перемещения
  const [isAutoSave, setIsAutoSave] = React.useState<boolean>(
    autoSave ? JSON.parse(autoSave) : false
  );
  const [saved, setSaved] = React.useState<boolean>(true);

  // берём в переменную id нащих столбцов для сортировки
  const columnsId = React.useMemo(
    () => columns.map((col) => col.id),
    [columns] // при изменении стэйта "columns" запускается функция
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10, //
      },
    })
  );

  React.useEffect(() => {
    // проверяем если авто-сохранение включён
    if (isAutoSave) {
      localStorage.setItem("columns", JSON.stringify(columns));
      setSaved(true);
    } else {
      // если есть изменения то кнопка сохранения меняется
      setSaved(false);
    }
  }, [columns, isAutoSave]);

  // сохраняем данные в local-storage
  function save() {
    localStorage.setItem("columns", JSON.stringify(columns));
    toast.success("Saved to local-storage!");
    setSaved(true);
  }

  // переключатель авто сохранения local-storage
  function toggleAutoSave() {
    setIsAutoSave((prev) => {
      localStorage.setItem("autoSave", JSON.stringify(!prev));
      return !prev;
    });
  }

  // очистить всё
  function clearAll() {
    setColumns([]);
    localStorage.removeItem("columns");
  }

  // создаёт "column"
  function createColumn() {
    const newColumn: IColumn = {
      id: new Date().getMilliseconds(), // генерирую уникальный id с помощю даты
      title: `Column ${columns.length + 1}`,
      order: columns.length, // определение где должен находиться column
      tasks: [], // задачи
    };
    setColumns((prev) => [...prev, newColumn]); // добавляем в массив наш новый column
  }

  // меняет название "column"
  function changeColumnTitle(columnId: Id, title: string) {
    setColumns(
      (prev) =>
        prev.map((p) => (p.id === columnId ? { ...p, title } : { ...p })) // ищем столбец по id и меняем его название а если не найдено то возвращаем в массив объект с помощю спред оператора (...)
    );
  }

  // удаляет "column"
  function deleteColumn(columnId: Id) {
    setColumns((prev) => prev.filter((p) => p.id != columnId)); // фильтруем существующие столбцы если такое id не будет даст значение true и это значит что объект остаётся иначе удалиться
  }

  // начало перетаскивание элемента
  function onDragStartHandler(event: DragStartEvent) {
    // проверяем что мы перетаскиваем "column" или "task"
    // проверяем что мы перетаскиваем "column"
    if (event.active.data.current?.type === "Column") {
      // сохраняем в стэйт наш объект который мы указали в хуке "useSortable"
      setActiveColumn(event.active.data.current.column);
      return;
    }
    // проверяем что мы перетаскиваем "task"
    if (event.active.data.current?.type === "Task") {
      // сохраняем в стэйт наш объект который мы указали в хуке "useSortable"
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  // при завершении перетескивания
  function onDragEndHandler(event: DragEndEvent) {
    if (!event.over) return;
    const activeId = event.active.id;
    const overId = event.over.id;

    if (activeId === overId) return;

    // Перетаскивание колонок
    if (event.active.data.current?.type === "Column") {
      setColumns((prev) => {
        const activeColumnIndex = prev.findIndex((col) => col.id === activeId);
        const overColumnIndex = prev.findIndex((col) => col.id === overId);

        return arrayMove(prev, activeColumnIndex, overColumnIndex); // функция из библиотеки "dnd-kit" которая перемешает элемент массива на другую позицию. Возвращает новый массив с элементом, перемещённым на новую позицию.
      });
    }

    // обнуляем наши выбрание элементы
    setActiveColumn(null);
    setActiveTask(null);
  }

  function onDragOver(event: DragOverEvent) {
    if (!event.over) return;
    const activeId = event.active.id;
    const overId = event.over.id;

    if (activeId === overId) return;

    // Перетаскивание задач
    if (event.active.data.current?.type === "Task") {
      const activeColId = event.active.data.current?.columnId;
      const overColId = event.over.data.current?.columnId || event.over.id;
      const activeCol = columns.find((c) => c.id === activeColId)!;
      const overCol = columns.find((c) => c.id === overColId)!;

      const activeIndex = activeCol.tasks.findIndex((t) => t.id === activeId);
      const overIndex = overCol.tasks.findIndex((t) => t.id === overId);

      let newColumns: IColumn[] = [];

      // Перемещение внутри одной колонки
      if (activeColId === overColId) {
        const newTasks = arrayMove(activeCol.tasks, activeIndex, overIndex);
        const updatedCol = { ...activeCol, tasks: newTasks };
        newColumns = columns.map((c) =>
          c.id === activeCol.id ? updatedCol : c
        );
      } else {
        // Перемещение между колонками

        const [movedTask] = activeCol.tasks.splice(activeIndex, 1);
        overCol.tasks.splice(overIndex + 1, 0, movedTask);

        newColumns = columns.map((c) => {
          if (c.id === activeCol.id) return { ...activeCol };
          if (c.id === overCol.id) return { ...overCol };
          return c;
        });
      }
      setColumns(newColumns);
    }
  }

  // добавление задачи
  function addTaskHandler(columnId: Id, title: string) {
    setColumns((prev) => {
      return prev.map((p) =>
        p.id === columnId
          ? {
              ...p,
              tasks: [
                ...p.tasks,
                {
                  title,
                  id: new Date().getMilliseconds(),
                  order: 1,
                  status: columnId,
                  columnId,
                },
              ],
            }
          : p
      );
    });
  }

  // удаление задачи
  function deleteTask(columnId: Id, taskId: Id) {
    setColumns((prev) => {
      return prev.map((p) =>
        p.id === columnId
          ? { ...p, tasks: p.tasks.filter((t) => t.id !== taskId) }
          : p
      );
    });
  }

  // редактирование название задачи
  function editTaskHandler(columnId: Id, taskId: Id, title: string) {
    // находим нужный колум и задачу этого колума и меняем название найденной задачи
    setColumns((prev) => {
      return prev.map((p) =>
        p.id === columnId
          ? {
              ...p,
              tasks: p.tasks.map((t) =>
                t.id === taskId ? { ...t, title } : t
              ),
            }
          : p
      );
    });
  }

  return (
    <div>
      <div className="flex flex-row justify-end my-5">
        <Button
          disabled={saved}
          className="mr-2"
          title="save"
          onClick={() => save()}
        >
          {saved ? <CheckCheck /> : <SaveAll />}
        </Button>
        <Button
          className="mr-2"
          title={isAutoSave ? "auto-save off" : "auto-save on"}
          onClick={toggleAutoSave}
        >
          {isAutoSave ? <SaveOff /> : <Save />}
        </Button>
        <Button title="clear all" onClick={clearAll}>
          <Eraser />
        </Button>
      </div>
      <DndContext
        sensors={sensors}
        onDragStart={onDragStartHandler}
        onDragEnd={onDragEndHandler}
        onDragOver={onDragOver}
      >
        <div className="flex min-h-screen w-full overflow-x-auto overscroll-y-none py-10 gap-5">
          <SortableContext items={columnsId}>
            {columns.map((column) => (
              <Column
                key={column.id}
                {...column}
                onChangeTitle={changeColumnTitle}
                deleteColumn={deleteColumn}
                addTaskHandler={addTaskHandler}
                deleteTask={deleteTask}
                editTaskHandler={editTaskHandler}
              />
            ))}
          </SortableContext>
          <CreateColumnForm onClick={createColumn} />
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <Column
                {...activeColumn}
                deleteColumn={deleteColumn}
                onChangeTitle={changeColumnTitle}
                addTaskHandler={addTaskHandler}
                deleteTask={deleteTask}
                editTaskHandler={editTaskHandler}
              />
            )}
            {activeTask && (
              <TaskCard
                editTaskHandler={editTaskHandler}
                {...activeTask}
                deleteTask={deleteTask}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
};

export default ToDoOnePage;
