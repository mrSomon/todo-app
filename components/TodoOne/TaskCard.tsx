import React from "react";
import { Id, ITask } from "@/types/appType";
import { Button } from "../ui/button";
import { Edit, MoreHorizontalIcon, Trash } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditTaskForm from "../forms/EditTaskForm";

interface TaskCardProps extends ITask {
  deleteTask: (columnId: Id, taskId: Id) => void;
  editTaskHandler: (columnId: Id, taskId: Id, title: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  id,
  order,
  status,
  title,
  deleteTask,
  columnId,
  editTaskHandler,
}) => {
  const [showEditDialog, setShowEditDialog] = React.useState<boolean>(false);
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: {
      type: "Task",
      columnId,
      task: {
        id,
        title,
        order,
      },
    },
    disabled: showEditDialog,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="min-h-16 group/task border rounded px-2 py-3 bg-white flex flex-row justify-between"
      ></div>
    );
  }

  return (
    <div
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="min-h-16 group/task border rounded px-2 py-3 bg-white flex flex-row justify-between"
    >
      <div>{title}</div>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            aria-label="Open menu"
            size="icon-sm"
            // className="hidden group-hover/task:flex"
          >
            <MoreHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={() => setShowEditDialog(true)}>
              <Edit /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => deleteTask(columnId, id)}>
              <Trash /> Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add task</DialogTitle>
          </DialogHeader>
          <EditTaskForm edit={(t) => editTaskHandler(columnId, id, t)} />
          <DialogFooter>
            <DialogClose asChild >
              <Button form="edit-task-form" type="submit">
                Submit
              </Button>
            </DialogClose>
            <DialogClose asChild >
              <Button variant={"outline"}>Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskCard;
