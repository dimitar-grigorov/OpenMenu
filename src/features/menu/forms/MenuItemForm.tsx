import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Header, Segment, Checkbox, Dropdown } from 'semantic-ui-react';
import { Controller, useForm } from 'react-hook-form';
import { MenuItem, Additive } from '../../../app/types/menuItem';
import { useFireStore } from '../../../app/hooks/firestore/useFirestore';
import { useEffect } from 'react';
import { useAppSelector } from '../../../app/store/store';
import { toast } from 'react-toastify';
import { actions } from '../../menuItemSlice';

export default function MenuItemForm() {
    const { loadDocument, create, update } = useFireStore('menuItems');
    const { register, handleSubmit, control, setValue, formState: { errors, isValid, isSubmitting } } = useForm<MenuItem>({
        mode: 'onTouched',
    });
    const { id } = useParams();
    const menuItem = useAppSelector(state => state.menuItems.data.find(m => m.id === id));
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;
        loadDocument(id, actions)
    }, [id, loadDocument])

    async function updateMenuItem(data: MenuItem) {
        if (!menuItem) return;
        await update(data.id, data);
    }

    async function createMenuItem(data: MenuItem) {
        const ref = await create(data);
        return ref;
    }

    async function onSubmit(data: MenuItem) {
        try {
            if (menuItem) {
                await updateMenuItem({ ...menuItem, ...data });
                //navigate(`/menu/${menuItem.id}`);
            } else {
                const ref = await createMenuItem(data);
                //navigate(`/menu/${ref?.id}`)
            }
            navigate('/menu');
        } catch (error: any) {
            toast.error(error.message);
            console.log(error.message);
        }
    }

    if (!menuItem && id) return <div>Loading...</div>;

    return (
        <Segment clearing>
            <Header content='Menu Item Details' sub color='teal' />
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Input
                    placeholder='Title'
                    defaultValue={menuItem?.title || ''}
                    {...register('title', { required: true })}
                    error={errors.title && 'Title is required'}
                />
                {/* <Form.Dropdown
                    placeholder='Food Tags'
                    fluid
                    multiple
                    selection
                    options=
                    defaultValue={menuItem?.foodTags || []}
                    {...register('foodTags')}
                />
                <Form.Dropdown
                    placeholder='Food Type'
                    fluid
                    multiple
                    selection
                    options=
                    defaultValue={menuItem?.foodType || []}
                    {...register('foodType')}
                /> */}
                <Checkbox
                    label='Is Available'
                    defaultChecked={menuItem?.isAvailable || false}
                    {...register('isAvailable')}
                />
                <Form.Input
                    placeholder='Rating'
                    type='number'
                    step='0.1'
                    defaultValue={menuItem?.rating || 0}
                    {...register('rating')}
                />
                <Form.Input
                    placeholder='Rating Count'
                    defaultValue={menuItem?.ratingCount || ''}
                    {...register('ratingCount')}
                />
                <Form.TextArea
                    placeholder='Description'
                    defaultValue={menuItem?.description || ''}
                    {...register('description', { required: true })}
                    error={errors.description && 'Description is required'}
                />
                <Form.Input
                    placeholder='Price'
                    type='number'
                    step='0.01'
                    defaultValue={menuItem?.price || 0}
                    {...register('price')}
                />
                {/* Additive fields need special handling */}
                <Form.Input
                    placeholder='Image URL'
                    defaultValue={menuItem?.imageUrl?.join(', ') || ''}
                    {...register('imageUrl')}
                />
                <Form.Input
                    placeholder='Category ID'
                    defaultValue={menuItem?.categorId || ''}
                    {...register('categorId', { required: true })}
                    error={errors.categorId && 'Category ID is required'}
                />
                <Form.Input
                    placeholder='Time To Cook'
                    defaultValue={menuItem?.timeToCook || ''}
                    {...register('timeToCook', { required: true })}
                    error={errors.timeToCook && 'Time to cook is required'}
                />
                <Button
                    loading={isSubmitting}
                    disabled={!isValid}
                    type='submit' floated='right' positive content='Submit' />
                <Button as={Link} to='/menuItems' type='button' floated='right' content='Cancel' />
            </Form>
        </Segment>
    )
}
