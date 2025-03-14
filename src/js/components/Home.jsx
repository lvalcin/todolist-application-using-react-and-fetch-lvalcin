import React, {useState} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [listArray, setListArray]=useState(["Grocery shopping", "Do Laundry", "Meal Prep","Finish Coding Projects"]);
	const [inputValue, setInputValue] = useState("");
	// const deleteItem = (itemToDelete) => {
	// 	const result = setListArraylistArray.filter((item)=> item !==itemToDelete)}
	// 		setListArray(result)
	
	const toDoUrl = "https://playground.4geeks.com/todo/users/lvalcin";
	const getToDos = ()=>{
		fetch(toDoUrl)
		.then((resp)=> resp.json())
		.then((data)=>console.log(data , "this is my data!!!"))
	}
	getToDos()

	return (
		<div className="text-center">
			<h1>To-Do List</h1>
			<ul>
            {listArray.map(
				(item)=>{
					return (
					<div className= "container border p-2 fs-3 text fw-light">
						<li>{item}</li>
					</div>)
				})
			}
			</ul>
			<input 
				type="text"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}/>
			<button onClick={()=>{
          		if (inputValue.trim() !== "") {
            	setListArray((prevList) => [...prevList, inputValue]);
            	setInputValue("");}
			}}>
			Add To List
			</button>

		</div>
	);
};

export default Home;