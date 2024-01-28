import './App.css';
import { useReducer } from 'react';
import DigitBtn from './DIgitBtn';
import OperationBtn from './OperationBtn';

export const ACTIONS = {
	ADD_DIGIT: 'add-digit',
	CHOOSE_OPERATION: 'choose-operation',
	CLEAR: 'clear',
	DELETE_DIGIT: 'delete-digit',
	EVALUATE: 'evaluate',
};

function reducer(state, { type, payload }) {
	switch (type) {
		case ACTIONS.DELETE_DIGIT:
			if (state.currentOperand == null) return state;
			if (state.currentOperand.length === 1) {
				return {
					...state,
					currentOperand: null,
				};
			}
			return {
				...state,
				currentOperand: state.currentOperand.slice(0, -1),
			};
		case ACTIONS.EVALUATE:
			if (
				state.currentOperand == null ||
				state.previousOperand == null ||
				state.operation == null
			)
				return state;
			return {
				...state,
				currentOperand: evaluate(state),
				previousOperand: null,
				operation: null,
				overwrite: true,
			};
		case ACTIONS.ADD_DIGIT:
			if (payload.digit === '.' && state.currentOperand == null)
				return {
					...state,
					currentOperand: '0.',
				};

			if (state.overwrite === true && payload.digit === '.')
				return {
					...state,
					currentOperand: '0.',
					previousOperand: null,
					operation: null,
					overwrite: false,
				};
			if (state.overwrite === true)
				return {
					...state,
					currentOperand: payload.digit,
					previousOperand: null,
					operation: null,
					overwrite: false,
				};
			if (payload.digit === '.' && state.currentOperand.includes('.'))
				return state;
			if (payload.digit === '0' && state.currentOperand === '0') return state;
			return {
				...state,
				currentOperand: `${state.currentOperand || ''}${payload.digit}`,
			};
		case ACTIONS.CLEAR:
			return {};
		case ACTIONS.CHOOSE_OPERATION:
			if (state.currentOperand == null && state.previousOperand == null)
				return state;
			if (state.currentOperand == null)
				return {
					...state,
					operation: payload.operation,
				};
			if (state.previousOperand == null)
				return {
					...state,
					previousOperand: state.currentOperand,
					operation: payload.operation,
					currentOperand: null,
					overwrite: false,
				};
			return {
				...state,
				previousOperand: evaluate(state),
				operation: payload.operation,
				currentOperand: null,
			};
		default:
	}
}

function evaluate({ currentOperand, previousOperand, operation }) {
	const prev = parseFloat(previousOperand);
	const current = parseFloat(currentOperand);
	console.log(prev);
	console.log(current);
	console.log(previousOperand);
	console.log(currentOperand);
	if (isNaN(prev) || isNaN(current)) return '';
	let computation = '';
	switch (operation) {
		case '+':
			computation = prev + current;
			console.log(computation);
			break;
		case '-':
			computation = prev - current;
			console.log(computation);
			break;
		case '*':
			computation = prev * current;
			console.log(computation);
			break;
		case '/':
			computation = prev / current;
			console.log(computation);
			break;
		default:
	}
	return computation.toString();
}
function App() {
	const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
		reducer,
		{}
	);

	return (
		<div className="calculator-grid">
			<div className="output">
				<div className="previous-operand">
					{previousOperand}
					{operation}
				</div>
				<div className="current-operand">{currentOperand}</div>
			</div>
			<button
				className="span-two"
				onClick={() => dispatch({ type: ACTIONS.CLEAR })}>
				AC
			</button>
			<button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
				DEL
			</button>
			<OperationBtn operation="/" dispatch={dispatch} />
			<DigitBtn digit="1" dispatch={dispatch} />
			<DigitBtn digit="2" dispatch={dispatch} />
			<DigitBtn digit="3" dispatch={dispatch} />
			<OperationBtn operation="*" dispatch={dispatch} />
			<DigitBtn digit="4" dispatch={dispatch} />
			<DigitBtn digit="5" dispatch={dispatch} />
			<DigitBtn digit="6" dispatch={dispatch} />
			<OperationBtn operation="+" dispatch={dispatch} />
			<DigitBtn digit="7" dispatch={dispatch} />
			<DigitBtn digit="8" dispatch={dispatch} />
			<DigitBtn digit="9" dispatch={dispatch} />
			<OperationBtn operation="-" dispatch={dispatch} />
			<DigitBtn digit="." dispatch={dispatch} />
			<DigitBtn digit="0" dispatch={dispatch} />
			<button
				className="span-two"
				onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>
				=
			</button>{' '}
		</div>
	);
}

export default App;
