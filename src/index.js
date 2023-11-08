import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

/** сделаем Square функциональным компонентом.
 * Мы заменили this.props на props оба раза, когда обращались к ним.
 */
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    /** Компонент Board - родитель для компонента Square */
    /** Добавим конструктор к компоненту Board и установим начальное состояние
     * в виде массива из 9 элементов, заполненного значениями null.
     * Эти 9 элементов соответствуют 9 квадратам: */
    /** По-умолчанию установим первый ход за «X». Мы можем сделать это,
     * изменяя начальное состояние внутри конструктора Board: xIsNext:true .
     * Каждый раз, когда игрок делает ход, xIsNext (булево значение) будет
     * инвертироваться, чтобы обозначить, какой игрок ходит следующим, а
     * состояние игры будет сохраняться.
     */
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext:true,
        };
    }
    /** Компонент Board будет хранить информацию о заполненных клетках.  */

    /** добавим метод handleClick в класс Board: */
    handleClick(i) {
        /** внутри handleClick мы вызвали .slice() для создания копии
         * массива squares вместо изменения существующего массива.  */
        /** Мы обновим метод handleClick класса Board, для инверсии значения xIsNext:
         *  squares[i] = this.state.xIsNext ? 'X' : 'O';
         *  xIsNext: !this.state.xIsNext,
         *  После этих изменений «X» и «O» будут чередоваться.
         */
        const squares = this.state.squares.slice();
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    /** Передадим данные (i) из родительского комп Board в дочерний комп Square */
    /** Изменим Board, чтобы передать каждому Square его текущее значение ('X', 'O' или null).
     *  Мы уже определили массив squares в конструкторе Board.
     *  Изменим метод renderSquare, чтобы читать данные из этого массива: */
    renderSquare(i) {
        return (
            /** каждый Square получает проп value, который будет, либо 'X' или 'O', либо null
             * для пустых клеток.  */
            <Square
                value={this.state.squares[i]}
                /** передадим из Board в Square функцию, и будем её вызывать из Square,
                * когда по тому кликнули.  */
                onClick={() => this.handleClick(i)}
            />
        );
    }

    render() {
        /** Также изменим текст «status» в методе render класса Board так,
         * чтобы он отображал какой игрок ходит следующим:
         */
        const status = 'Следующий ход: ' + (this.state.xIsNext ? 'X' : 'O');

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
