
import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({

    email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
    password: Yup.string()
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Password must be at least 8 characters, One Uppercase, One Lowercase, One Number and one special case Character")
        .required('Password is required')



});

