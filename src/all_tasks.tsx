interface TaskWithStatus {
    text: string;
    status: 'pending' | 'completed';
}

interface AllTasksProps {
    all_tasks: TaskWithStatus[];
    delete_task: (index: number) => void;
}

export function All_tasks({ all_tasks, delete_task }: AllTasksProps) {

    return (

        <>
            <h2>All Tasks</h2>
            {all_tasks.map((task, index) => (
                <div className="task-div" key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ textDecoration: task.status === 'completed' ? 'line-through' : 'none' }}>{task.text}</span>
                    <button className="delete-btn" onClick={() => delete_task(index)} style={{ color: 'white', backgroundColor: 'red', marginLeft: '10px', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Delete Task</button>
                </div>
            ))}
        </>

    )

}