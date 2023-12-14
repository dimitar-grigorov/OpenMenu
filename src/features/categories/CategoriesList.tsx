import { useEffect, useRef } from 'react';
import { Button, Grid, Header, Segment } from 'semantic-ui-react';
import CategoryItem from './CategoryItem';
import { openModal } from '../../app/common/modals/modalSlice';
import { useAppDispatch, useAppSelector } from '../../app/store/store';
import { actions } from './categorySlice';
import { useFireStore } from '../../app/hooks/firestore/useFirestore';

export default function CategoriesList() {
    const contextRef = useRef(null);
    const { data: categories } = useAppSelector(state => state.categories);
    const { loadCollection } = useFireStore('categories');
    const dispatch = useAppDispatch();
    console.log(categories);

    useEffect(() => {
        loadCollection(actions)
    }, [loadCollection])

    return (
        <>
            <Segment>
                <Button
                    primary
                    onClick={() => dispatch(openModal({ type: 'CategoryForm', data: { id: '' } }))}
                    content='Create New Category'
                    icon='add'
                    labelPosition='left'
                />
                <Grid columns={3} stackable textAlign='center'>
                    {categories.length === 0 ? (
                        <Grid.Column>
                            <Header icon>
                                <i className="icon folder open outline" /> No categories yet
                            </Header>
                        </Grid.Column>
                    ) : (
                        categories.map(category => (
                            <Grid.Column key={category.id} ref={contextRef}>
                                <CategoryItem category={category} />
                            </Grid.Column>
                        ))
                    )}
                </Grid>
            </Segment>
        </>
    );
};