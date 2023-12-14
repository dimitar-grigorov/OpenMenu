import LoginForm from '../../../features/auth/LoginForm';
import RegisterForm from '../../../features/auth/RegisterForm';
import CategoryForm from '../../../features/categories/CategoryForm';
import TestModal from '../../../features/lab/TestModal';
import { useAppSelector } from '../../store/store'

export default function ModalManager() {
    const modalLookup = {
        TestModal,
        CategoryForm,
        LoginForm,
        RegisterForm
    }

    const { type, data, open } = useAppSelector(state => state.modals);

    let renderedModal;

    if (open && type) {
        const ModalComponent = (modalLookup as any)[type];
        renderedModal = <ModalComponent data={data} />
    }


    return (
        <span>{renderedModal}</span>
    )
}