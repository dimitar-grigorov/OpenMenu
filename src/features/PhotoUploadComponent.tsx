import React, { useState, useEffect } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../app/config/firebase';
import { createId } from '@paralleldrive/cuid2';

registerPlugin(FilePondPluginImagePreview);

interface PhotoUploadComponentProps {
    initialImagePath?: string;
    onUploadStatusChange: (status: boolean) => void;
    onUploadComplete: (url: string, id: string) => void;
}

const PhotoUploadComponent: React.FC<PhotoUploadComponentProps> = ({ initialImagePath, onUploadStatusChange, onUploadComplete }) => {
    const [files, setFiles] = useState<any[]>([]); // Using any for FilePond file type
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        if (initialImagePath) {
            setFiles([{ source: initialImagePath, options: { type: 'local' } }]);
        }
    }, [initialImagePath]);

    return (
        <FilePond
            files={files}
            onupdatefiles={setFiles}
            allowMultiple={false}
            maxFiles={1}
            server={{
                process: (_fieldName, file, _metadata, load, error, progress) => {
                    setIsUploading(true);
                    onUploadStatusChange(true);

                    const uniqueId = createId();
                    const storageRef = ref(storage, `category_images/${uniqueId}`);
                    const uploadTask = uploadBytesResumable(storageRef, file);

                    uploadTask.on(
                        'state_changed',
                        snapshot => {
                            progress(snapshot.totalBytes === 0, snapshot.bytesTransferred, snapshot.totalBytes);
                        },
                        err => {
                            error(err.message);
                            setIsUploading(false);
                            onUploadStatusChange(false);
                        },
                        async () => {
                            const url = await getDownloadURL(uploadTask.snapshot.ref);
                            setIsUploading(false);
                            onUploadStatusChange(false);
                            onUploadComplete(url, uniqueId);
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

export default PhotoUploadComponent;
