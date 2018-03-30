
var storageName = 'todolist-react';
const storage = {
  fetch(){
    return JSON.parse(localStorage.getItem(storageName) || '[]');
  },
  save(jsondata){
    localStorage.setItem(storageName,JSON.stringify(jsondata));
  }
}

export default storage;