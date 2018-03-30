import React, { Component } from 'react';
import storage from './common/storage.js';
import PropTypes from 'prop-types';
import { addTodo, toggleTodo,recordText,amendText,deleteTodo } from './actions/index.js';
import './App.less';



//去除两边空格
function trim(str){
  return str.replace(/(^\s*)|(\s*$)/g, "");
}

//新增事项组件
class AddPanel extends Component {
  constructor(props){
    super(props);
    this.addhandler = this.addhandler.bind(this);
  }
  addhandler(e){
    var inputStr = this.input.value;
    var trimStr = trim(inputStr);
    if(( e.target.type === 'text' && e.keyCode === 13 ) || e.target.type === 'button'){
      if(!trimStr){
        return 
      }
      this.context.store.dispatch(addTodo(trimStr));
      storage.save(this.context.store.getState().ListDataArr);
      this.input.value = '';
    }
  }
  render(){
    return (
      <div className="addpanel clearfix">
        <button type="button" onClick={this.addhandler}>新增</button>
        <div className="addinput">
          <input type="text" placeholder="请输入添加事项" onKeyDown={this.addhandler} ref={input => this.input=input} />
        </div>
      </div>
    )
  }
}

AddPanel.contextTypes = {
  store: PropTypes.object,
}

//显示代办事项组件
class ListPanel extends Component {
  constructor(props){
    super(props);
    this.state = {
      inputText: ''
    };
    this.changeChecked = this.changeChecked.bind(this);
    this.modification = this.modification.bind(this);
    this.keydownModification = this.keydownModification.bind(this);
    this.deletehandler = this.deletehandler.bind(this);
    this.textrecord = this.textrecord.bind(this);
    this.bindinputvalue = this.bindinputvalue.bind(this);
  }
  static contextTypes = {
    store: PropTypes.object,
  }
  changeChecked(index){
    const {store} = this.context;
    store.dispatch(toggleTodo(index));
    storage.save(store.getState().ListDataArr);
  }
  modification(index,e){
    const {store} = this.context;
    var inputtext = store.getState().inputtext;
    var afterStr = trim(e.target.value);
    if(e.target.value === inputtext){
      return false;
    }
    else if(afterStr === inputtext){
      store.dispatch(amendText(afterStr,index));
      storage.save(store.getState().ListDataArr);
    }else{
      var conf = window.confirm('确定修改么?');
      if(conf){
        store.dispatch(amendText(afterStr,index));
        storage.save(store.getState().ListDataArr);
      }else{
        store.dispatch(amendText(inputtext,index));
        storage.save(store.getState().ListDataArr);
      }
    }
  }
  keydownModification(index,e){
    if(e.keyCode === 13){
      e.target.blur();
    }
  }
  deletehandler(index,e){
    const {store} = this.context;
    var conf = window.confirm('确定删除么?');
      if(conf){
        store.dispatch(deleteTodo(index));
        storage.save(store.getState().ListDataArr);
      }
  }
  textrecord(index,e){
    const {store} = this.context;
    store.dispatch(recordText(e.target.value));
    storage.save(store.getState().ListDataArr);
  }
  bindinputvalue(index,e){
    const {store} = this.context;
    store.dispatch(amendText(e.target.value,index));
    storage.save(store.getState().ListDataArr);
  }
  render(){
    var { store } = this.context;
    var ListDataArr = store.getState().ListDataArr;
    return (
      <div className="listpanel">
        <h3>您的待办事项</h3>
        <ul>
          {
            ListDataArr.map((item,index) => {
              return (
                <li key={index+1}>
                  <span>
                    <input type="checkbox" onChange={this.changeChecked.bind(null,index)} checked={item.ischecked?true:false}/>
                    {index+1+": "}
                  </span>
                  <div>
                    <input type="text" value={item.text} ref={text => this.listinput = text} onChange={this.bindinputvalue.bind(null,index)} onFocus={this.textrecord.bind(null,index)} onBlur={this.modification.bind(null,index)} onKeyDown={this.keydownModification.bind(null,index)} disabled={item.ischecked?true:false} className={item.ischecked?'done':''}/>
                  </div>
                  <i onClick={this.deletehandler.bind(null,index)}></i>
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}



class Statistics extends Component {
  static contextTypes = {
    store: PropTypes.object,
  }
  render(){
    var {ListDataArr} = this.context.store.getState(),
        total = ListDataArr.length,
        finished = 0;
        ListDataArr.forEach(function(item,index){
          if(item.ischecked){
            finished++;
          }
        })
    return (
      <div className="statisticsPanel">
        共: <span className="color01">{total}</span> 个事项, 其中 完成事项: <span className="color02">{finished}</span> 个, 代办事项: <span className="color03">{total-finished}</span> 个.
      </div>
    );
  }
}


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      ListDataArr: storage.fetch(),
    }
  }
  static childContextTypes = {
    store: PropTypes.object,
  }
  getChildContext(){
    return {
      store: this.props.store,
    }
  }
  render() {
    return (
      <div id="app">
        <AddPanel ListDataArr={this.state.ListDataArr}></AddPanel>
        <ListPanel ListDataArr={this.state.ListDataArr}></ListPanel>
        <Statistics ListDataArr={this.state.ListDataArr}></Statistics>
      </div>
    );
  }
}





export default App;