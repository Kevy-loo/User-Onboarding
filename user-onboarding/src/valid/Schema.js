import * as yup from 'yup';


const formSchema = yup.object().shape({
    first_name: yup
    .string()
    .trim()
    .required('First name is required')
    .min(3, 'First name has to be three characters'),
    last_name: yup
    .string()
    .trim()
    .required('Last name is required')
    .min(3, 'Last name has to be three characters'),
    email: yup
    .string()
    .email('Gotta be a valid email address')
    .required('You forgot to enter an email address'),
    password: yup
    .string()
    .trim()
    .required('Password is required')
    .min(3, 'Username has to be three characters'),
    tos: yup
    .boolean()
    .oneOf([true], 'tos is required'),
 


})


export default formSchema;