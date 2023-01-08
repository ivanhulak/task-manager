import { Formik, Field, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import './edit-forms.scss';


export const EditTaskForm = ({ boardId, item, editTaskCallback, setEditTaskMode, setCurrentItem }) => {
   const { t } = useTranslation(['form']);

   const EditTaskSchema = Yup.object().shape({
      task: Yup.string()
         .typeError(`${t("validation.string")}`)
         .min(2, `${t("validation.short")}`)
         .max(250, `${t("validation.long")}`)
   });

   const submit = (values, { setSubmitting }) => {
      const formData = {
         task: values.task,
      }
      editTaskCallback(boardId, item.id, formData)
      setEditTaskMode(false)
      setCurrentItem(null)
      setSubmitting(false);
   }

   return (
      <Formik
         initialValues={{ task: item.task, }}
         validationSchema={EditTaskSchema}
         onSubmit={submit}
      >
         {({ errors, isSubmitting, handleSubmit, handleChange }) => (
            <Form onSubmit={handleSubmit} className='task-inner__edit'>
               <Field
                  autoFocus={true}
                  type='text'
                  name='task'
                  onChange={handleChange}
                  className={errors.task ? 'task-inner__edit-input input-error' : 'task-inner__edit-input'}
               />
               {errors.task && <p className='task-inner__error-message'>{errors.task}</p>}
               <div className='task-inner__edit-buttons'>
                  <button 
                     className='task-inner__edit-button'
                     type="submit"
                     disabled={isSubmitting}
                  >{t("save")}</button>
                  <button className='task-inner__edit-button' onClick={() => {
                     setEditTaskMode(false)
                     setCurrentItem(null)
                  }}>{t("discard")}</button>
               </div>
            </Form>
         )}
      </Formik>
   );
}