// 使用 JSX 编写的代码将会被转换成使用 React.createElement() 的形式。
/**
 *
 * @param {*} tag 标签
 * @param {*} attrs 属性
 * @param  {...any} children 标签内容  也可是子标签
 */
function createElement(tag, attrs, ...children) {
  return {
    tag,
    attrs,
    children
  };
}

const React = {
  createElement
};

const element = (
  <div className1="cln abs">
    hello
    <span>world!</span>
  </div>
);
console.log(element);

/**
 * 将虚拟DOM渲染到真实DOM上
 * @param {*} vnode createElement返回的对象即虚拟dom
 * @param {*} container 挂载的目标DOM
 */
function render(vnode, container) {
  if (typeof vnode === "string") {
    const textNode = document.createTextNode(vnode);
    return container.appendChild(textNode);
  }

  const dom = document.createElement(vnode.tag);
  if (vnode.attrs) {
    Object.keys(vnode.attrs).forEach(key => {
      if (key === "className") {
        // 当属性名为className时，改回class
        key = "class";
      }
      dom.setAttribute(key, vnode.attrs[key]);
    });
  }

  vnode.children.forEach(child => render(child, dom)); // 递归渲染子节点

  return container.appendChild(dom); // 将渲染结果挂载到真正的DOM上
}

/**
 * 将render挂载到reactDOMN上
 * 为了防止多次调用render时不会清楚原有内容
 * 先将其清空
 */
const ReactDOM = {
  render: (vnode, container) => {
    container.innerHTML = "";
    return render(vnode, container);
  }
};

ReactDOM.render(<h1>Hello, world!</h1>, document.getElementById("root"));

function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById("root"));
}

setInterval(tick, 1000);
