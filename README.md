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

### 💡 useTransition에서 에러가 발생할 경우
- isPending 상태 resolve와 동일하게 동작

## useTransition/props
### 💡 startTransition를 여러 번 사용하는 이유?
이 케이스는 아무리 봐도 이해가 잘 되지 않아서 reddit React 커뮤니티에 질문을 작성했다.
- reddit 링크 : https://www.reddit.com/r/reactjs/comments/1i7hgpq/why_does_the_react_19_usetransition_example_use/

|질문 내용|답변1|답변2|
|-------|----|----|
|![image](https://github.com/user-attachments/assets/493ab10a-8809-4551-aecd-8881894f6f21)|![image](https://github.com/user-attachments/assets/8e460243-1df9-4576-998e-f2295050ffee)|![image](https://github.com/user-attachments/assets/c67b0047-0b90-41a8-acaa-a8fcd3a4f791)|

### 💡 useTransition의 startTransition과 react의 startTransition의 차이

### 💡 제어된 입력 state의 경우
