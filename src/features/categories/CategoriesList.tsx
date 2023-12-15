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
            <Table celled structured>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={5}>Name</Table.HeaderCell>
                        <Table.HeaderCell>Image</Table.HeaderCell>
                        <Table.HeaderCell>Edit</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {categories.map(category => (
                        <Table.Row key={category.id}>
                            <Table.Cell verticalAlign="middle">{category.name}</Table.Cell>
                            <Table.Cell textAlign="center">
                                <div style={{ display: 'inline-block', width: '100px', height: '100px', overflow: 'hidden' }}>
                                    <img
                                        src={category.imageUrl}
                                        alt={category.name}
                                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                            </Table.Cell>
                            <Table.Cell textAlign="center" verticalAlign="middle">
                                <Button
                                    fluid
                                    icon='edit'
                                    content='Edit'
                                    onClick={() => dispatch(openModal({ type: 'CategoryForm', data: { id: category.id } }))}
                                />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>

        </Segment>
    );
}
