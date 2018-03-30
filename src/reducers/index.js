import { 
	ADD_TODO,
	TOGGLE_TODO,
	RECORD_TEXT,
	AMEND_TEXT,
	DELETE_TODO 
} from '../actiontypes/index.js';
import storage from '../common/storage.js';

const initialState = {
	inputtext: '',
	ListDataArr: storage.fetch(),
}

 const reducer = (state=initialState, action) => {
 	switch (action.type) {
 		case ADD_TODO: 
 			return Object.assign({}, state, {
 				ListDataArr: [
 					...state.ListDataArr,
 					{
 						text: action.text,
 						ischecked: false
 					}
 				]
 			})
 		case TOGGLE_TODO:
 			return Object.assign({}, state, {
 				ListDataArr: state.ListDataArr.map((item,index) => {
 					if(index === action.index){
 						return Object.assign({}, item, {
 							ischecked: !item.ischecked
 						})
 					}
 					return item;
 				})
 			})
 		case RECORD_TEXT:
 			return Object.assign({}, state, {
 				inputtext: action.inputtext
 			})
 		case AMEND_TEXT:
 			return Object.assign({}, state, {
 				ListDataArr: state.ListDataArr.map((item, index) => {
 					if(index === action.index){
 						return Object.assign({}, item, {
 							text: action.text
 						})
 					}
 					return item;
 				})
 			})
 		case DELETE_TODO:
 			return {
 				inputtext: state.inputtext,
 				ListDataArr: state.ListDataArr.filter((item,index) => {return index !== action.index})
 				//这个return 里面的写法一定要注意, 否则返回的对象格式就错误
 			}
 		default:
 			return state;
 	}
}









export default reducer;