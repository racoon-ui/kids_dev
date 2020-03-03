# 04 React 프로젝트에서 Data Fetch 이용

이 프로젝트에서는 React 프로젝트 내에서 Data Fetch 를 이용하는 방법에 대해서 알아보려고 합니다. 이 프로젝트에서 알아야 할 내용은 크게 두 가지가 있습니다.

1. json server 를 이용한 mock server 구성하기
2. fetch 또는 axios 를 이용하여 data fetch 사용하기

### JSON Server 를 이용한 Mock Server 구성

프론트엔드 개발자들에게는 백엔드 REST API 서버를 구성하는 것이 쉽지 않습니다. 그래서 JSON 데이터로 샘플데이터를 만들어 놓고 그것을 불러와서 화면을 구성하는 형태로 코드를 작성할 수 있겠으나, 이는 오로지 화면을 구성하기 위한 요소일 뿐 CRUD (Create, Read, Update, Delete) 에 해당하는 요소들에 대한 코드 구성을 만들어 보기엔 한계가 있습니다.

그래서, 오늘은 프론트엔드 개발자를 위한 백엔드 Mockup Server 를 구성하기에 편리한 [Json Server](https://github.com/typicode/json-server) 라는 놈을 소개하고자 합니다.

> json server 는 내부적으로 [lowdb](https://github.com/typicode/lowdb) 를 이용하여 데이터를 저장합니다. 따라서, 테스트에서 사용된 데이터는 언제든 소멸될 수 있습니다.

먼저, json server 를 사용하기 위해 json server 를 설치합니다.

> npm i -g json-server

설치를 한 뒤에는 데이터를 담고 있는 json 파일을 하나 만들어 봅니다. 아래는 샘플입니다.

db.json

```json
{
  "posts": [{ "id": 1, "title": "json-server", "author": "typicode" }],
  "comments": [{ "id": 1, "body": "some comment", "postId": 1 }],
  "profile": { "name": "typicode" }
}
```

위와 같이 db.json 파일을 생성한 뒤 아래의 구문을 실행합니다.

> json-server --watch db.json

정상적으로 실행이 되었다면 아래의 그림처럼 `posts`, `comments`, `profile` 에 대한 endpoint 가 생성됩니다.

![스크린샷 2020-01-20 오후 4 41 07](https://user-images.githubusercontent.com/776959/72707408-adcfb480-3ba3-11ea-9fd8-bc34a7a6cea5.png)

이제 [Postman](https://www.getpostman.com/) 이나 [VSCode Rest Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) 를 이용하여 CRUD REST Api 를 호출해 볼 수 있습니다.

```
GET    /posts
GET    /posts/1
POST   /posts
PUT    /posts/1
PATCH  /posts/1
DELETE /posts/1
```

```
GET    /comments
GET    /comments/1
POST   /comments
PUT    /comments/1
PATCH  /comments/1
DELETE /comments/1
```

```
GET    /profile
GET    /profile/1
POST   /profile
PUT    /profile/1
PATCH  /profile/1
DELETE /profile/1
```

이런 기본적인 CRUD 외에도 Filter, Page, Sort, Slice 등 많은 옵션을 이용할 수 있습니다. 더 자세한 정보는 [Json Server Document](https://github.com/typicode/json-server) 를 확인해 주세요.

### fetch 또는 axios 를 이용한 data fetch 의 차이점

프론트엔드 기술에서 화면을 꾸미는 것과 더불어 가장 중요한 요소를 뽑으라면 단연 서버와의 통신을 통한 Data Fetch 에 대한 내용일 것입니다.
jQuery 의 ajax 를 많이 이용해 봤을 것으로 생각됩니다만, 요즘 프론트엔드 기술에서는 jQuery 에 대한 의존도를 없애는 것이 일반적이기 때문에 jQuery 의 ajax 를 이용하지 않고 Data Fetch 를 할 수 있어야 합니다.

이번에 알아볼 기술은 이러한 Data Fetch 를 위해 많이 사용되는 Fetch 와 Axios 두 가지 기술에 대해서 알아보려고 합니다. 어떤점이 다른지, 어떤 기술을 사용하는 것이 적합한지 등은 알아두면 좋을 것 같습니다.

### 브라우저 지원여부

1. fetch : IE 지원하지 않음. IE 에서 사용하려면 polyfill 을 이용해야 함. 또한, 브라우저도 일부만 지원
2. axios : IE11 이상 버전의 브라우저에서 지원가능하며 대부분의 모던 브라우저는 지원

### Data Fetch 기본 문법

```javascript
// fetch

fetch('/posts')
  .then(res => {
    return res.json();
  })
  .then(json => {
    setPosts(...posts, json);
  });
```

```javascript
// axios

axios('/posts').then(res => {
  return setPosts(...posts, res.data);
});
```

위에서 보는 것과 같이 axios 문법이 좀 더 간결하다고 볼 수 있습니다.
fetch 에서 추가되는 코드는 다음과 같은 이유로 인해 추가된다고 보면 됩니다.

1. fetch 에서는 404, 500 과 같이 비정상적인 return 의 경우에도 예외가 발생되지 않습니다.
2. fetch 에서는 데이터를 가져온 뒤 json 형태의 실제 데이터를 받아오려면 다시 한번 `res.json()` 을 호출해야 합니다.

### 네트워크 장애 또는 지연에 대한 대처

axios 는 네트워크 지연 또는 장애로 인해 호출이 오랜 시간 지속되고 있는 것을 방지하기 위해 `timeout` 옵션을 제공하고 있습니다.

```javascript
// axios

axios({
  method: 'post',
  url: '/login',
  timeout: 4000, // 4 seconds timeout
  data: {
    firstName: 'David',
    lastName: 'Pollock',
  },
})
  .then(response => {
    /* handle the response */
  })
  .catch(error => console.error('timeout exceeded'));
```

반면, fetch 는 기본 기능으로는 이러한 `timeout` 옵션을 제공하지 않습니다. 따라서, `setTimeout` 과 같은 기능을 이용하여 개발자가 직접 `timeout` 기능을 구현해야 합니다.

### 예외처리

위에서 잠깐 얘기한 것과 같이 `fetch` 는 404, 500, 422 등과 같은 비정상적인 처리 결과라 할지라도 예외상황으로 인지하지 않습니다.
반면, axios 는 200 또는 201 과 같이 정상적인 처리 결과가 아닌 경우 예외상황으로 인지합니다. 이로 인해 `fetch` 와 `axios` 를 이용한 코드 작성에는 다음과 같은 차이를 보입니다.

```javascript
// fetch

fetch('/posts')
  .then(res => {
    if (!res.ok) {
      throw Error(res.statusText);
    }

    return res.json();
  })
  .then(json => {
    setPosts(...posts, json);
  })
  .catch(error => {
    console.log(error);
  });
```

```javascript
// axios

axios('/posts')
  .then(res => {
    return setPosts(...posts, res.data);
  })
  .catch(error => {
    console.log(error);
  });
```

여기서도 `axios` 가 좀 더 간결한 모습을 보이고 있습니다.
이 외에도 `HTTP Interceptors` 를 `axios` 의 경우 제공해 주는데 반해 `fetch` 는 기능을 제공해 주지 않습니다. 그럼, `fetch` 가 `axios` 에 비해 나을 것이 없는데 왜 `fetch` 를 비교하는 것일까요?

`axios` 가 3rd party 라이브러리로 존재하는 것에 비해 `fetch` 는 라이브러리의 포함없이 기본적으로 제공되는 기능입니다. 따라서, `fetch` 는 별도의 라이브러리 설치없이 바로 사용할 수 있으며, 대부분의 경우 버전의 증가에 따른 영향을 받지 않습니다. 하지만, 위에서 살펴본 것과 같이 대체적으로 `axios` 의 장점이 `fetch` 에 비해 많다 보니 그 사용량도 높아 보입니다.
