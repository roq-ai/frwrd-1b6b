import * as yup from 'yup';
import { collaborationValidationSchema } from 'validationSchema/collaborations';
import { feedbackValidationSchema } from 'validationSchema/feedbacks';
import { taskValidationSchema } from 'validationSchema/tasks';

export const ideaValidationSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string(),
  innovator_id: yup.string().nullable().required(),
  collaboration: yup.array().of(collaborationValidationSchema),
  feedback: yup.array().of(feedbackValidationSchema),
  task: yup.array().of(taskValidationSchema),
});
