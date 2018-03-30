import { 
	ADD_TODO,
	TOGGLE_TODO, 
	RECORD_TEXT,
	AMEND_TEXT,
	DELETE_TODO 
} from '../actiontypes/index.js'

export const addTodo = (text) => {
	return {
		type: ADD_TODO,
		text
	}
}

export const deleteTodo = (index) => {
	return {
		type: DELETE_TODO,
		index
	}
}

export const toggleTodo = (index) => {
	return {
		type: TOGGLE_TODO,
		index
	}
}

export const recordText = (inputtext) => {
	return {
		type: RECORD_TEXT,
		inputtext	
	}
}

export const amendText = (text,index) => {
	return {
		type: AMEND_TEXT,
		text,
		index
	}
}





