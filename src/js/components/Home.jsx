// import { useEffect } from "react";
import React, {useState, useEffect} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [listArray, setListArray]=useState([])
	const [inputValue, setInputValue]=useState("")
	// const deleteItem = (itemToDelete) => {
		// const result = listArray.filter((item)=> item !==itemToDelete)}
		// 	setListArray(result)
	
	const createUser = ()=>{
		const option={
			method: "GET",
			headers:{
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"name": "lvalcin",
				"id": 0
			  })
		}
		fetch("https://playground.4geeks.com/todo/users/lvalcin", option)
		.then((resp)=>{
			if(resp.ok==false){
				console.log("IT FAILED!")
		}
		else{
			getData()
		}
		return resp.json()
		})
		.then((data)=>console.log(data, "this is my agenda")) 

		}
	
	
	const toDoUrl = "https://playground.4geeks.com/todo/";
	
	const getToDos = ()=>{
		fetch(toDoUrl+"users/lvalcin")
		.then((resp)=> resp.json())
		.then((data)=>setListArray(data.todos))
	}


	const addToDo =(input)=>{
		const options ={
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			  },
			  body: JSON.stringify(input)

		}
		fetch(toDoUrl + "todos/lvalcin", options)
		.then((resp)=>{resp.json()

		})
		.then((data)=>{
			console.log(data, "item added")
			getToDos();
		})
	}

								// /todos/{todo_id}
	const deleteToDo = (itemToDelete)=>{
		const options = {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		};
		fetch(`${toDoUrl}todos/${itemToDelete}`, options)
		.then((resp)=>{resp.json()

		})
		.then(()=>{
			setListArray((prevList) =>
				prevList.filter((item)=> item.id !==itemToDelete)
		);
		})
	}

	useEffect(()=>{
		getToDos();
		createUser();
		addToDo()
	},[])	

	return (
		<div className="text-center m-5 ">
			<h1>To-Do List</h1>
			<ul>

            {listArray.map(
				(item)=>{
					return (
					<div className= "container border p-2 fs-3 text fw-light w-75">
						<ul className="list-inline">
							<li>{item.label}</li>
							<span onClick={() => deleteToDo(item.id)}>
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className=" bi bi-trash" viewBox="0 0 16 16">
								<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
								<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
								</svg>
							</span>
						</ul>
					</div>)
				})
			}
			</ul>
			<input 
				type="text"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}/>
			<button onClick={()=>{
				const todoObject = {
					"label": inputValue,
					"is_done": false
				  }
				  addToDo(todoObject)
          		if (inputValue.trim() !== "") {
            	setListArray((prevList) => [prevList, todoObject]);	
            	setInputValue("");}
			}} 
			>
			Add To List
			</button>

		</div>
	);
};

export default Home;