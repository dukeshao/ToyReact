import { ToyReact, Component } from "./lib/ToyReact.js"
class MyComponent extends Component {
    render() {
        return <div name="shao">
            <span>are</span>
            <span>you</span>
            <span>ok</span>
            {this.children}
        </div>
    }
}
class HisComponent extends Component {
    render() {
        return <div>his hero</div>
    }
}
let a = <MyComponent name="duke" id="box">
    <div>children</div>
    <HisComponent></HisComponent>
</MyComponent>
ToyReact.render(a, document.querySelector("#root"))
//如果是大写，会以变量的形式传入；小写则会以字符串的形式传入 createElement(){}
