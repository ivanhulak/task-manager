import { Formik, Field, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import './boards.scss';


export const EditBoardForm = ({ board, editBoardCallback, setEditBoardMode, setCurrentBoard }) => {
   const { t } = useTranslation(['form']);

   const EditBoardSchema = Yup.object().shape({
      board: Yup.string()
         .typeError(`${t("validation.string")}`)
         .min(2, `${t("validation.short")}`)
         .max(40, `${t("validation.long")}`)
   });
   
   const submit = (values, { setSubmitting }) => {
      const formData = {
         title: values.board,
         colorLabel: values.colorLabel,
      }
      editBoardCallback(board.id, formData)
      setEditBoardMode(false)
      setCurrentBoard(null)
      setSubmitting(false);
   }

   return (
      <Formik
         initialValues={{ board: board.title, colorLabel: board.colorLabel }}
         validationSchema={EditBoardSchema}
         onSubmit={submit}
      >
         {({ errors, isSubmitting, handleSubmit, handleChange }) => (
            <Form onSubmit={handleSubmit} className='board-inner__edit'>
               <div className='board-inner__edit-inputDiv'>
                  <Field
                     autoFocus={true}
                     type='text'
                     name='board'
                     onChange={handleChange}
                     className={errors.board ? 'board-inner__edit-input input-error' : 'board-inner__edit-input'}
                  />
                  {errors.board && <p className='board-inner__error-message'>{errors.board}</p>}
               </div>
               <div className='board-inner__edit-color'>
                  <Field as="select" name="colorLabel" className='board-inner__edit-select'>
                     <option value="#FFE600" className='color-select__option'>{t("colors.yellow")}</option>
                     <option value="#FF00E5" className='color-select__option'>{t("colors.pink")}</option>
                     <option value="#02D74A" className='color-select__option'>{t("colors.green")}</option>
                     <option value="#FF0000" className='color-select__option'>{t("colors.red")}</option>
                     <option value="#FF6B00" className='color-select__option'>{t("colors.orange")}</option>
                     <option value="#21AFFF" className='color-select__option'>{t("colors.blue")}</option>
                  </Field>
               </div>
               <div className='board-inner__edit-buttons'>
                  <button
                     className='board-inner__edit-button'
                     type="submit"
                     disabled={isSubmitting}
                  >{t("save")}</button>
                  <button className='board-inner__edit-button' onClick={() => {
                     setEditBoardMode(false)
                     setCurrentBoard(null)
                  }}>{t("discard")}</button>
               </div>
            </Form>
         )}
      </Formik>
   );
}