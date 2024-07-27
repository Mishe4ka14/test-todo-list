export interface ITodo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  date: string;
}

export const ItemTypes = {
  TODO: 'todo',
};