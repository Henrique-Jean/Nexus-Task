import React, { useState, useEffect } from 'react';
import { Plus, Trash2, ArrowRight, ArrowLeft, Layout } from 'lucide-react';
import type { Task, Status } from './types';


interface ColumnProps {
  title: string;
  status: Status;
  color: string;
  tasks: Task[];
  deleteTask: (id: string) => void;
  moveTask: (id: string, newStatus: Status) => void;
}

const Column = ({ title, status, color, tasks, deleteTask, moveTask }: ColumnProps) => {
  const columnTasks = tasks.filter(t => t.status === status);

  return (
    <div className="flex-1 min-w-[300px] bg-nexus-card/50 rounded-xl p-4 border border-slate-700/50 flex flex-col gap-4">
      <div className={`flex items-center gap-2 pb-3 border-b border-slate-700 ${color}`}>
        <h2 className="font-bold uppercase tracking-wider text-sm">{title}</h2>
        <span className="bg-slate-800 text-xs px-2 py-1 rounded-full text-slate-400">
          {columnTasks.length}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {columnTasks.map(task => (
          <div key={task.id} className="bg-nexus-dark p-4 rounded-lg border border-slate-700 shadow-sm hover:border-nexus-primary/50 transition-all group relative">
            <p className="font-medium text-slate-200 mb-3">{task.title}</p>
            
            <div className="flex justify-between items-center mt-2">
              <button 
                onClick={() => deleteTask(task.id)}
                className="text-slate-500 hover:text-red-400 transition-colors p-1"
                title="Deletar"
              >
                <Trash2 size={16} />
              </button>

              <div className="flex gap-2">
                {status !== 'TODO' && (
                  <button 
                    onClick={() => moveTask(task.id, status === 'DONE' ? 'DOING' : 'TODO')}
                    className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition-colors"
                  >
                    <ArrowLeft size={16} />
                  </button>
                )}
                
                {status !== 'DONE' && (
                  <button 
                    onClick={() => moveTask(task.id, status === 'TODO' ? 'DOING' : 'DONE')}
                    className="p-1 hover:bg-slate-700 rounded text-nexus-primary hover:text-white transition-colors"
                  >
                    <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        {columnTasks.length === 0 && (
          <div className="text-center py-8 text-slate-600 text-sm border-2 border-dashed border-slate-800 rounded-lg">
            Vazio
          </div>
        )}
      </div>
    </div>
  );
};


function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('nexus-tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    localStorage.setItem('nexus-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const task: Task = {
      id: crypto.randomUUID(),
      title: newTask,
      status: 'TODO',
      timestamp: Date.now(),
    };

    setTasks([...tasks, task]);
    setNewTask('');
  };

  const moveTask = (id: string, newStatus: Status) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen p-8 max-w-[1600px] mx-auto">
      <header className="mb-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-nexus-primary/10 rounded-xl">
            <Layout className="text-nexus-primary" size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              NEXUS_TASK
            </h1>
            <p className="text-slate-500 text-sm">Sistema de Gestão Persistente</p>
          </div>
        </div>

        <form onSubmit={handleAddTask} className="flex gap-2 w-full md:w-auto">
          <input 
            type="text" 
            placeholder="Nova missão..." 
            className="bg-nexus-card border border-slate-700 rounded-lg px-4 py-3 min-w-[300px] focus:outline-none focus:border-nexus-primary text-slate-200"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button type="submit" className="bg-nexus-primary hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-bold transition-all flex items-center gap-2">
            <Plus size={20} /> Adicionar
          </button>
        </form>
      </header>

      <div className="flex flex-col lg:flex-row gap-6 overflow-x-auto pb-4">
        <Column title="Para Fazer" status="TODO" color="text-slate-400" tasks={tasks} deleteTask={deleteTask} moveTask={moveTask} />
        <Column title="Em Progresso" status="DOING" color="text-nexus-primary" tasks={tasks} deleteTask={deleteTask} moveTask={moveTask} />
        <Column title="Concluído" status="DONE" color="text-emerald-400" tasks={tasks} deleteTask={deleteTask} moveTask={moveTask} />
      </div>
    </div>
  );
}

export default App;