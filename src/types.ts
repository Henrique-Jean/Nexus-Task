export type Status = 'TODO' | 'DOING' | 'DONE';

export interface Task {
    id: string;
    title: string;
    status: Status;
    timestamp: number;
}