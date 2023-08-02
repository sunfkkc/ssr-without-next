import ReactDomServer from 'react-dom/server';

const html = ReactDomServer.renderToString(
  <div>서버 사이드 렌더링 된 html 입니다.</div>
);
