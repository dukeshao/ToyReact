import { ToyReact, Component } from "./lib/ToyReact.js"
window.Squares = {};
class Square extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {
        window.Squares[this.props.value] = this;
        return (
            <button
                className="square"
                onClick={() => this.setState({ value: 'X' })}
            >
                {this.state.value ? this.state.value : ""}
            </button>
        );
    }
}
class Board extends Component {
    renderSquare(i) {
        return <Square value={i} />;
    }
    render() {
        const status = 'Next player: X';
        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                    {this.renderSquare(3)}
                </div>
                <div className="board-row">
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                    {this.renderSquare(6)}
                </div>
                <div className="board-row">
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                    {this.renderSquare(9)}
                </div>
            </div>
        );
    }
}
class Game extends Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}
let a = <Game />
ToyReact.render(a, document.querySelector("#root"))
//如果是大写，会以变量的形式传入；小写则会以字符串的形式传入 createElement(){}
