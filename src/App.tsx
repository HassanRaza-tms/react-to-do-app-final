import { useState, type MouseEvent } from 'react';
import './App.css';
import { All_tasks } from './all_tasks.tsx';
import { Pending_tasks } from './pending_tasks.tsx';
import { Completed_tasks } from './completed_tasks.tsx';
import { Deleted_tasks } from './deleted_tasks.tsx';

export interface DeletedTask {
  text: string;
  origin: 'pending' | 'completed';
}

function App() {
  const [activeTab, setActiveTab] = useState('add');

  const [task, setTask] = useState('');

  const [pending_tasks_list, setPendingTasksList] = useState<string[]>([]);
  const [completed_tasks_list, setCompletedTasksList] = useState<string[]>([]);
  const [deleted_tasks_list, setDeletedTasksList] = useState<DeletedTask[]>([]);

  const all_tasks_list = [...pending_tasks_list, ...completed_tasks_list];

  const add_task = (e: MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) => {
    if (e.type === 'click' || (e.type === 'keydown' && (e as React.KeyboardEvent).key === 'Enter')) {
      e.preventDefault();
      if (task) {
        setPendingTasksList([...pending_tasks_list, task]);
        setTask(''); // Clear input after adding
      }
    }
  }



  console.log(pending_tasks_list);
  console.log(all_tasks_list);
  console.log(completed_tasks_list);
  console.log(deleted_tasks_list);

  const complete_task = (index: number) => {
    const taskToComplete = pending_tasks_list[index];
    setPendingTasksList(pending_tasks_list.filter((_, i) => i !== index));
    setCompletedTasksList([...completed_tasks_list, taskToComplete]);
  };

  const delete_pending_task = (index: number) => {
    const taskToDelete = pending_tasks_list[index];
    setPendingTasksList(pending_tasks_list.filter((_, i) => i !== index));
    setDeletedTasksList([...deleted_tasks_list, { text: taskToDelete, origin: 'pending' }]);
  };

  const delete_completed_task = (index: number) => {
    const taskToDelete = completed_tasks_list[index];
    setCompletedTasksList(completed_tasks_list.filter((_, i) => i !== index));
    setDeletedTasksList([...deleted_tasks_list, { text: taskToDelete, origin: 'completed' }]);
  };

  const delete_from_all = (index: number) => {
    if (index < pending_tasks_list.length) {
      delete_pending_task(index);
    } else {
      delete_completed_task(index - pending_tasks_list.length);
    }
  };

  const restore_task = (index: number) => {
    const taskToRestore = deleted_tasks_list[index];
    setDeletedTasksList(deleted_tasks_list.filter((_, i) => i !== index));
    if (taskToRestore.origin === 'pending') {
      setPendingTasksList([...pending_tasks_list, taskToRestore.text]);
    } else {
      setCompletedTasksList([...completed_tasks_list, taskToRestore.text]);
    }
  };

  const permanently_delete_task = (index: number) => {
    setDeletedTasksList(deleted_tasks_list.filter((_, i) => i !== index));
  };

  return (
    <>
      <section className="the-only-sec">
        <h1 className="heading-main" >To Do Applictaion</h1>
        <div className="div-for-buttons">
          <a className="frst_btn" href="#" onClick={(e) => { e.preventDefault(); setActiveTab('add'); }}>Add Tasks</a>
          <a className="scnd_btn" href="#" onClick={(e) => { e.preventDefault(); setActiveTab('all'); }}>All Tasks</a>
          <a className="thrd_btn" href="#" onClick={(e) => { e.preventDefault(); setActiveTab('pending'); }}>Pending Tasks</a>
          <a className="frth_btn" href="#" onClick={(e) => { e.preventDefault(); setActiveTab('completed'); }}>Completed Tasks</a>
          <a className="fifth_btn" href="#" onClick={(e) => { e.preventDefault(); setActiveTab('deleted'); }}>Deleted Tasks</a>
        </div>
        <div className='div-for-other-purpose'>
          {activeTab === 'add' && (
            <div className='for_adding_tasks'>
              <input type="text" placeholder="Enter Task's Title Here" value={task} onChange={(e) => setTask(e.target.value)} onKeyDown={add_task} />
              <button className='add_task_btn' onClick={add_task}>ADD TASKS</button>
            </div>
          )}
          {activeTab === 'all' && (
            <div className='for_all_tasks'>
              <All_tasks all_tasks={[
                ...pending_tasks_list.map(t => ({ text: t, status: 'pending' as const })),
                ...completed_tasks_list.map(t => ({ text: t, status: 'completed' as const }))
              ]} delete_task={delete_from_all} />
            </div>
          )}
          {activeTab === 'pending' && (
            <div className='for_pending_tasks'>
              <Pending_tasks pending_tasks={pending_tasks_list} complete_task={complete_task} delete_task={delete_pending_task} />
            </div>
          )}
          {activeTab === 'completed' && (
            <div className='for_completed_tasks'>
              <Completed_tasks completed_tasks={completed_tasks_list} delete_task={delete_completed_task} />
            </div>
          )}
          {activeTab === 'deleted' && (
            <div className='for_deleted_tasks'>
              <Deleted_tasks deleted_tasks={deleted_tasks_list} restore_task={restore_task} permanently_delete_task={permanently_delete_task} />
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default App
