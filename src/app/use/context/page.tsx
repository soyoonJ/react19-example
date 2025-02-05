"use client";
import { createContext, Dispatch, SetStateAction, use, useState } from "react";

const ThemeContext = createContext("light");

export default function MyApp() {
	const [theme, setTheme] = useState("light");

	return (
		<ThemeContext.Provider value={theme}>
			<Form setTheme={setTheme} />
		</ThemeContext.Provider>
	);
}

function Form({ setTheme }: { setTheme: Dispatch<SetStateAction<string>> }) {
	return (
		<Panel title="Welcome">
			<Button show={true} onClick={() => setTheme("dark")}>
				다크모드
			</Button>
			<Button show={false} onClick={() => setTheme("light")}>
				라이트모드
			</Button>
		</Panel>
	);
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
	// const theme = useContext(ThemeContext);
	const theme = use(ThemeContext);
	const className = "panel-" + theme;
	return (
		<section className={className}>
			<h1>
				{title} {theme}
			</h1>
			{children}
		</section>
	);
}

function Button({
	show,
	children,
	onClick,
}: {
	show: boolean;
	children: React.ReactNode;
	onClick: () => void;
}) {
	// 💡 useContext와 달리 조건부 및 반복문 안에서 호출이 가능하다
	// const theme = useContext(ThemeContext);
	if (show) {
		const theme = use(ThemeContext);
		const className = "button-" + theme;
		return (
			<>
				<button className={className} onClick={onClick}>
					{children}
				</button>
			</>
		);
	}

	return <button onClick={onClick}>{children}</button>;
}
