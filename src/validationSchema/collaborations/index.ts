import * as yup from 'yup';

export const collaborationValidationSchema = yup.object().shape({
  user_id: yup.string().nullable().required(),
  idea_id: yup.string().nullable().required(),
});
