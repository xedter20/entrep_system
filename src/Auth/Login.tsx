import React, { useEffect, useState } from 'react';
import {
  mdiAccount,
  mdiBallotOutline,
  mdiGithub,
  mdiMail,
  mdiUpload,
  mdiAccountPlusOutline,
  mdiPhone,
  mdiLock
} from '@mdi/js';
import { Field, Form, Formik, FormikErrors, ErrorMessage } from 'formik';
import { ReactElement } from 'react';
import Button from '../components/Button';
import Buttons from '../components/Buttons';
import Divider from '../components/Divider';
import CardBox from '../components/CardBox';
import FormCheckRadio from '../components/Form/CheckRadio';
import FormCheckRadioGroup from '../components/Form/CheckRadioGroup';
import FormField from '../components/Form/Field';
import FormFilePicker from '../components/Form/FilePicker';

import SectionMain from '../components/Section/Main';
import SectionTitle from '../components/Section/Title';
import SectionTitleLineWithButton from '../components/Section/TitleLineWithButton';

import { useNavigate } from 'react-router-dom';
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth } from '../Helpers/Firebase';

import { object, string, ref, number } from 'yup';
const RegisterValidation = object().shape({
  email: string().required('Required field').email('Valid email required'),
  password: string()
    .min(8, 'Minimun of 8 character(s)')
    .required('Required field'),
  confirmPassword: string()
});

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(false);
  const [password, setPassword] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUserEmail(user.email || '');
      } else {
        setUserEmail('');
      }
    });
    return unsubscribe;
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    setLoader(true);
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Invalid email');
      setLoader(false);
      return;
    }
    if (!validatePassword(password)) {
      setError(
        'Password must be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 digit, and 1 special character'
      );
      setLoader(false);
      return;
    }
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const token = await user.getIdToken();
      localStorage.setItem('token', token);
      navigate('/dashboard');
      setLoader(false);
    } catch (err: any) {
      CommonError(error);
    }
  };

  const handleGoogleLogin = async () => {
    setLoader(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      localStorage.setItem('token', token);
      navigate('/dashboard');
      setLoader(false);
    } catch (error: any) {
      CommonError(error);
    }
  };

  const CommonError = (err: any) => {
    setError(err.message);
    setLoader(false);
  };

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
    return re.test(password);
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow-2xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              {error && <span className="mt-10 text-red-600">{error}</span>}
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Login
              </h1>
              <Formik
                initialValues={{
                  email: '',
                  password: ''
                }}
                validationSchema={RegisterValidation}
                onSubmit={values => alert(JSON.stringify(values, null, 2))}>
                {({ validateOnBlur, errors, touched }) => {
                  console.log({ errors });
                  return (
                    <Form>
                      <FormField
                        label="Email"
                        labelFor="email"
                        icons={[mdiPhone, mdiMail]}
                        errors={errors.email}
                        isTouched={touched.email}
                        help={errors.email}
                        // hasError={!!errors.email}
                        // error={errors.email}
                        // help="Help line comes here"
                      >
                        <Field
                          type="email"
                          name="email"
                          placeholder="Email"
                          id="email"
                        />
                      </FormField>

                      <FormField
                        label="Password"
                        icons={[mdiLock, mdiLock]}
                        errors={errors.password}
                        isTouched={touched.password}
                        help={errors.password}
                        // hasError={!!errors.password}
                        // error={errors.password}
                      >
                        <Field
                          label="Password"
                          type="password"
                          name="password"
                          placeholder="Password"
                          // hasError={!!errors.password}
                          // error={errors.password}
                        />
                      </FormField>

                      <Buttons>
                        <Button
                          type="submit"
                          color="info"
                          label="Login"
                          className="w-full"
                        />
                      </Buttons>
                      <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-4">
                        Don’t have an account yet?{' '}
                        <a
                          onClick={() => navigate('/signup')}
                          className="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer">
                          Sign up
                        </a>
                      </p>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
