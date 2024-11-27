"use client";
import React, { useState } from "react";
import { useDataContext } from "../context/DataContext";
import { Task } from "../models/taskModel";
// import { IoIosAddCircle } from "react-icons/io";

export default function HeroSection() {
	const [inputValue, setInputValue] = useState("");

	const { taskCreatedList, setTaskCreatedList } = useDataContext();

	console.log("Task List", taskCreatedList);

	const addTaskToList = (userInputValue: string) => {
		let checkIfExists = taskCreatedList?.find(
			(task, index) => task.name === userInputValue
		);

		if (checkIfExists) {
			alert("Task Already Exists !");
		} else {
			// Create a new task object
			const newTask: Task = {
				id: taskCreatedList.length + 1, // id should be based on the current list length
				name: userInputValue,
				description: userInputValue,
				status: "pending",
			};

			// Update the task list by creating a new array
			const updatedList = [...taskCreatedList, newTask];

			console.log("Updated List", updatedList);

			// Update the context and localStorage with the new task list
			setTaskCreatedList(updatedList);
			localStorage.setItem("TaskList", JSON.stringify(updatedList));
		}

		// Clear the input field
		setInputValue("");
	};

	return (
		<>
			<div className="flex justify-center items-center  flex-col p-4 gap-2 bg-cyan-400">
				<div>
					<h1 className="text-black text-lg md:text-3xl font-semibold text-center p-4 ">
						Taskify
					</h1>
				</div>
				<div>
					<div className="flex flex-col p-2">
						<div className=" w-[300px] md:min-w-[320px] border-0">
							<div className="relative">
								<input
									value={inputValue}
									onChange={(event) => {
										setInputValue(event.target.value);
									}}
									onKeyDown={(event) => {
										// On handle Key Enter
										if (event.key === "Enter" && inputValue?.trim() !== "") {
											addTaskToList(inputValue);
										}
									}}
									className="w-full bg-white border-transparent placeholder:text-slate-600 text-black text-lg border border-slate-700 rounded-md 
									
									md:px-6 md:py-4 
									px-8 py-2 

									
									transition duration-300 ease focus:outline-none focus:shadow-lg focus:border-slate-200 hover:border-slate-300 shadow-sm "
									placeholder="Type here..."
								/>
								<button
									className="absolute right-1 border-transparent top-2 md:top-3 rounded bg-slate-800 
									
									md:px-4 md:py-2.5

									px-2 py-1
									
									text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
									type="button"
									onClick={() => {
										addTaskToList(inputValue);
									}}
								>
									Add
									{/* <IoIosAddCircle className="text-2xl" /> */}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
