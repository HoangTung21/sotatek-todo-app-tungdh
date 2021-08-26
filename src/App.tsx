import { Redirect, Route, Switch } from "react-router-dom";
import { TodoApp } from "./containers";

function App(): JSX.Element {
  return (
    <Switch>
      <Route exact path="/">
        <TodoApp />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
}

export default App;
