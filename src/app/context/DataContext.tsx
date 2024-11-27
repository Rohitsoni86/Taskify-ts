"use client";

import React, { createContext, useContext, useState } from "react";
import { Task } from "../models/taskModel";

interface DataContextType {
	taskCreatedList: Task[];
	setTaskCreatedList: React.Dispatch<React.SetStateAction<Task[]>>;
}

export const DataContext = createContext<DataContextType | undefined>(
	undefined
);

export function DataContextProvider({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [taskCreatedList, setTaskCreatedList] = useState<Task[]>([]);

	return (
		<DataContext.Provider
			value={{
				taskCreatedList,
				setTaskCreatedList,
			}}
		>
			{children}
		</DataContext.Provider>
	);
}

export const useDataContext = () => {
	const context = useContext(DataContext);
	if (!context) {
		throw new Error("useDataContext must be used within a DataProvider");
	}
	return context;
};

export default DataContext;
