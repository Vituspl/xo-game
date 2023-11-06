import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

class Square extends React.Component {
    /** добавим конструктор к классу, чтобы инициализировать состояние */
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {
        return (
            /** В комп Square, Кнопке присвоим название, взятое из состояния значение value={i}
             * После этого при клике на квадрат-ячейку увидим 'X' */
            <button className="square" onClick={() => this.setState({value: 'X'})}>
                {this.state.value}
            </button>
        );
    }
}

class Board extends React.Component {
    /** Компонент Board - родитель для компонента Square */
    /** Добавим конструктор к компоненту Board и установим начальное состояние
     * в виде массива из 9 элементов, заполненного значениями null.
     * Эти 9 элементов соответствуют 9 квадратам: */
    constructor(props) {
        super(props);
        this.state={
            squares: Array(9).fill(null)
        }
    }
    /** Передадим данные (i) из родительского комп Board в дочерний комп Square */
    renderSquare(i) {
        return <Square value={i}/>;
    }

    render() {
        const status = 'Next player: X';

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board/>
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game/>);
