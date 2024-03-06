export interface IButton {
  label: string;
  className?: string;
  onClick: () => void;
}
export interface ITask {
  taskName: string;
  status: string;
}

export interface IBoard {
  name: string;
  tasks: ITask[];
}
