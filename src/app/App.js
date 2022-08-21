import SignIn from "features/authentication/pages/SignIn";
import Signup from "features/authentication/pages/SignUp";
import Booking from "features/booking/pages/Booking";
import Detail from "features/booking/pages/Detail";
import Payment from "features/booking/pages/Payment";
import Home from "../features/booking/pages/Home";
import PageNotFound from "common/components/404";
import MovieManagement from "features/movies/pages/MovieManagement/";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Header from "common/components/Header";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/booking" component={Booking} />
          <Route path="/detail/:id" component={Detail} />
          <Route path="/payment" component={Payment} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={Signup} />
          <Route path="/movies" component={MovieManagement} />
          <Route path="*" component={PageNotFound} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
