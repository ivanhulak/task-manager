import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import './create-form.scss';
import { TrashIcon } from '../common/Icons/TrashIcon';
import { useTranslation } from 'react-i18next';

export const CreateTaskForm = ({ currentLabel, createMode, createModeCallback, updateBoardsCallBack, currentBoardId, taskRequired }) => {
   const { t } = useTranslation(['form']);
   const conditionalValidation = taskRequired
      ? {
         task: Yup.string()
            .required(`${t("validation.required")}`)
            .typeError(`${t("validation.string")}`)
            .min(2, `${t("validation.short")}`)
            .max(250, `${t("validation.long")}`)
      }
      : {
         task: Yup.string()
            .typeError(`${t("validation.string")}`)
            .min(2, `${t("validation.short")}`)
            .max(250, `${t("validation.long")}`),
         board: Yup.string()
            .required(`${t("validation.required")}`)
            .typeError(`${t("validation.string")}`)
            .min(2, `${t("validation.short")}`)
            .max(250, `${t("validation.long")}`)
      }

   const CreateTaskSchema = Yup.object().shape({
      ...conditionalValidation,
   });

   const submit = (values, { setSubmitting, resetForm }) => {
      const formData = {
         id: currentBoardId ? currentBoardId : uuidv4(),
         title: values.board,
         colorLabel: !!currentLabel ? currentLabel : values.colorLabel,
         items: values.task ? [{ id: uuidv4(), task: values.task, status: 'uncompleted' }] : []
      }
      updateBoardsCallBack(formData)
      resetForm('')
      createModeCallback(false)
      setSubmitting(false);
   }
   return (
      <div className={createMode ? 'create-block' : 'create-block disable'}>
         <Formik
            initialValues={{ board: '', task: '', colorLabel: 'yellow' }}
            validationSchema={CreateTaskSchema}
            onSubmit={submit}
         >
            {({ touched, errors, isSubmitting, handleSubmit, resetForm, handleChange }) => (
               <Form onSubmit={handleSubmit} className='create-block__form form-block'>
                  {taskRequired || <div className="form-block__board">
                     <p className="form-block__label">{t("create_board")}</p>
                     <Field
                        type="text"
                        name='board'
                        onChange={handleChange}
                        placeholder={t("board_placeholder")}
                        className={errors.board ? 'form-block__input input-error' : 'form-block__input'} />
                     {touched.board && errors.board && <p className='error-message'>{errors.board}</p>}
                  </div>}
                  <div className="form-block__task">
                     <p className="form-block__label">{t("create_task")}</p>
                     <Field
                        type="text"
                        name='task'
                        onChange={handleChange}
                        placeholder={t("task_placeholder")}
                        className={errors.task ? 'form-block__input input-error' : 'form-block__input'} />
                     {touched.task && errors.task && <p className='error-message'>{errors.task}</p>}
                  </div>
                  {taskRequired || <div className='form-block__select'>
                     <p className="form-block__label">{t("create_color")}</p>
                     <Field as="select" name="colorLabel" className='select__color color-select form-block__input'>
                        <option value="#FF00E5" className='color-select__option'>{t("colors.pink")}</option>
                        <option value="#FFE600" className='color-select__option'>{t("colors.yellow")}</option>
                        <option value="#02D74A" className='color-select__option'>{t("colors.green")}</option>
                        <option value="#FF0000" className='color-select__option'>{t("colors.red")}</option>
                        <option value="#FF6B00" className='color-select__option'>{t("colors.orange")}</option>
                        <option value="#21AFFF" className='color-select__option'>{t("colors.blue")}</option>
                     </Field>
                  </div>}
                  <div className="form-block__buttons">
                     <button className='button-form button-form__create' type="submit" disabled={isSubmitting}>
                        <span>{t("create")}</span>
                        <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M11.6237 23.6559H4.0968V21.5054C4.0968 18.9044 5.94386 16.7347 8.39788 16.2366M15.9248 23.656H23.4516V21.5055C23.4516 18.9044 21.6046 16.7348 19.1506 16.2367M10.4294 23.0697L10.5188 23.2412C10.6524 23.4976 10.9021 23.6559 11.1726 23.6559H16.3759C16.6464 23.6559 16.896 23.4976 17.0296 23.2412L17.119 23.0697C20.6575 16.2814 19.4869 7.73683 14.2834 2.37144C13.9977 2.07691 13.5507 2.07691 13.2651 2.37144C8.06154 7.73683 6.89094 16.2814 10.4294 23.0697ZM15.9248 12.9032C15.9248 14.0909 14.9619 15.0538 13.7742 15.0538C12.5865 15.0538 11.6237 14.0909 11.6237 12.9032C11.6237 11.7155 12.5865 10.7527 13.7742 10.7527C14.9619 10.7527 15.9248 11.7155 15.9248 12.9032Z" stroke="#F2F2F2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                     </button>
                     <button className='button-form button-form__clear' type="reset" onClick={() => resetForm()}>
                        <span>{t("clear")}</span>
                        <TrashIcon />
                     </button>
                  </div>
               </Form>
            )}
         </Formik>
      </div>
   );
};