import { useState, useEffect } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../app/config/firebase';
import { createId } from '@paralleldrive/cuid2';

registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType);

type PhotoUploadComponentProps = {
    initialImagePath?: string;
    onUploadStatusChange: (status: boolean) => void;
    onUploadComplete: (url: string) => void;
    isFormSubmitting: boolean;
    storagePath: string;
}

export default function PhotoUploadComponent({ initialImagePath, onUploadStatusChange,
    onUploadComplete, isFormSubmitting, storagePath
}: PhotoUploadComponentProps) {
    const [files, setFiles] = useState<any[]>([]);
    const [uploadedImageId, setUploadedImageId] = useState<string>('');

    useEffect(() => {
        if (initialImagePath) {
            setFiles([{ source: initialImagePath, options: { type: 'local' } }]);
        }
    }, [initialImagePath]);

    useEffect(() => {
        return () => {
            if (!isFormSubmitting && uploadedImageId && !initialImagePath) {
                const storageRef = ref(storage, `${storagePath}/${uploadedImageId}`);
                deleteObject(storageRef).catch(console.error);
            }
        };
    }, [isFormSubmitting, uploadedImageId, initialImagePath]);

    return (
        <FilePond
            files={files}
            onupdatefiles={setFiles}
            allowMultiple={false}
            maxFiles={1}
            acceptedFileTypes={['image/*']}
            server={{
                process: (_fieldName, file, _metadata, load, error, progress) => {
                    onUploadStatusChange(true);

                    const uniqueId = createId();
                    setUploadedImageId(uniqueId); // Set the uploaded image ID
                    const storageRef = ref(storage, `${storagePath}/${uniqueId}`);
                    const uploadTask = uploadBytesResumable(storageRef, file)

                    uploadTask.on(
                        'state_changed',
                        snapshot => {
                            progress(snapshot.totalBytes === 0, snapshot.bytesTransferred, snapshot.totalBytes);
                        },
                        err => {
                            error(err.message);
                            onUploadStatusChange(false);
                        },
                        async () => {
                            const url = await getDownloadURL(uploadTask.snapshot.ref);
                            onUploadStatusChange(false);
                            onUploadComplete(url);
                            load(url);
                        }
                    );
                }
            }}
            name="files"
            labelIdle='Drag & Drop your image or <span class="filepond--label-action">Browse</span>'

        />
    );
};
