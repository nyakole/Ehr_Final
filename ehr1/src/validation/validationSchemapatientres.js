import * as Yup from 'yup';
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const validationSchema = Yup.object().shape({
    address: Yup.string()
        .required('Address is required'),
    name: Yup.string()
        .required('Name is required'),
    userid: Yup.string()
        .required('Userid is required'),
    dob: Yup.string()
        .required('Date of Birth is required'),
    email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
    password: Yup.string()

        //.min(8, 'Password must be at least 8 characters')
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Password must be at least 8 characters, One Uppercase, One Lowercase, One Number and one special case Character")
        .required('Password is required'),

    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    acceptTerms: Yup.bool()
        .oneOf([true], 'Accept Ts & Cs is required'),



    phNo: Yup.string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .required('Mobile Number is required'),
    adharNo: Yup.string()
        .min(12, 'AdharNo number is 12 Digit')
        .max(12, 'AdharNo number is 12 Digit')
        .matches(/^[0-9]+$/, "Must be only digits")
        .required('AdharNo Number is required'),
    age: Yup.string()
        .min(1, 'Age  is not valid')
        .max(2, 'Age  is not valid')
        .matches(/^[0-9]+$/, "Must be only digits")
        .required('Age is required')
    

});
