import { Grid } from 'semantic-ui-react';
import MenuItemList from './MenuItemList';
import { useAppSelector } from '../../../app/store/store';
import { useEffect, useRef, useState } from 'react';
import { actions } from '../../menuItemSlice';
import { useFireStore } from '../../../app/hooks/firestore/useFirestore';

export default function MenuDashboard() {
    const contextRef = useRef(null);
    const { data: menuItems, status } = useAppSelector(state => state.menuItems);
    const { loadCollection } = useFireStore('menuItems');

    useEffect(() => {
        loadCollection(actions)
    }, [loadCollection])

    return (
        <Grid>
            <Grid.Column width={10} ref={contextRef}>
                <MenuItemList menuItems={menuItems} />
            </Grid.Column>
            <Grid.Column width={6}>
            </Grid.Column>
        </Grid>
    )
}