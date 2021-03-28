import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

const getArticle = () => {
  const custom_func = html => {
    let replaced = html.replace(/<br>/g, '\n');
    replaced = replaced.replace(/^\s/gm, '');

    const doc = new DOMParser().parseFromString(replaced, 'text/html');
    return doc.documentElement.textContent;
  };

  const target = $('.escaped');

  let arr = [];
  for (let i = 0; i < target.length; i++) {
    arr.push({
      text: custom_func(target.eq(i).html()),
      date: $('.date').eq(i).text().trim(),
    });
  }

  return arr;
};

const init = () => {
  document.documentElement.innerHTML = `
    <!DOCTYPE html>
    <html lang="ja">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>5ちゃんねる拡張 React</title>
        <style>
        .kiji {
          background: #f7f7f7;
          padding: 5px;
          white-space: pre-wrap;
          overflow-wrap: break-word;
          margin-bottom: 25px;
        }
  
        .text {
          font-weight: bold;
          font-size: 22px;
          margin: 0;
        }
  
        .data {
          margin: 0;
        }
      </style>
      </head>
      <body>
        <div id="root"></div>
      </body>
    </html>   
    `;
};

const render = data => {
  const App = () => {
    return (
      <>
        <a href="#last">ラスト</a>
        <div style={{ maxWidth: 768, margin: 0 }}>
          {data.map((m, i) => {
            return (
              <div key={i} className="kiji">
                <p className="data">
                  {i + 1}: {m.date.trim()}
                </p>

                <p className="text">{m.text.trim()}</p>
              </div>
            );
          })}
        </div>
        <div id="last"></div>
      </>
    );
  };

  ReactDOM.render(<App />, document.getElementById('root'));
};

const main = () => {
  const data = getArticle();
  init();
  render(data);
};

main();
