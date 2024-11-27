import React, { useState } from "react";
import { MdModeEdit, MdDelete, MdCheckCircle } from "react-icons/md";
import { useDataContext } from "../context/DataContext";
import { IoRefreshCircleSharp } from "react-icons/io5";
import { BsFillPatchCheckFill } from "react-icons/bs";

export default function ListCards({
	idF,
	description,
	status,
	index,
}: {
	idF: string | number;
	description: string;
	status: string;
	index: number;
}) {
	const [isEditable, setIsEditable] = useState(false);
	const [editText, setEditText] = useState("");

	const { taskCreatedList, setTaskCreatedList } = useDataContext();

	const handleCompleteTask = (taskId: string | number, taskIndex: number) => {
		let updatedTasks = [...taskCreatedList];
		updatedTasks[taskIndex].status = "completed";
		setTaskCreatedList([...updatedTasks]);
	};

	const handleReOpenTask = (taskId: string | number, taskIndex: number) => {
		let updatedTasks = [...taskCreatedList];
		updatedTasks[taskIndex].status = "pending";
		setTaskCreatedList([...updatedTasks]);
	};

	const handleEditTask = (taskId: string | number, taskIndex: number) => {
		let updatedTasks = [...taskCreatedList];
		updatedTasks[taskIndex].description = editText;
		setTaskCreatedList([...updatedTasks]);
		setIsEditable(false);
		setEditText("");
	};

	const handleDeleteTask = (taskId: string | number) => {
		let filteredList = taskCreatedList?.filter((task) => task.id !== taskId);
		setTaskCreatedList([...filteredList]);
	};

	return (
		<div className=" rounded-2xl m-2 md:m-4 w-[300px]  bg-slate-600 shadow-lg h-full md:w-[400px] hover:border-2 ">
			<div className="flex flex-wrap items-center px-1 py-1 sm:flex-nowrap">
				<div className="px-4  w-full">
					{isEditable ? (
						<input
							className=" w-full bg-white border-transparent placeholder:text-slate-600 text-black text-lg border border-slate-700 rounded-md
							 px-1 py-1 transition duration-300 ease focus:outline-none focus:shadow-lg focus:border-slate-200 hover:border-slate-300 shadow-sm "
							value={editText}
							onChange={(event) => {
								setEditText(event.target.value);
							}}
						/>
					) : (
						<p className="text-justify p-2 break-words text-white">
							{description || ""}
						</p>
					)}
				</div>
			</div>

			<div className="flex flex-wrap justify-between items-center gap-x-4 gap-y-4 px-6 py-2 sm:flex-nowrap">
				<div>
					<h2 className="text-md text-white font-semibold capitalize ">
						{status || "DDD"}
					</h2>
				</div>
				<div className="flex flex-wrap gap-4 border-0 sm:flex-nowrap">
					<div className="border-0">
						{isEditable ? (
							<button
								onClick={() => {
									setIsEditable(false);
									handleEditTask(idF, index);
								}}
								className="p-2 text-white rounded-full bg-cyan-600 hover:bg-cyan-700 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
							>
								<MdCheckCircle className="text-xl " />
								{/* <IoCheckmarkDoneCircle className="text-xl " /> */}
							</button>
						) : (
							<button
								disabled={status === "completed"}
								onClick={() => {
									setIsEditable(true);
									setEditText(description);
								}}
								className="p-2 text-white shadow-lg rounded-full bg-cyan-600 hover:bg-cyan-700 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
							>
								<MdModeEdit className="text-xl " />
							</button>
						)}
					</div>
					<div className="border-0">
						<button
							disabled={isEditable}
							onClick={() => handleDeleteTask(idF)}
							className="p-2 text-white shadow-lg  rounded-full bg-cyan-600  hover:bg-red-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
						>
							<MdDelete className="text-xl " />
						</button>
					</div>
					<div className="border-0">
						{status === "pending" ? (
							<button
								disabled={isEditable}
								onClick={() => {
									handleCompleteTask(idF, index);
								}}
								className="p-2 text-white shadow-lg rounded-full bg-cyan-600  hover:bg-green-500 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
							>
								<BsFillPatchCheckFill className="text-xl " />
							</button>
						) : (
							<button
								disabled={isEditable}
								onClick={() => {
									handleReOpenTask(idF, index);
								}}
								className="p-2 text-white shadow-lg rounded-full bg-green-500 focus:outline-none focus:ring focus:ring-violet-300"
							>
								<IoRefreshCircleSharp className="text-xl " />
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
