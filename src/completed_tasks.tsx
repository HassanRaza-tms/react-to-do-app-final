interface CompletedTasksProps {
    completed_tasks: string[];
    delete_task: (index: number) => void;
}

export function Completed_tasks({ completed_tasks, delete_task }: CompletedTasksProps) {
    return (
        <div>
            <h2>Completed Tasks</h2>
            {completed_tasks.map((task, index) => (
                <div className="task-div" key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {task}
                    <button className="delete-btn" onClick={() => delete_task(index)} style={{ color: 'white', backgroundColor: 'red', marginLeft: '10px', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Delete Task</button>
                </div>
            ))}
        </div>
    )
}