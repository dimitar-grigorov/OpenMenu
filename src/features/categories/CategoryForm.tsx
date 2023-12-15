import { Button, Form, } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import ModalWrapper from '../../app/common/modals/ModalWrapper';
import { useFireStore } from '../../app/hooks/firestore/useFirestore';
import { Category } from '../../app/types/category';
import { useAppDispatch, useAppSelector } from '../../app/store/store';
import { closeModal } from '../../app/common/modals/modalSlice';
import PhotoUploadComponent from '../PhotoUploadComponent';
import { useEffect, useState } from 'react';
import { deleteObject, ref } from 'firebase/storage';
import { storage } from '../../app/config/firebase';

export default function CategoryForm() {
    const { create, update } = useFireStore('categories');
    const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm<Category>({
        mode: 'onTouched'
    });
    const dispatch = useAppDispatch();

    const id = useAppSelector(state => state.modals.data?.id);
    const category = useAppSelector(state => state.categories.data.find(x => x.id === id));

    async function onSubmit(data: Category) {
        try {

            if (uploadUrl) {
                data.imageUrl = uploadUrl;
            }

            if (id) {
                await update(id, data);
                toast.success('Category updated successfully');
            } else {
                await create(data);
                toast.success('Category created successfully');
            }
            dispatch(closeModal());
        } catch (error: any) {
            toast.error(error.message);
        }
    }

    const [uploadedImageId, setUploadedImageId] = useState<string>('');
    const [uploadUrl, setUploadUrl] = useState<string>('');
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const handleUploadComplete = (url: string, id: string) => {
        setUploadUrl(url);
        setUploadedImageId(id);
    };

    const handleUploadStatusChange = (status: boolean) => {
        setIsUploading(status);
        console.log('isUploading', status);
    };

    const [originalImageUrl, setOriginalImageUrl] = useState<string>(category?.imageUrl || '');

    useEffect(() => {
        setOriginalImageUrl(category?.imageUrl || '');
    }, [category]);

    const handleCancel = async () => {
        if (uploadUrl && uploadedImageId) {
            // Delete the new uploaded image
            const storageRef = ref(storage, `category_images/${uploadedImageId}`);
            await deleteObject(storageRef);
        }
        dispatch(closeModal());
    };

    return (
        <ModalWrapper header={id ? 'Edit Category' : 'Create Category'} size='mini'>
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
                    disabled={!isValid || isSubmitting || isUploading}
                    type='submit'
                    fluid
                    positive
                    content={id ? 'Update' : 'Create'}
                />
                <Button
                    type='button'
                    fluid
                    content='Cancel'
                    onClick={handleCancel}
                    style={{ marginTop: '10px' }}
                />
            </Form>

            <PhotoUploadComponent
                initialImagePath={category?.imageUrl}
                onUploadStatusChange={handleUploadStatusChange}
                onUploadComplete={handleUploadComplete}
            />
        </ModalWrapper>
    );
}
