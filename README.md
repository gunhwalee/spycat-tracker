`spycat-tracker`는 [spycat](https://spycat.netlify.app)에서 제공하는 미들웨어 함수입니다.  
등록한 서버의 트래픽, 에러 정보를 수집하려면 서버의 소스코드에서 사용하세요.

## Installation

npm을 통해 사용할 수 있는 Node.js 모듈입니다.  
설치는 `npm install` 명령어를 사용하세요.

```
$ npm install spycat-tracker
```

## Usage

### trafficParser

```js
const express = require("express");
const { trafficParser } = require("spycat-tracker");

const app = express();

app.use(trafficParser("Your API KEY"));

app.use("/", indexRouter);
app.use("/users", usersRouter);
```

`trafficParser`함수는 라우트 분기점보다 위에서 호출하세요.  
매개변수로 `spycat`에서 발급받은 API KEY값을 전달하세요.

### errorParser

```js
const express = require("express");
const { errorParser } = require("spycat-tracker");

const app = express();

app.use(errorParser("Your API KEY"));

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});
```

`errorParser`함수는 서버의 에러핸들러 바로 위에서 호출하세요.  
매개변수로 `spycat`에서 발급받은 API KEY값을 전달하세요.
