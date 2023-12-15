import React, { useEffect } from 'react';
import { Button, Segment, Table, Header } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../../app/store/store';
import { openModal } from '../../app/common/modals/modalSlice';
import { actions } from './categorySlice';
import { useFireStore } from '../../app/hooks/firestore/useFirestore';

export default function CategoriesList() {
    const { data: categories } = useAppSelector(state => state.categories);
    const { loadCollection } = useFireStore('categories');
    const dispatch = useAppDispatch();

    useEffect(() => {
        loadCollection(actions);
    }, [loadCollection]);

    const handleCreateClick = () => {
        dispatch(openModal({ type: 'CategoryForm', data: { id: '' } }));
    };

    return (
        <Segment>
            <Button
                primary
                onClick={handleCreateClick}
                content='Create New Category'
                icon='add'
                labelPosition='left'
            />
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={5}>Name</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Image</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Edit</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>


                <Table.Body>
                    {categories.length === 0 ? (
                        <Table.Row>
                            <Table.Cell colSpan='3'>
                                <Header textAlign='center'>No categories yet</Header>
                            </Table.Cell>
                        </Table.Row>
                    ) : (
                        categories.map(category => (
                            <Table.Row key={category.id}>
                                <Table.Cell>{category.name}</Table.Cell>
                                <Table.Cell>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                        <img src={category.imageUrl} alt={category.name} style={{ maxWidth: '100%', maxHeight: '10vh' }} />
                                    </div>
                                </Table.Cell>
                                <Table.Cell>
                                    <Button fluid icon='edit' content='Edit' onClick={() => dispatch(openModal({ type: 'CategoryForm', data: { id: category.id } }))} />
                                </Table.Cell>
                            </Table.Row>
                        ))
                    )}
                </Table.Body>
            </Table>
        </Segment>
    );
}
