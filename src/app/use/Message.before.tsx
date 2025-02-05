"use client";
import { useEffect, useState } from "react";

interface Props {
	messagePromise: Promise<string>;
}

// 💡 use 없이 사용하려고 이렇게 작성해봤는데, 보통 여러분은 어떻게 작성하시나요?
// Suspense가 안 걸리던데 이유를 아시는 분이 계실까요...?
export function Message({ messagePromise }: Props) {
	const [message, setMessage] = useState("");

	useEffect(() => {
		const getMessage = async () => {
			try {
				const fetchedMessage = await messagePromise;
				setMessage(fetchedMessage);
			} catch (e) {
				setMessage((e as Error).message);
			}
		};
		getMessage();
	}, [messagePromise]);

	return <p>Here is the message: {message}</p>;
}
