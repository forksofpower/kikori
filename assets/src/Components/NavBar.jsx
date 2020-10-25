import React from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../store/auth.slice';
import { Segment, Dimmer, Loader, Image, Button, Menu, Container } from "semantic-ui-react";
import { isEmpty } from '../helpers';
import { useHistory, NavLink } from 'react-router-dom';

const NavBar = () => {
    let user = useSelector(selectCurrentUser)
    let { push } = useHistory()

    return (
        <Segment
          id="nav-bar"
          style={{ height: '10vh', width: '100%', paddingLeft: '2rem', paddingRight: '2rem'}}
        >
            <Menu
                fixed="top"
                secondary
                size='large'
            >
                <Menu.Item position={"left"}>
                    <h2 className="brand" style={{fontFamily: 'monospace', fontSize: '3rem'}}>Kik0ri</h2>
                </Menu.Item>
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
                    <Button basic color='red' size='huge' to="/signout" style={{marginLeft: '1em'}} onClick={() => push("/signout")}>Signout</Button>
                </Menu.Item>
            </Menu>
        </Segment>
    )
}

export default NavBar
