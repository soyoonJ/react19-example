"use client";

import { useState, useTransition } from "react";

const tabs = [
	{ name: "home", content: "Home" },
	{ name: "about", content: "About" },
	{ name: "contact", content: "Contact" },
];

// 💡 에러 발생할 경우: isPending 상태 resolve와 동일하게 동작
// const errorPendingTab = async (nextTab: string): Promise<string> => {
// 	return new Promise((_, reject) => {
// 		setTimeout(() => {
// 			reject(new Error(nextTab));
// 			// reject(nextTab);
// 		}, 2000);
// 	});
// };

const updatePendingTab = async (nextTab: string): Promise<string> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(nextTab);
		}, 2000);
	});
};

export default function UseTransition() {
	const [isPending, startTransition] = useTransition();
	const [currentTab, setCurrentTab] = useState("Home");

	const selectTab = async (nextTab: string) => {
		startTransition(async () => {
			// 💡 await가 없는 promise는 pending 상태가 되지 않는다.
			// setTimeout(() => {
			// 	console.log("pending");
			// }, 2000);

			// const nextTabContent = await errorPendingTab(nextTab);
			const nextTabContent = await updatePendingTab(nextTab);
			setCurrentTab(nextTabContent);
		});
	};

	return (
		<>
			{tabs.map((tab) => (
				<button key={tab.name} disabled={isPending} onClick={() => selectTab(tab.content)}>
					{tab.content}
				</button>
			))}

			<h1>Hello, {currentTab} Page!</h1>
			<h2>{isPending ? "Loading..." : null}</h2>
		</>
	);
}
