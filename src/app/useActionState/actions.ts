// 💡 use server를 사용하는 이유가 뭘까? 실제 서버를 넣는다고 가정해서 그런건가?
// "use server";

export async function addToCart(prevState: string, queryData: FormData): Promise<string> {
	const itemID = queryData.get("itemID");

	if (itemID === "1") {
		return "Added to cart";
	} else {
		// Add a fake delay to make waiting noticeable.
		await new Promise((resolve) => {
			setTimeout(resolve, 2000);
		});
		return "Couldn't add to cart: the item is sold out.";
	}
}

// 일반 action 함수 작성 시 formData 받아오는 방법, prevState가 없다
export const handleAction = (formData: FormData) => {
	console.log("formData", formData.get("itemID"));
};
