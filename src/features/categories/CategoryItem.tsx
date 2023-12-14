import React from 'react';
import { Card } from 'semantic-ui-react';
import { Category } from '../../app/types/category';


type CategoryItemProps = {
    category: Category;
};

const CategoryItem: React.FC<CategoryItemProps> = ({ category }) => {
    return (
        <Card>
            <Card.Content>
                <Card.Header>{category.name}</Card.Header>
                <Card.Description>
                    <img src={category.imageUrl} alt={category.name} style={{ maxWidth: '100%' }} />
                </Card.Description>
            </Card.Content>
        </Card>
    );
};

export default CategoryItem;
