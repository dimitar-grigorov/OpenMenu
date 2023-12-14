import React from 'react';
import { Button, Grid, Header, Segment } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import CategoryItem from './CategoryItem';
import { Category } from '../../app/types/category';

const CategoriesList: React.FC = () => {
    const categories: Category[] = []; // Replace with your categories data
    const navigate = useNavigate();

    // Function to navigate to the category creation form
    const handleCreateNewCategory = () => {
        navigate('/path-to-create-category-form'); // Update with your actual path
    };

    return (
        <Segment>
            <Button
                primary
                onClick={handleCreateNewCategory}
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
                        <Grid.Column key={category.id}>
                            <CategoryItem category={category} />
                        </Grid.Column>
                    ))
                )}
            </Grid>
        </Segment>
    );
};

export default CategoriesList;
