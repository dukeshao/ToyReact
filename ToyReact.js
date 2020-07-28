// class ElementWrapper {
//     constructor(type) {
//         this.root = document.createElement(type);
//     }
//     setAttribute(name, value) {
//         this.root.setAttribute(name, value);
//     }
//     appendChild(dom) {
//         this.root.appendChild(dom);
//     }
//     mountTo(parent) {
//         parent.appendChild(this.root);
//     }
// }
// class TextWrapper {
//     constructor(text) {
//         this.root = document.createTextNode(text);
//     }
//     mountTo(parent) {
//         parent.appendChild(this.root);
//     }
// }

export let ToyReact = {
    //children:array
    createElement(type, attrs, ...children) {
        let element;
        console.log("type=>", type)
        if (typeof type === "string")
            element = document.createElement(type)
        else
            element = new type;
        console.log("element=>", element)
        for (let name in attrs) {
            element.setAttribute(name, attrs[name]);
        }
        for (let child of children) {
            //child:string|dom
            if (typeof child === "string")
                child = document.createTextNode(child);
            element.appendChild(child);
        }
        console.log("return ele=>", element)
        return element;
    },
    render(vdom, element) {
        console.log("vdom+element=>", vdom, element)
        element.appendChild(vdom);
    }
}
