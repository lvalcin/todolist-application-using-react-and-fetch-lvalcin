// import { useEffect } from "react";
import React, {useState, useEffect} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [listArray, setListArray]=useState([])
	const [inputValue, setInputValue]=useState("")
	// const deleteItem = (itemToDelete) => {
	// 	const result = setListArraylistArray.filter((item)=> item !==itemToDelete)}
	// 		setListArray(result)
	
	const toDoUrl = "https://playground.4geeks.com/todo/";
	// const toDoUrl = "https://playground.4geeks.com/todo/users/lvalcin";
	const getToDos = ()=>{
		fetch(toDoUrl+"users/lvalcin")
		.then((resp)=> resp.json())
		.then((data)=>setListArray(data.todos))
	}
		getToDos()

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
		})
	}

	useEffect(()=>{
		getToDos();
	},[])	

	return (
		<div className="text-center">
			<h1>To-Do List</h1>
			<ul>

            {listArray.map(
				(item)=>{
					return (
					<div className= "container border p-2 fs-3 text fw-light">
						<li>{item.label}</li>
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
			}}>
			Add To List
			</button>

		</div>
	);
};

export default Home;