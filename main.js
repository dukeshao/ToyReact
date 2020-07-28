import { ToyReact } from "./ToyReact.js"
class MyComponent {
    render() {
        return <div>cool</div>
    }
}
let a = <MyComponent></MyComponent>
ToyReact.render(a, document.querySelector("#root"))
//如果是大写，会以变量的形式传入；小写则会以字符串的形式传入 createElement(){}
