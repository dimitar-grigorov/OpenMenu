import { NavLink } from 'react-router-dom';
import { Container, Menu, MenuItem } from 'semantic-ui-react';

export default function NavBar() {
    return (
        <Menu inverted={true} fixed='top'>
            <Container>
                <MenuItem header as={NavLink} to='/'>
                    <img src="/logo.png" alt="logo" />
                    Open Menu
                </MenuItem>
                <MenuItem name='Menu' as={NavLink} to='/menu' />
                <MenuItem name='Lab' as={NavLink} to='/lab' />
            </Container>
        </Menu>
    )
}