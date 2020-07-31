class ElementWrapper {
    constructor(type) {
        this.root = document.createElement(type);
        // this.range = document.createRange();
        // this.range.setStart(this.root, 0);
        // this.range.setEnd(this.root, 0);
        // console.log("constructor this.range=>", this.range);
    }
    setAttribute(name, value) {
        let attrName = name;
        if (name.match(/^on([\s\S]+)$/)) {
            attrName = RegExp.$1.toLowerCase();
            this.root.addEventListener(attrName, value);
        } else if (name === "className") {
            this.root.setAttribute("class", value);
        } else {
            this.root.setAttribute(name, value);
        }
    }
    appendChild(vchild) {
        let range = document.createRange();
        if (this.root.children.length) {
            range.setStartAfter(this.root.lastChild);
            range.setEndAfter(this.root.lastChild);
        } else {
            range.setStart(this.root, 0);
            range.setEnd(this.root, 0);
        }
        vchild.mountTo(range);
    }
    mountTo(range) {
        range.insertNode(this.root);
    }
}
class TextWrapper {
    constructor(text) {
        this.root = document.createTextNode(text);
    }
    mountTo(range) {
        range.insertNode(this.root);
    }
}

export let ToyReact = {
    //children:array
    createElement(type, attrs, ...children) {
        let element;
        if (typeof type === "string")
            element = new ElementWrapper(type)
        else
            element = new type;
        for (let name in attrs) {
            element.setAttribute(name, attrs[name]);
        }
        let insertChildren = (children) => {
            for (let child of children) {
                //child:string|dom
                if (typeof child === "object" && child instanceof Array)
                    insertChildren(child);
                else {
                    if (!(child instanceof Component)
                        && !(child instanceof ElementWrapper)
                        && !(child instanceof TextWrapper)
                    ) {
                        child = String(child);
                    }
                    if (typeof child === "string")
                        child = new TextWrapper(child);
                    element.appendChild(child);
                }

            }
        }
        insertChildren(children);
        return element;
    },
    render(vdom, element) {
        let range = document.createRange();
        range.setStart(element, 0);
        range.setEnd(element, 0);
        vdom.mountTo(range);
    }
}

export class Component {
    constructor() {
        this.children = [];
        this.state = {};
        this.props = Object.create(null)
    }
    update() {
        let placeholder = document.createComment("placeholder");
        let range = document.createRange();
        range.setStart(this.range.endContainer, this.range.endOffset);
        range.setEnd(this.range.endContainer, this.range.endOffset);
        range.insertNode(placeholder);

        this.range.deleteContents();
        let vdom = this.render();
        vdom.mountTo(this.range);
        //一个优化的点，删除多余的评论节点
        // placeholder.parentNode.removeChild(placeholder);
    }
    mountTo(range) {
        this.range = range;
        this.update();
    }
    setAttribute(name, value) {
        this[name] = value;
        this.props[name] = value;
    }
    appendChild(child) {
        this.children.push(child);
    }
    setState(state) {
        let merge = (oldState, newState) => {
            for (let p in newState) {
                if (newState[p] === "object") {
                    if (oldState[p] !== "object") {
                        oldState[p] = {};
                    }
                    merge(oldState[p], newState[p]);
                } else {
                    oldState[p] = newState[p];
                }
            }
        }
        if (!this.state && state)
            this.state = {};
        merge(this.state, state);
        this.update();
    }
}
