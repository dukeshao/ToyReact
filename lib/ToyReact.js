class ElementWrapper {
    constructor(type) {
        this.root = document.createElement(type);
    }
    setAttribute(name, value) {
        this.root.setAttribute(name, value);
    }
    appendChild(vchild) {
        vchild.mountTo(this.root);
    }
    mountTo(parent) {
        parent.appendChild(this.root);
    }
}
class TextWrapper {
    constructor(text) {
        this.root = document.createTextNode(text);
    }
    mountTo(parent) {
        parent.appendChild(this.root);
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
        vdom.mountTo(element);
    }
}

export class Component {
    constructor() {
        this.children = [];
    }
    mountTo(parent) {
        let vdom = this.render();
        vdom.mountTo(parent);
    }
    setAttribute(name, value) {
        this[name] = value;
    }
    appendChild(child) {
        this.children.push(child);
    }
}
