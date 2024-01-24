import React, { useState } from 'react';
import axios from "axios";

const Create = () => {
    const [task, setTask] = useState();

    const handleAdd = () => {
        axios.post("http://localhost:8080/add", { task: task })
            .then((result) => {
                
                console.log(result);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className=''>
            <input
                type='text'
                className='w-[300px] p-3 border-2 border-solid'
                placeholder='Enter Task'
                onChange={(e) => setTask(e.target.value)}
            />
            <button onClick={handleAdd} className='p-3 bg-black text-white cursor-pointer'>Add</button>
        </div>
    );
};

export default Create;
