import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createCollaboration } from 'apiSdk/collaborations';
import { Error } from 'components/error';
import { collaborationValidationSchema } from 'validationSchema/collaborations';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { IdeaInterface } from 'interfaces/idea';
import { getUsers } from 'apiSdk/users';
import { getIdeas } from 'apiSdk/ideas';
import { CollaborationInterface } from 'interfaces/collaboration';

function CollaborationCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: CollaborationInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createCollaboration(values);
      resetForm();
      router.push('/collaborations');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<CollaborationInterface>({
    initialValues: {
      user_id: (router.query.user_id as string) ?? null,
      idea_id: (router.query.idea_id as string) ?? null,
    },
    validationSchema: collaborationValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Collaboration
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <AsyncSelect<IdeaInterface>
            formik={formik}
            name={'idea_id'}
            label={'Select Idea'}
            placeholder={'Select Idea'}
            fetcher={getIdeas}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.title}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'collaboration',
  operation: AccessOperationEnum.CREATE,
})(CollaborationCreatePage);
