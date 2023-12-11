import { NavLink } from 'react-router-dom';
import { Container, Menu, MenuItem } from 'semantic-ui-react';
import { useAppSelector } from '../../store/store';
import SignedInMenu from './SignedInMenu';
import SignedOutButtons from './SignedOutButtons';

export default function NavBar() {
    const { authenticated } = useAppSelector(state => state.auth)

    return (
        <Menu inverted={true} fixed='top'>
            <Container>
                <MenuItem header as={NavLink} to='/'>
                    <img src="/logo.png" alt="logo" />
                    Open Menu
                </MenuItem>
                <MenuItem name='Menu' as={NavLink} to='/menu' />
                <MenuItem name='Lab' as={NavLink} to='/lab' />

                {authenticated ? <SignedInMenu /> : <SignedOutButtons />}
            </Container>
        </Menu>
    )
}