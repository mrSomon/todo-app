export type Id = string | number;

export interface IColumn {
  id: Id;
  title: string;
  order: number;
  tasks: ITask[];
}

export interface ITask {
  id: Id;
  order: number;
  title: string;
  status: Id;
  columnId: Id;
}
