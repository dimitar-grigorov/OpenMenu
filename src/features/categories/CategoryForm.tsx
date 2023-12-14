import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Header, Segment } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useFireStore } from '../../app/hooks/firestore/useFirestore';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { Category } from '../../app/types/category';
import { useAppSelector } from '../../app/store/store';
import { useEffect } from 'react';
import { actions } from './categorySlice';

export default function CategoryForm() {
    const { loadDocument, create, update } = useFireStore('categories');
    const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm<Category>({
        mode: 'onTouched'
    });
    const { id } = useParams<{ id: string }>();
    const category = useAppSelector(state => state.categories.data.find(c => c.id === id));
    const { status } = useAppSelector(state => state.categories);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) loadDocument(id, actions);
    }, [id, loadDocument]);

    async function onSubmit(data: Category) {
        try {
            if (category) {
                await update(category.id, data);
            } else {
                await create(data);
            }
            navigate('/categories');
        } catch (error: any) {
            toast.error(error.message);
        }
    }

    if (status === 'loading') return <LoadingComponent />

    return (
        <Segment clearing>
            <Header content='Category details' sub color='teal' />
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Input
                    placeholder='Category name'
                    defaultValue={category?.name || ''}
                    {...register('name', { required: true })}
                    error={errors.name && 'Name is required'}
                />
                <Form.Input
                    placeholder='Image URL'
                    defaultValue={category?.imageUrl || ''}
                    {...register('imageUrl', { required: 'Image URL is required' })}
                    error={errors.imageUrl && errors.imageUrl.message}
                />

                <Button
                    loading={isSubmitting}
                    disabled={!isValid}
                    type='submit' floated='right' positive content='Submit' />
                <Button as={Link} to='/categories' type='button' floated='right' content='Cancel' />
            </Form>
        </Segment>
    )
}
