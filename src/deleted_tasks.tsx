interface DeletedTask {
    text: string;
    origin: 'pending' | 'completed';
}

interface DeletedTasksProps {
    deleted_tasks: DeletedTask[];
    restore_task: (index: number) => void;
    permanently_delete_task: (index: number) => void;
}

export function Deleted_tasks({ deleted_tasks, restore_task, permanently_delete_task }: DeletedTasksProps) {
    return (
        <div>
            <h2>Deleted Tasks</h2>
            {deleted_tasks.map((task, index) => (
                <div className="task-div" key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{task.text}</span>
                    <div>
                        <button className="restore-btn" onClick={() => restore_task(index)} style={{ marginRight: '5px', backgroundColor: 'green', color: 'white' }}>Restore</button>
                        <button className="delete-btn" onClick={() => permanently_delete_task(index)} style={{ backgroundColor: 'red', color: 'white' }}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    )
}