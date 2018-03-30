# todolist-redux
这是之前已经做过的demo, 学习redux时 官方给的demo就有todolist正好拿来改  

`redux`理解起来比较困难, 需要把相关的概念如:  
`store` `action` `reducer` `dispatch` `subscribe` `createStore(reducer)` `getState`  
理解它们的作用以及它们之间是如何配合使用的

redux的[中文官网](http://cn.redux.js.org/docs/basics/ "redux中文官网" target="_blank") 基础部分 和 [阮一峰的redux入门教程](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html "阮一峰的redux入门教程"){:target="_blank"} 反复看, 理解起来就能稍微快些.

简单记一下几个使用redux的要点吧:  

0.**三大原则**  
`单一数据源` `State 是只读的` `使用纯函数来执行修改`

1.要在顶层(有**ReactDOM.render**的那个文件)定义`store` 然后 当作props传递给App组件, App组件再通过`context`传递给内部子组件  

**在顶层监听函数**  
<pre><code>
const render = () => ReactDOM.render...
store.subscribe(render)
</pre></code>


2.`action` 里的 `type` 种类如果很多 可以单独从**(actiontypes.js)**文件引入type常量
比如:  
**actiontype.js文件**
<pre><code>
export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const RECORD_TEXT = 'RECORD_TEXT';
export const AMEND_TEXT = 'AMEND_TEXT';
export const DELETE_TODO = 'DELETE_TODO';
</code></pre>

**action.js文件**
<pre><code>
import { 
	ADD_TODO,
	TOGGLE_TODO, 
	RECORD_TEXT,
	AMEND_TEXT,
	DELETE_TODO 
} from '../actiontypes/index.js'
</code></pre>

3.`reducer` 纯函数, 传入初始 `state` 和 `action` 两个参数, 通过`switch( action.type )` 根据每一个**action.type**  
返回新的state, 切记 **不要修改原来的state**.  
``Object.assign({}, state, newsState)`` 方法就是将新的state和旧的state合并后返回一个新的state  
`reducer` 每个case里的return 写法很有可能出错而导致state更新错误  

**注:** 箭头函数后面如果是{} 大括号 里面必须有return , 没有{}才可以不加return, 如:  
`() => ()` 或 `() => { return xxx }`

4.`combineReducers()`用于`reducer`的拆分, 这里没有用到, 需要知道有这个方法
