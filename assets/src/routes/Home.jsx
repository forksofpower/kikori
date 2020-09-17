// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { selectCurrentUser } from "../store/auth.slice";
// import { isEmpty } from "../helpers";
// import { Button } from "semantic-ui-react";
// import { NavLink, useHistory } from "react-router-dom";

// import DelayRender from "../Components/DelayRender";
// import useChannel from "../store/useChannel";
// import { useEffect } from "react";

// const Home = () => {
//   const [statsChannel] = useChannel('statistics:lobby');
//   const [stats, setStats] = useState({})

//   let currentUser = useSelector(selectCurrentUser);
//   const { push } = useHistory();

//   useEffect(() => {
//     if (!statsChannel) return;
    
//     statsChannel.on("stats", ({ statistics }) => {
//       if (!isEmpty(statistics)) {
//         setStats({...stats, ...statistics})
//       }
//     })

//     statsChannel.push("get_stats").receive((data) =>
//       console.log(data)
//     )

//     return () => {
//       statsChannel.off("update_stat", statsChannel)
//     }
//   }, [statsChannel])

//   return (
//     !isEmpty(currentUser) ? (
//       <div>
//         <h1>Welcome Home, {currentUser.name}!</h1>
//         <Button basic color="blue" onClick={() => push("/projects")}>View your Projects</Button>
//         <Button basic color="red" onClick={() => push("/signout")}>
//           Signout
//         </Button>
//       </div>
//     ) : (
//       <div>
//         <h1>Home!</h1>
//           <Button color="blue" onClick={() => push("/login")}>
//             Sign In
//           </Button>
//       </div>
//     )
//   );
// };

// export default Home;
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'
import { isEmpty } from '../helpers'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../store/auth.slice'
import { useHistory } from 'react-router-dom'

const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      id="app-title"
      as='h1'
      content='Kik0ri'
      inverted
      style={{
        fontSize: mobile ? '2em' : '6em',
        fontWeight: '900',
        fontFamily: 'monospace',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '1.5em',
      }}
    />
    <Header
      as='h2'
      content="A centralized logging platform for structured data, built with Elixir, Phoenix, React, and Redux."
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        fontFamily: 'sans-serif',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />
    <Button size='huge' color="black">
      Get Started
      <Icon name='right arrow' />
    </Button>
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
const DesktopContainer = ({children}) => {
  let { push } = useHistory();
  let user = useSelector(selectCurrentUser);

  let [fixed, setFixed] = useState(false)

  const hideFixedMenu = () => setFixed(false)
  const showFixedMenu = () => setFixed(true)

  return (
    <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
      <Visibility
        once={false}
        onBottomPassed={showFixedMenu}
        onBottomPassedReverse={hideFixedMenu}
      >
        <Segment
          // inverted
          id="home-hero"
          style={{ minHeight: 700, padding: '1em 0em' }}
          vertical
        >
          <Menu
            fixed={fixed ? 'top' : null}
            secondary={!fixed}
            size='large'
          >
            <Container>
              <Menu.Item position='right'>
                {isEmpty(user) ? (
                  <Button color="black" size='huge' onClick={() => push("/login")}>
                    Log in
                  </Button>
                ) : (
                  <Button color='black' size='huge' onClick={() => push("/projects")}>
                    Projects
                  </Button>
                )}
              </Menu.Item>
            </Container>
          </Menu>
          <HomepageHeading />
        </Segment>
      </Visibility>

      {children}
    </Responsive>
  )
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const Home = () => (
  <ResponsiveContainer>
    {/* <Segment style={{ padding: '0em' }} vertical inverted>
      <Grid columns='equal' stackable>
        <Grid.Row textAlign='center'>
          <Grid.Column style={{ paddingBottom: '10em', paddingTop: '5em' }}>
            <Header 
                as='h3' 
                style={{ 
                  fontSize: '2em', 
                  background: 'linear-gradient(315deg, #6e72fc 0%, #ad1deb 74%)',
                  webkitBackgroundClip: 'text',
                  webkitTextFillColor: 'transparent'
                }}>
              "If you think about it, log management is a lot like a <code>glacier</code>."
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              - Antonio Reid (probably)
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment> */}

    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='About' />
              <List link inverted>
                <List.Item as='a'>Sitemap</List.Item>
                <List.Item as='a'>Contact Us</List.Item>
                <List.Item as='a'>Religious Ceremonies</List.Item>
                <List.Item as='a'>Gazebo Plans</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Services' />
              <List link inverted>
                <List.Item as='a'>Banana Pre-Order</List.Item>
                <List.Item as='a'>DNA FAQ</List.Item>
                <List.Item as='a'>How To Access</List.Item>
                <List.Item as='a'>Favorite X-Men</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as='h4' inverted>
                Footer Header
              </Header>
              <p>
                A centralized logging platform for structured data, built for people who don't know what that is.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
)

export default Home

