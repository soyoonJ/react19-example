# 실행 방법
```bash
pnpm install
pnpm run dev
```
# 실습 폴더 구조
<img width="241" alt="image" src="https://github.com/user-attachments/assets/c8a55833-4bad-468e-9886-80b82add0cb2" />        

- useActionState : 기본 사용법
- useTransition : 기본 사용법
- useTransition/outOfOrder : useTransition 응답 순서 다른 경우 테스트
- useTransition/props : useTransition props로 action 넘겨주는 경우

# useTransition 인사이트
useTransition 예제 실습을 하면서 궁금했던 내용 및 인사이트들을 주석에 💡 이모지를 추가하여 작성했다.
|<img width="486" alt="image" src="https://github.com/user-attachments/assets/17a1fd4b-42a1-4c9c-a4a6-0d74e9c5d115" />|<img width="725" alt="image" src="https://github.com/user-attachments/assets/fafb5629-1204-46cb-aa6b-7a1b4586e6c6" />|
|-----|------|

## useTransition
### 💡 await가 없는 promise는 pending 상태가 되지 않는다.
setTimeout을 사용할 경우 Promise로 감싸서 결과값을 반환해주어야 pending 상태 사용이 가능하다.

```javascript
const updatePendingTab = async (nextTab: string): Promise<string> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(nextTab);
		}, 2000);
	});
};

const selectTab = async (nextTab: string) => {
  startTransition(async () => {
    // ❌ 잘못된 사용법. 이렇게 작성할 경우 pending 상태로 걸리지 않는다.
    setTimeout(() => {
      console.log("pending");
    }, 2000);

    // ✅
    const nextTabContent = await updatePendingTab(nextTab);

    setCurrentTab(nextTabContent);
  });
};

```

### 💡 useTransition에서 에러가 발생할 경우
- isPending 상태 resolve와 동일하게 동작

## useTransition/props
### 💡 startTransition를 여러 번 사용하는 이유?
예제를 학습하다보니 App.js에서 이미 startTransition이 사용되었음에도 불구하고 자식 컴포넌트에서 startTransition이 다시 한번 사용되는 예제가 있었다. 분명 공식문서에서는 action prop을 expose 하기 위함이라고 적혀있긴 하지만, 이미 상위에서 startTransition을 사용하고 있는데 또 한번 사용해야 하는 이유에 대한 이해가 되지 않았고 특히 isPending이나 state 변화가 추가 사용여부에 상관없이 동일하게 동작했기 때문에 이해가 잘 되지 않았다. 결국 이 케이스는 아무리 봐도 이해가 잘 되지 않아서 reddit React 커뮤니티에 질문을 작성했다.
- reddit 링크 : https://www.reddit.com/r/reactjs/comments/1i7hgpq/why_does_the_react_19_usetransition_example_use/

|질문 내용|답변1|답변2|
|-------|----|----|
|![image](https://github.com/user-attachments/assets/493ab10a-8809-4551-aecd-8881894f6f21)|![image](https://github.com/user-attachments/assets/8e460243-1df9-4576-998e-f2295050ffee)|![image](https://github.com/user-attachments/assets/c67b0047-0b90-41a8-acaa-a8fcd3a4f791)|

첫번째 답변은 내 질문에 공감해주는 답변이었다. 공식문서에 적혀있는 내용을 봐도 그렇게 작성해야 하는 이유를 모르겠다는 내용...! 그러면서 useTransition hook에 대해 깊이 있는 커뮤니케이션이 이루어지지 않은 것 같다는 개인적인 의견을 주셨는데, 이 답변에 대한 공감이 꽤 쌓여서 다른 사람들도 비슷한 고민이 있겠다는 생각이 들었다. 두번째 답변은 state 업데이트와 Transition 처리에 대한 내용이 담긴 링크를 공유받았는데, 사실 이 부분도 이미 예제를 학습하며 읽었던 부분이고 동작이 겉으로 차이가 나지 않아, 어떤 문제가 발생할 수 있다는 것인지에 대한 확실한 답을 얻을 수 없었다.    
거의 9,000회에 가까운 view를 기록했음에도 불구하고 아쉽게도 뚜렷한 답을 얻지는 못했다. 우선 포스팅한지 얼마 지나지 않은 시점이라 조금 더 학습하면서 기다려보고 다른 커뮤니티에도 동일한 질문을 올려보려고 한다.

### 💡 useTransition의 startTransition과 react의 startTransition의 차이
예제를 작성하다보니 startTransition이 useTransition에도 있고 react에도 있는 것을 확인했다.
```javascript
// react의 startTransition
import { startTransition } from 'react'

// useTransition의 startTransition
const [isPending, startTransition] = useTransition()
```
두 가지에 대한 차이점이 무엇인지가 궁금하여 찾아보니, React의 startTransition은 pending 상태를 관리하지 않기 때문에 **pending 상태를 관리하지 않아도 되는 곳에서 사용할 때** 적합하다. 또한 hook이 아니기 때문에 **컴포넌트 외부에서도 사용이 가능**하다. 스터디 중 승우님이 useOptimistic에 대해 실습을 진행하셨는데, useOptimistic을 사용할 때도 startTransition을 함께 사용하고 있었다.
반면 useTransition의 경우 pending 상태도 함께 관리가 가능하며, hook이기 때문에 컴포넌트 외부에서는 사용이 불가하다.

### 💡 제어된 입력 state의 경우
