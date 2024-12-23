import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import type NewUserData from "~/core/session/types/new-user-data";

import Button from "~/core/ui/Button";
import TextField from "~/core/ui/TextField";
import Alert from '~/core/ui/Alert';
import If from '~/core/ui/If';

import { createNewUserAction } from '~/app/admin/users/@modal/[uid]/actions.server';

function CreateNewUserForm() {
  const [success, setSuccess] = useState<Boolean>(false);
  const [error, setError] = useState<String | null>(null);
  const [pending, startTransition] = useTransition();

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      organizationName: '',
      organizationAddress: ''
    },
  });

  const errors = formState.errors;

  const firstNameControl = register('firstName', {
    value: '',
    required: true,
  });

  const lastNameControl = register('lastName', {
    value: '',
    required: true,
  });

  const emailControl = register('email', {
    value: '',
    required: true,
  });

  const passwordControl = register('password', {
    value: '',
    required: true,
    minLength: {
      value: 6,
      message: 'Password must be at least 6 characters',
    },
  });

  const organizationNameControl = register('organizationName', {
    value: '',
    required: true,
  });

  const organizationAddressControl = register('organizationAddress', {
    value: '',
    required: true,
  });
  
  const onSubmit = (data: NewUserData) => {
    startTransition(async () => {
      try {
        await createNewUserAction({
          userData: data,
          csrfToken: '',
        });
        setError(null);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 5000);
        reset();
      } catch (err: any) {
        console.log(err.message);
        setError(err.message);
      }
    });
  }

  return (
    <form
      data-cy={'create-new-user-form'}
      className={'flex flex-col space-y-4'}
      onSubmit={handleSubmit(onSubmit)}
    >
      <If condition={success}>
        <Alert type={'success'}>
          <Alert.Heading>
            Create New User Success
          </Alert.Heading>

          <p data-cy={'success-message'}>New User created successfully</p>
        </Alert>
      </If>

      <If condition={error}>
        <Alert type={'error'}>
          <Alert.Heading>
            Create New User Error
          </Alert.Heading>

          <p data-cy={'error-message'}>Email address or Organization name is duplicated</p>
        </Alert>
      </If>

      <TextField>
        <TextField.Label>
          First Name

          <TextField.Input
            {...firstNameControl}
            data-cy={'new-user-first-name'}
            required
          />
        </TextField.Label>
      </TextField>

      <TextField>
        <TextField.Label>
          Last Name

          <TextField.Input
            {...lastNameControl}
            data-cy={'new-user-last-name'}
            required
          />
        </TextField.Label>
      </TextField>

      <TextField>
        <TextField.Label>
          Email

          <TextField.Input
            {...emailControl}
            data-cy={'new-user-email'}
            required
            type={'email'}
          />
        </TextField.Label>
      </TextField>

      <TextField>
        <TextField.Label>
          Password

          <TextField.Input
            {...passwordControl}
            data-cy={'new-user-password'}
            required
            type={'password'}
          />

            <TextField.Error
              data-cy={'password-error'}
              error={errors.password?.message}
            />
        </TextField.Label>
      </TextField>

      <TextField>
        <TextField.Label>
          Organization Name

          <TextField.Input
            {...organizationNameControl}
            data-cy={'new-user-organization-name'}
            required
          />
        </TextField.Label>
      </TextField>

      <TextField>
        <TextField.Label>
          Organization Address

          <TextField.Input
            {...organizationAddressControl}
            data-cy={'new-user-organization-address'}
            required
          />
        </TextField.Label>
      </TextField>

      <div>
          <Button data-cy={'create-button'} className={'w-full md:w-auto'} loading={pending}>
            Save
          </Button>
        </div>
    </form>
  );
}

export default CreateNewUserForm;