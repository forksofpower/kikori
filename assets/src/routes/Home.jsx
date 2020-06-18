import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../store/auth.slice";
import { isEmpty } from "../helpers";
import { Button } from "semantic-ui-react";
import { NavLink, useHistory } from "react-router-dom";

import DelayRender from "../Components/DelayRender";

const Home = () => {
  let currentUser = useSelector(selectCurrentUser);
  const { push } = useHistory();

  return (
    <div>
      {!isEmpty(currentUser) ? (
        <div>
          <h1>Welcome Home, {currentUser.name}!</h1>
          <Button basic color="blue" onClick={() => push("/projects")}>View your Projects</Button>
          <Button basic color="red" onClick={() => push("/signout")}>
            Signout
          </Button>
        </div>
      ) : (
        <div>
          <h1>Home!</h1>
            <Button color="blue" onClick={() => push("/login")}>
              Sign In
            </Button>
        </div>
      )}
    </div>
  );
};

export default Home;
