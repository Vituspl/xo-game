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
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    /** Поскольку компонент Game теперь рендерит статус игры, мы можем убрать
     * соответствующий код из метода render внутри Board. После изменений метод render
     * компонента Board выглядит так:
     */
    render() {
        return (
            <div>
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

/** Добавим возможность «вернуться в прошлое» — к прошлым ходам игры.
 *  Сохраним каждую версию массива squares в другом массиве и назовём его history.
 *  Этот массив history будет хранить все состояния поля.
 *  От первого до последнего хода.
 *  Размещение history в состоянии компонента Game позволяет нам удалить squares из
 *  состояния его дочернего компонента Board. Так же, как мы уже «поднимали
 *  состояние» из компонента Square в Board, мы теперь поднимем его из Board в
 *  компонент-родитель Game. Это даст компоненту Game полный контроль над данными
 *  Board и позволит отдавать команду для Board на рендеринг прошлых ходов из history:
 */
/** Для начала зададим начальное состояние компонента Game внутри конструктора:
 *
 */
class Game extends React.Component {
    /** Для начала зададим начальное состояние компонента Game внутри конструктора:  */
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            /** Прежде чем реализовывать jumpTo, мы добавим stepNumber в состояние
             * компонента Game, для указания номера хода, который сейчас отображается.
             * добавим stepNumber: 0 в начальное состояние Game внутри constructor:
             */
            stepNumber: 0,
            xIsNext: true,
        };
    }

    /** Теперь компоненту Board нужно только два метода — renderSquare и render.
     *  Состояние игры и handleClick должны находиться внутри компонента Game.
     */
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            /** В отличие от метода массива push(), с которым вы должно быть знакомы,
             *  метод concat() не изменяет оригинальный массив, поэтому мы предпочтём
             *  его.
             */
            history: history.concat([{
                squares: squares,
            }]),
            /** Когда мы делаем очередной ход, нам нужно обновить stepNumber используя
             * stepNumber: history.length как часть аргумента для this.setState.
             */
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    /** Далее, мы определим метод jumpTo в компоненте Game для обновления stepNumber.
     * Мы также установим xIsNext в true, если номер хода, на который мы меняем
     * stepNumber, чётный:
     */
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    /** Обновим метод render компонента Game, чтобы использовать последнюю запись из
     * истории для определения и отображения статуса игры:
     */
    render() {
        const history = this.state.history;
        /** мы изменим метод render для Game, чтобы вместо рендера последнего хода он
         *  рендерил ход, соответствующий stepNumber: */
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        /** Применим map к history внутри метода render Game-компонента: */
        const moves = history.map((step, move) => {
            const desc = move ?
                'Перейти к ходу #' + move :
                'К началу игры';
            return (
                /** В методе render компонента Game мы можем добавить ключ следующим
                 * образом <li key={move}>
                 */
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'Выиграл ' + winner;
        } else {
            status = 'Следующий ход: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game/>);

/** Функция calculateWinner(squares) получает массив из 9 клеток, проверяет
 *  победителя и возвращает 'X', 'O' или null.
 *  Будем вызывать calculateWinner(squares) внутри метода render класса Board,
 *  чтобы проверять, выиграл ли игрок.
 */
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}