import ReactDomServer from 'react-dom/server';
import express from 'express';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import path from 'path';
import fs from 'fs';

const manifest = JSON.parse(
  fs.readFileSync(path.resolve('./build/asset-manifest.json'), 'utf-8')
);

function createPage(root) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
        <title>React App</title>
        <link href={manifest.files['main.css']} rel="stylesheet" />
      </head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root">{root}</div>
        <script src={manifest.files['main.js']}></script>
      </body>
    </html>
  );
}
const app = express();

const serverRender = async (req, res, next) => {
  const jsx = (
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  );

  const { pipe } = ReactDomServer.renderToPipeableStream(createPage(jsx), {
    onShellReady: () => {
      res.setHeader('content-type', 'text/html');
      pipe(res);
    },
  });
};

const serve = express.static(path.resolve('./build'), { index: false });

app.use(serve);
app.use(serverRender);

app.listen(5000, () => {
  console.log('5000번 포트에서 실행중');
});
