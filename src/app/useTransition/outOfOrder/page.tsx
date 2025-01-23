// https://ko.react.dev/reference/react/useTransition#my-state-updates-in-transitions-are-out-of-order
"use client";

import { useState, useTransition } from "react";
import Item from "./components/Item";
import Total from "./components/Total";

// api 요청 순서를 다르게 반환할 경우 요청 순서가 아닌 반환되는 순서에 의존함
let firstRequest = true;
const updateQuantity = async (quantity: number): Promise<number> => {
	return new Promise((resolve) => {
		if (firstRequest === true) {
			firstRequest = false;
			setTimeout(() => {
				firstRequest = true;
				resolve(quantity);
				// Simulate every other request being slower
			}, 1000);
		} else {
			setTimeout(() => {
				resolve(quantity);
			}, 50);
		}
	});
};

export default function UseTransitionOutOfOrder() {
	const [quantity, setQuantity] = useState(0);
	const [isPending, startTransition] = useTransition();

	const [clientQuantity, setClientQuantity] = useState(0);

	const handleChangeAction = (newQuantity: number) => {
		setClientQuantity(newQuantity);

		startTransition(async () => {
			const updatedQuantity = await updateQuantity(newQuantity);

			startTransition(() => {
				setQuantity(updatedQuantity);
			});
		});
	};

	return (
		<>
			<h1>Checkout</h1>
			<Item action={handleChangeAction} />
			<hr />
			<Total quantity={quantity} isPending={isPending} clientQuantity={clientQuantity} />
		</>
	);
}
