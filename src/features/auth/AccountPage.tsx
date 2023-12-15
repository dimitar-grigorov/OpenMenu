import { FieldValues, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom';
import { Button, Form, Header, Icon, Label, Segment } from 'semantic-ui-react';
import { useAppSelector } from '../../app/store/store';
import { auth } from '../../app/config/firebase';
import { updatePassword } from 'firebase/auth';
import { toast } from 'react-toastify';

export default function AccountPage() {
    const { currentUser } = useAppSelector(state => state.auth);

    const { register, handleSubmit, reset, getValues, setError, formState: { errors, isSubmitting, isValid } } = useForm({
        mode: 'onTouched'
    })

    async function onSubmit(data: FieldValues) {
        try {
            if (auth.currentUser) {
                await updatePassword(auth.currentUser, data.password1);
                toast.success('Password updated successfully');
                reset();
            }
        } catch (error: any) {
            setError('root.serverError', {
                type: '400', message: error.message
            })
        }
    }

    const validatePasswordMatch = (value: string) => {
        const { password1 } = getValues();
        return password1 === value || 'Passwords do not match';
    };

    return (
        <Segment compact style={{ margin: '0 auto', textAlign: 'center' }}>
            <Header dividing size='large' content='Account' />
            {currentUser?.providerId === 'password' &&
                <div>
                    <Header color='teal' sub content='Change password' />
                    <p>Use this form to change your password</p>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Input
                            type='password'
                            placeholder='Password'
                            {...register('password1', { required: 'Password is required' })}
                            error={errors.password1?.message}
                        />

                        <Form.Input
                            type='password'
                            placeholder='Confirm Password'
                            {...register('password2', {
                                required: 'Confirm Password is required',
                                validate: validatePasswordMatch
                            })}
                            error={errors.password2?.message}
                        />
                        {errors.root && (
                            <Label
                                basic color='red'
                                style={{ display: 'block', marginBottom: 10 }}
                                content={errors.root.serverError.message}
                            />
                        )}
                        <Button
                            loading={isSubmitting}
                            type='submit'
                            disabled={!isValid || isSubmitting}
                            size='large'
                            positive
                            content='Update password'
                        />
                    </Form>
                </div>}
            {currentUser?.providerId === 'github.com' &&
                <div>
                    <Header color='teal' sub content='GitHub account' />
                    <p>Please visit GitHub to update your account settings</p>
                    <Button as={Link} to='https://github.com' color='black'>
                        <Icon name='github' /> Go to GitHub
                    </Button>
                </div>}
            {currentUser?.providerId === 'google.com' &&
                <div>
                    <Header color='teal' sub content='Google account' />
                    <p>Please visit Google to update your account settings</p>
                    <Button as={Link} to='https://google.com' color='google plus'>
                        <Icon name='google' /> Go to Google
                    </Button>
                </div>}
        </Segment>
    )
}