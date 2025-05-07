import React, { useState } from "react";

export default function Task() {
  const [input,setInput] = useState("");
    const [tasks,setTasks] = useState([]);
    const columns = [
        {key:"todo",title:"ToDo",moves:["inProgress"]},
        {key: "inProgress", title:"InProgress", moves:["todo","inProgress"]},
        {key:"complete", title:"Complete", moves:["inProgress","todo"]}
    ]
    const handleAddTask = () => {
        if(!input.trim()) return;
        const task = {
            id: Date.now(),
            text: input.trim(),
            status:"todo",
            createdAt:Date.now()
        }
        setTasks((prev) => [...prev,task]);
        setInput("")
    }
    console.log("task", tasks);

    const handleMove = (id,toStatus) => {
        setTasks((prev) => {
            return prev.map(t => (t.id === id ? {...t,status:toStatus} : t))
        })
    }
    
  return (
    <div>
       <div style={{display:"flex", justifyContent:"center", paddingTop:"10px"}}>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)}/>
       <button onClick={handleAddTask}>Add Tasks</button>
       </div> 
       <div style={{display:"flex",justifyContent:"center",gap:"10px", padding:"10px"}}>
        {columns.map((col) => (
            <div key={col.key} style={{border:"2px solid black", height:"600px",width:"400px"}}>
                <h2 style={{textAlign:"center"}}>{col.title}</h2>
                {tasks.filter((t) => t.status === col.key).sort((a,b) => a.createdAt-b.createdAt).map((task) => (
                    <div key={task.id} style={{margin:"8px 0", padding:"8px",border:"1px solid #666", borderRadius:"4px"}}>
                        <div style={{marginBottom:"6px"}}>{task.text}</div>
                        <div style={{display:"flex",gap:"2px"}}>
                            {col.moves.map((moveTo) => (
                                <button key={moveTo} onClick={() => handleMove(task.id,moveTo)} style={{padding:"4px 8px",fontSize:"12px"}}>
                                    {moveTo === "todo" ? "To Do":moveTo === "inProgress"? "In Progress":"Complete"}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        ))}
       </div>
    </div>
  )
}
