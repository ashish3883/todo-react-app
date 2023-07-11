import React from 'react'
import { useState, useReducer, /*useCallback*/ } from 'react'

function getFormatedDate(){
    const t = new Date();
    return t.toDateString()+' | '+t.toTimeString().split(' ')[0]
}

function ToDoItem(props){
    return(
        <>
            <ul className="list-group">
                <li className="list-group-item my-1"><h5>
                <button 
                    type="button" 
                    class="btn btn-danger" style={{display: 'inline-block', fontSize:'15px', cursor: 'pointer'} }
                    onClick={()=>{
                        props.dispatcher({
                            type:'REMOVE_ITEM',
                            id:props.id
                        })
                    }}
                    >
                        <strong>X</strong>
                        </button>
                <input 
                type="checkbox" 
                className='mx-3' 
                checked={props.status} 
                onChange={() => {
                    props.dispatcher({
                        type:"DONE",
                        id:props.id,
                        completedAt: getFormatedDate(),
                    })
                }} />
                <span style={{textDecoration: props.status? 'line-through':''}}>{props.title}</span>
                </h5>
                <span style={{fontSize: '15px'}}> {props.createdAt}</span>
                {props.completedAt ? (<span style={{fontSize: '15px'}}> | {props.completedAt} |</span>) : (<></>) }
                </li>
            </ul>
        </>
    )
};


export default function ToDos(props) {
    const reducer = (state, action) =>{
        console.log("This", state, action);
        if(action.type === "DONE"){
            return state.map(task => {
                if(task.id === action.id){
                    return {...task, status: !task.status, completedAt: action.completedAt};
                }
                else return task;
            });
        }
        if(action.type==='ADD_ITEM'){
            if(state.find((el) => el.id === action.id)){
                return state;
            }
            else{
                return [
                    ...state,
                    {title:action.title, id: action.id, status:false, createdAt: action.createdAt},
                ]
            }
        }
        if(action.type==='REMOVE_ITEM'){
            return state.filter((el) => action.id!==el.id);
        }
        return state;
    }
    const [taskStatus, dispatcher] = useReducer(reducer, []);
    const [inputVal, setInputVal] = useState("");
    const [filterState, setFilterState] = useState('All')

    return (
    <>
       <h1 style={{display:'flex', justifyContent:'center'}}>TO-DO LIST</h1>
       <div className="input-group mb-3 ">
            <input type="text" 
            className="form-control col-2" 
            value={inputVal} 
            placeholder="Enter Task Here" 
            aria-label="Enter Task Here" 
            aria-describedby="basic-addon2" 
            onChange={(event) => {
                console.log(event.target.value);
                setInputVal(event.target.value)} } 
            />
            <button 
            className="input-group-text" id="basic-addon2"
            onClick={() => {
                dispatcher({
                    type: 'ADD_ITEM',
                    title: inputVal,
                    id: taskStatus.length+1,
                    createdAt: getFormatedDate(),
                })
                setInputVal('')
            }}
            >Add Item</button>
        <select 
            className=" btn btn-primary " 
            aria-label="Default select example"
            onChange={(event) => setFilterState(event.target.value)}
            value={filterState}
            >
            <option >All</option>
            <option >Completed</option>
            <option >Incompleted</option>
        </select>
        </div>
        {taskStatus.filter((taskEl) => {
            if(filterState === 'Completed' && taskEl.status){
                return true;}
            else if(filterState ==='Incompleted' && !taskEl.status){
                return true;}
            if(filterState === 'All' ){
                return true;
            }
        }).map((task) => (
        <ToDoItem 
        status={task.status} 
        id={task.id}
        key={task.id} 
        title={task.title}
        dispatcher={dispatcher}
        createdAt={task.createdAt}
        completedAt={task.completedAt}
        />
        ))}
    
    </>
  )
}
