interface PendingTasksProps {
    pending_tasks: string[];
    complete_task: (index: number) => void;
    delete_task: (index: number) => void;
}

export function Pending_tasks({ pending_tasks, complete_task, delete_task }: PendingTasksProps) {
    return (
        <div>
            <h2>Pending Tasks</h2>
            {pending_tasks.map((task, index) => (
                <div className="task-div" key={index} onClick={() => complete_task(index)} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {task}
                    <button className="delete-btn" onClick={(e) => { e.stopPropagation(); delete_task(index); }} style={{ color: 'white', backgroundColor: 'red', marginLeft: '10px', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Delete Task</button>
                </div>
            ))}
        </div>
    )
}