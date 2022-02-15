import React from 'react';
import Todo from './Todo'
import AddTodo from "./AddTodo"
import { Container, Paper, List } from "@material-ui/core";
import './App.css';
import { call } from "./service/ApiService";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        //{id: "0", title: "Hello World 1", done: true },
        //{id: "1", title: "Hello World 2", done: false },
      ],
    };
  }

  // (1) 함수 추가
  add = (item) => {
    const thisItems = this.state.items;
    item.id = "ID-" + thisItems.length; //key를 위한 id 추가
    item.done = false; //done 초기화
    thisItems.push(item);
    this.setState({ item: thisItems });
    console.log("items : ", this.state.items);
  }

  //삭제
  delete = (item) => {
    const thisItems = this.state.items;
    console.log("Before Update Items : ", this.state.items)
    const newItems = thisItems.filter(e => e.id !== item.id);
    this.setState({ items: newItems }, () => {
      //debugging callback
      console.log("Update Items : ", this.state.items)
    });
  }

  componentDidMount() {
    // 메서드를 명시하고 싶은 경우나 헤더와 바디를 함께 보내야 할 경우 fetch의 두 번째 매개변수에 요청에 대한 정보가 담긴 오브젝트를 정의
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch("http://localhost:8080/todo", requestOptions)
      .then((response) => response.json())
      .then(
        (response) => {
          //response 수신 시 하고 싶은 작업
          this.setState({
            items: response.data,
          });
        },
        (error) => {
          this.setState({
            error,
          });
        }
      );
  }

  render() {
    var todoItems = this.state.items.length > 0 && (
      <Paper style={{ margin : 16 }}>
        <List>
          {this.state.items.map((item, idx) => (
            <Todo item={item} key={item.id} delete={this.delete} />
          ))}
        </List>
      </Paper>
    );

    // (2) 함수 연결
    return (
      <div className="App">
        <Container maxWidth="md">
          <AddTodo add={this.add}/>
          <div className="TodoList">{todoItems}</div>
        </Container>
      </div>
    );
  }
}
export default App;
