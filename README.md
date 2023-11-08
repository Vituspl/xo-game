Подъём состояния. Снова
Мы хотим, чтобы вышележащий компонент Game отображал список последних ходов. Для этого ему понадобится доступ к history, поэтому мы поместим history в состояние родительского компонента Game.

Размещение history в состоянии компонента Game позволяет нам удалить squares из состояния 
его дочернего компонента Board. Так же, как мы уже «поднимали состояние» из компонента 
Square в Board, мы теперь поднимем его из Board в компонент-родитель Game. Это даст 
компоненту Game полный контроль над данными Board и позволит отдавать команду для Board на
рендеринг прошлых ходов из history:

После этого нужно, чтобы Board получил пропсы squares и onClick из компонента Game. Поскольку внутри Board у нас один обработчик кликов для всех Squares, нам достаточно передать позицию для каждого Square в обработчик onClick, чтобы показать по какой клетке мы кликнули. Для изменения компонента Board нам нужно выполнить следующие шаги:

1 Удалить constructor в Board.
2 Заменить this.state.squares[i] на this.props.squares[i] в методе renderSquare Board.
3 Заменить this.handleClick(i) на this.props.onClick(i) в методе renderSquare Board.

Далее обновим метод render компонента Game, чтобы использовать последнюю запись из истории
для определения и отображения статуса игры:

Поскольку компонент Game теперь рендерит статус игры, мы можем убрать соответствующий код 
из метода render внутри Board. После изменений метод render компонента Board выглядит так:

Наконец, нужно перенести метод handleClick из компонента Board в компонент Game. Мы также 
должны изменить handleClick, потому что состояние компонента Game имеет другую структуру. 
В методе handleClick компонента Game мы добавим новые записи истории в history.

Поскольку мы записываем ход игры, мы теперь можем показать игроку список предыдущих ходов.
Используя метод map, мы можем отобразить историю наших ходов в React-элементы, 
представленные кнопками на экране, и отрисовать список кнопок для «перехода» к прошлым 
ходам.
Применим map к history внутри метода render Game-компонента:

В истории игры крестики-нолики каждый прошлый ход имеет уникальный идентификатор: это номер хода в последовательности. Ходы никогда не меняют свой порядок, не удаляются и не добавляются в середину последовательности, так что вполне безопасно пользоваться индексом в качестве ключа.

В методе render компонента Game мы можем добавить ключ следующим образом <li key={move}> 
и предупреждения от React об отсутствующих ключах должны пропасть:

Клик на любой кнопке из списка выбросит ошибку, потому что метод jumpTo не определён. Прежде чем реализовывать jumpTo, мы добавим stepNumber в состояние компонента Game, для указания номера хода, который сейчас отображается.

Сначала добавим stepNumber: 0 в начальное состояние Game внутри constructor:

Обратите внимание, что в методе jumpTo мы не обновили свойство history состояния. Это потому, что обновления состояния объединяются или, проще говоря, React обновит только те свойства, которые были указаны в методе setState без изменения остальных свойств. Подробнее об этом читайте в документации.

Мы сделаем ещё несколько изменений в методе Game handleClick, который выполняется когда вы кликаете на клетки.

Добавленный нами stepNumber указывает номер хода, отображающегося пользователю. Когда мы делаем очередной ход, нам нужно обновить stepNumber используя stepNumber: history.length как часть аргумента для this.setState. Это гарантирует, что мы не застрянем, показывая одно и то же после того, как был сделан новый ход.

Мы также заменим чтение this.state.history на this.state.history.slice(0, this.state.
stepNumber + 1). Это гарантирует, что если мы «вернёмся назад», а затем сделаем новый шаг
из этой точки, мы удалим всю «будущую» историю, которая перестала быть актуальной.



# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
