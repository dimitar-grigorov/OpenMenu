import { Card, Button } from 'semantic-ui-react';
import { Category } from '../../app/types/category';
import { useAppDispatch } from '../../app/store/store';
import { openModal } from '../../app/common/modals/modalSlice';

type Props = {
    category: Category;
};

export default function CategoryItem({ category }: Props) {
    const dispatch = useAppDispatch();

    const handleEditClick = () => {
        dispatch(openModal({ type: 'CategoryForm', data: { id: category.id } }));
    };

    return (
        <Card>
            <Card.Content>
                <Card.Header>{category.name}</Card.Header>
                <Card.Description>
                    <img src={category.imageUrl} alt={category.name} style={{ maxWidth: '100%' }} />
                </Card.Description>
                <Button
                    icon='edit'
                    content='Edit'
                    onClick={handleEditClick}
                />
            </Card.Content>
        </Card>
    );
};
