import { Button, Form } from 'semantic-ui-react';
import ModalWrapper from '../../app/common/modals/ModalWrapper';
import { useAppDispatch, useAppSelector } from '../../app/store/store';
import { closeModal } from '../../app/common/modals/modalSlice';
import { useForm } from 'react-hook-form';
import { useFireStore } from '../../app/hooks/firestore/useFirestore';
import { deleteObject, ref } from 'firebase/storage';
import { storage } from '../../app/config/firebase';

export default function CategoryDeleteForm() {
    const dispatch = useAppDispatch();
    const { remove } = useFireStore('categories');
    const id = useAppSelector(state => state.modals.data?.id);
    const category = useAppSelector(state => state.categories.data.find(x => x.id === id));
    const { handleSubmit, formState: { isSubmitting } } = useForm();

    const deleteImage = async (imageUrl: string) => {
        const imageRef = ref(storage, imageUrl);
        try {
            await deleteObject(imageRef);
        } catch (error: any) {
            if (error.code !== 'storage/object-not-found') {
                throw error;
            }
        }
    };

    const handleDelete = async () => {
        try {
            if (category?.imageUrl) {
                await deleteImage(category.imageUrl);
            }
            await remove(id);
            dispatch(closeModal());
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };


    return (
        <ModalWrapper header='Confirm Deletion' size='tiny'>
            <Form onSubmit={handleSubmit(handleDelete)} style={{ textAlign: 'center' }}>
                <div style={{ margin: '1rem 0' }}>
                    <p>Are you sure you want to delete the category "{category?.name}"?</p>
                </div>
                <div>
                    <Button
                        type='submit'
                        color='red'
                        content='Delete'
                        loading={isSubmitting}
                    />
                    <Button
                        onClick={() => dispatch(closeModal())}
                        content='Cancel'
                        style={{ marginLeft: '10px' }}
                    />
                </div>
            </Form>
        </ModalWrapper>
    )
}
