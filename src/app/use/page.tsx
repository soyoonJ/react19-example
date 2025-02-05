import { Suspense } from "react";
// import { Message } from "./Message";
import { Message } from "./Message.before";
import { fetchMessage } from "./api";
import { ErrorBoundary } from "react-error-boundary";

// 서버 컴포넌트에서 클라이언트 컴포넌트로 Promise Prop을 전달
// 💡 Promise를 서버 컴포넌트에서 클라이언트 컴포넌트로 전달 후 처리하는 이유
// 서버에서 await를 사용해서 데이터를 가져오면 await문이 완료될 때까지 서버 컴포넌트가 렌더링되지 않음
// Promise를 Prop으로 전달하면 Promise가 서버 컴포넌트의 렌더링을 차단하는 것을 방지할 수 있음
export default function App() {
	const messagePromise = fetchMessage();

	return (
		// 💡 오류 처리를 위해 react-error-boundary 사용. 여러분은 직접 구현하시나요?
		// 절반의 확률로 성공/실패하도록 처리함 (feat. 승우님)
		<ErrorBoundary fallback={<p>Failed to load message</p>}>
			<Suspense fallback={<p>waiting for message...</p>}>
				<Message messagePromise={messagePromise} />
			</Suspense>
		</ErrorBoundary>
	);
}
