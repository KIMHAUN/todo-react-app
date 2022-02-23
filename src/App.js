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
      items: [],
      //로딩중이라는 상태를 표현할 변수. 생성자에 상태 변수를 추가한다.
      loading: true,
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

    /* 로딩중이 아닐 때 렌더링 할 부분*/
    var todoListPage = (
      <div>
        {navigationBar} {/* 네비게이션 바 렌더링 */}
        <Container maxWidth="md">
          <AddTodo add={this.add}/>
          <div className="TodoList">{todoItems}</div>
        </Container>
      </div>
    );

    /* 로딩중 렌더링 할 부분*/
    var loadingPage = <h1>로딩중..</h1>;
    var content = loadingPage;

    if (!this.state.loading) {
      //로딩중이 아니라면 todoListPage 선택
      content = todoListPage;
    }
    // props로 넘겨주기.
    return <div className="App">{content}</div>;
  }
}
export default App;
