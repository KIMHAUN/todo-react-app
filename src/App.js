import React from 'react';
import Todo from './Todo'
import AddTodo from "./AddTodo"
import { Container, Paper, List, Grid, Button, AppBar, Toolbar, Typography } from "@material-ui/core";
import './App.css';
import { call, signout } from "./service/ApiService";


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

  componentDidMount() {
    call("/todo", "GET", null).then((response) =>
      this.setState({ items: response.data})
    );
  }

  add = (item) => {
    call("/todo", "POST", item).then((response) =>
      this.setState({ items: response.data})
    );
  };

  update = (item) => {
    call("/todo", "PUT", item).then((response) =>
      this.setState({ items: response.data})
    );
  };

  //삭제
  delete = (item) => {
    call("/todo", "DELETE", item).then((response) =>
      this.setState({ items: response.data})
    );
  };



  render() {
    var todoItems = this.state.items.length > 0 && (
      <Paper style={{ margin : 16 }}>
        <List>
          {this.state.items.map((item, idx) => (
            <Todo
              item={item}
              key={item.id}
              delete={this.delete}
              update={this.update}
            />
          ))}
        </List>
      </Paper>
    );

    //navigationBar 추가
    var navigationBar = (
      <AppBar position="static">
        <Toolbar>
          <Grid justify="space-between" container>
            <Grid item>
              <Typography variant="h6">오늘의 할 일</Typography>
            </Grid>
            <Grid>
              <Button color="inherit" onClick={ signout }>
                로그아웃
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );

    // props로 넘겨주기.
    return (
      <div className="App">
        {navigationBar} {/* 네비게이션 바 렌더링 */}
        <Container maxWidth="md">
          <AddTodo add={this.add}/>
          <div className="TodoList">{todoItems}</div>
        </Container>
      </div>
    );
  }
}
export default App;
