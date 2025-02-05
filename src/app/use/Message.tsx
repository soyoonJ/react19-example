import { use } from "react";

interface Props {
	messagePromise: Promise<string>;
}

export function Message({ messagePromise }: Props) {
	// 💡 use는 클라이언트 컴포넌트/서버 컴포넌트에서 모두 동작한다.
	// ㄴ 'use client' 없이도 동작함
	const messageContent = use(messagePromise);

	// 💡 다른 훅들과 마찬가지로 React 컴포넌트나 Hook 함수 외부에서는 호출 불가
	// function cannotUseInFunction() {
	// 	const message = use(messagePromise);
	// }

	return <p>Here is the message: {messageContent}</p>;
}
