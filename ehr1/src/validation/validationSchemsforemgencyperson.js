import * as Yup from 'yup';
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const validationSchema = Yup.object().shape({

    name: Yup.string()
        .required('Name is required'),
    userid: Yup.string()
        .required('Userid is required'),

    email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),



    phNo: Yup.string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .required('Mobile Number is required'),



});

export const validationSchema1 = Yup.object().shape({




    phNo: Yup.string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .required('Mobile Number is required'),
    adharNo: Yup.string()
        .min(12, 'AdharNo number is 12 Digit')
        .max(12, 'AdharNo number is 12 Digit')
        .matches(/^[0-9]+$/, "Must be only digits")
        .required('AdharNo Number is required'),


});