# React essential training for Kids dev

이 프로젝트 저장소는 리액트 개발에 대한 training 을 목적으로 생성 되었습니다. 여기에서 작성된 코드들은 production 에 적용하기에 적합하지 않을 수 있습니다.

### 01-create-react-app

- [ ] create react app 프로젝트 생성
  - [ ] `$ npx create-react-app 01-create-react-app`
  - [ ] `ESLint` 와 `Prettier` VSCode 확장 설치
  - [ ] `$ yarn add eslint-config-airbnb`
  - [ ] `package.json` 내의 `eslintConfig` 설정을 아래와 같이 변경
  ```json
  "eslintConfig": {
    "extends": [
      "react-app",
      "airbnb"
    ],
    "rules": {
      "react/jsx-filename-extension": 0,        // jsx 파일이 아닌 js 파일에서 작업이 가능
      "react/jsx-one-expression-per-line": 0,   // html 태그를 one-line 에서 작성해야 하는 규칙을 없앰
      "react/prefer-stateless-function": 0      // state 가 없을 때 react.component 를 사용해야 하는 규칙 없앰
    }
  },
  ```
  - [ ] `.prettierrc` 파일을 생성하고 아래와 같이 변경
  ```json
  {
    "singleQuote": true,
    "semi": true,
    "useTabs": false,
    "tabWidth": 2,
    "trailingComma": "all",
    "printWidth": 120
  }
  ```
  - [ ] `ESLint` 와 `Prettier` 설정간의 충돌을 없애기 위해 `$ yarn add eslint-config-prettier` 를 설치하고 `package.json` 내의 `eslintConfig` 설정을 수정한다.
  ```json
  "eslintConfig": {
    "extends": [
      "airbnb",
      "prettier"
    ],
    "rules": {
      "react/jsx-filename-extension": 0,
      "react/jsx-one-expression-per-line": 0,
      "react/prefer-stateless-function": 0
    }
  },
  ```

### 02-create-react-app-typescript

- [ ] `$ npx create-react-app 02-create-react-app-with-typescript --template typescript`
  - [ ] `Code formatter` 설치는 `01-create-react-app` 프로젝트와 동일
  - [ ] `useState Hook` 을 이용한 `counter` 구현
