// 💡 startTransition은 setTimeout과 달리 즉시 실행됨
// https://ko.react.dev/reference/react/useTransition#the-function-i-pass-to-starttransition-executes-immediately
"use client";

import { useState, useTransition } from "react";
import Item from "./components/Item";
import Total from "./components/Total";

const updateQuantity = async (quantity: number): Promise<number> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(quantity);
		}, 1000);
	});
};

// 💡 startTransition을 두 번 사용하는 이유
// reddit 질문: https://www.reddit.com/r/reactjs/comments/1i7hgpq/why_does_the_react_19_usetransition_example_use/

// 💡 useTransition의 startTransition과 react의 startTransition의 차이
// react의 startTransition은 pending 상태를 관리하지 않으며 컴포넌트 외부에서도 사용 가능
export default function UseTransitionProp() {
	const [quantity, setQuantity] = useState(0);
	const [isPending, startTransition] = useTransition();

	const handleChangeAction = (newQuantity: number) => {
		startTransition(async () => {
			const updatedQuantity = await updateQuantity(newQuantity);
			// setQuantity(updatedQuantity);

			// 💡 React 예제에서는 아래처럼 사용하고, 하위 컴포넌트에서도 startTransition을 사용하는데, 겉보기에는 동일하게 동작하는 것으로 보임
			// startTransition으로 한번 더 래핑해야 하는 이유: https://ko.react.dev/reference/react/useTransition#react-doesnt-treat-my-state-update-after-await-as-a-transition
			// 그치만 업데이트 잘 되는데...
			startTransition(() => {
				setQuantity(updatedQuantity);
			});
		});
	};

	// 💡 제어된 입력 state의 경우 Transition 사용 불가
	// function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
	// 	startTransition(async () => {
	// 		setQuantity(Number(event.target.value));
	// 	});
	// }

	return (
		<>
			<h1>Checkout</h1>
			<Item action={handleChangeAction} />
			<hr />
			<Total quantity={quantity} isPending={isPending} />
		</>
	);
}
