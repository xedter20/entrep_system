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
import Button from './../Component/Tailwind/Button';
import Buttons from '../Component/Tailwind/Buttons';
import Divider from '../Component/Tailwind/Divider';
import CardBox from '../Component/Tailwind/CardBox';
import FormCheckRadio from '../Component/Tailwind/Form/CheckRadio';
import FormCheckRadioGroup from '../Component/Tailwind/Form/CheckRadioGroup';
import FormField from '../Component/Tailwind/Form/Field';
import FormFilePicker from '../Component/Tailwind/Form/FilePicker';

import SectionMain from '../Component/Tailwind/Section/Main';
import SectionTitle from '../Component/Tailwind/Section/Title';
import SectionTitleLineWithButton from '../Component/Tailwind/Section/TitleLineWithButton';

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
      // CommonError(error);
    }
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
                onSubmit={async values => {
                  const { user } = await signInWithEmailAndPassword(
                    auth,
                    values.email,
                    values.password
                  );
                  const token = await user.getIdToken();

                  localStorage.setItem('token', token);
                  navigate('/dashboard');
                  setLoader(false);
                }}>
                {({ validateOnBlur, errors, touched }) => {
                  console.log({ errors });
                  return (
                    <Form className="space-y-4 md:space-y-6">
                      <FormField
                        label="Email"
                        labelFor="email"
                        icons={[mdiPhone, mdiMail]}
                        errors={errors.email}
                        isTouched={touched.email}
                        help={errors.email}>
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
                        help={errors.password}>
                        <Field
                          label="Password"
                          type="password"
                          name="password"
                          placeholder="Password"
                        />
                      </FormField>
                      <div className="flex items-center justify-between">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="remember"
                              aria-describedby="remember"
                              type="checkbox"
                              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label className="text-gray-500 dark:text-gray-300">
                              Remember me
                            </label>
                          </div>
                        </div>
                        <a
                          href="forgotpassword"
                          className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                          Forgot password?
                        </a>
                      </div>
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
