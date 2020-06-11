import React from 'react';
import logo from './logo.svg';
import './App.css';

import marked from 'marked';
import DOMPurify from 'dompurify';

const linkRenderer = new marked.Renderer();

linkRenderer.link = (href, title, text) => {
  title = title ? title : href;
  text = text ? text : href;

  return `<a target='_blank' href='${href}' title='${title}'>${text}</a>`;
};

const Marked = (props) => (
  <React.Fragment>
    <div
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(
          marked.parse(props.desc, { renderer: linkRenderer }),
          {
            ALLOWED_TAGS: ['a'],
            ALLOWED_ATTR: ['href', 'target', 'title'],
          }
        ),
      }}
    />
  </React.Fragment>
);

const Purify = (props) => (
  <React.Fragment>
    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.desc) }} />
  </React.Fragment>
);

const Normal = (props) => (
  <React.Fragment>
    <div dangerouslySetInnerHTML={{ __html: props.desc }} />
  </React.Fragment>
);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Normal desc="<script>alert('this is danger')</script>"></Normal>
        <Purify desc="<script>alert('this is danger')</script>"></Purify>
        <Marked desc="<a href='https://daum.net'>daum</a><h1>이것은 허용되지 않은 html</h1>"></Marked>
      </header>
    </div>
  );
}

export default App;
