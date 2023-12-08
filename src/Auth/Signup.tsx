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

import { object, string, ref, number } from 'yup';
const RegisterValidation = object().shape({
  firstName: string().required('Required field'),
  lastName: string().required('Required field'),
  email: string().required('Required field').email('Valid email required'),
  password: string()
    .min(8, 'Minimun of 8 character(s)')
    .required('Required field'),
  confirmPassword: string()
    .required('Please confirm your password')
    .oneOf([ref('password')], 'Passwords do not match'),
  mobileNumber: string().required('Required'),
  gender: string().required('Required'),
  role: string().required('Required')
});

const FormsPage = () => {
  return (
    <>
      <div className=" bg-gray-50 dark:bg-slate-800 dark:text-slate-100 ">
        <SectionMain>
          <CardBox className="shadow-2xl border-4 border-t-indigo-500 ">
            <SectionTitleLineWithButton
              // icon={mdiAccountPlusOutline}
              title="Create your account"
              main></SectionTitleLineWithButton>
            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                mobileNumber: '',
                color: '',
                textarea: '',
                password: '',
                confirmPassword: '',
                gender: '',
                role: ''
              }}
              validationSchema={RegisterValidation}
              onSubmit={values => alert(JSON.stringify(values, null, 2))}>
              {({ validateOnBlur, errors, touched }) => {
                console.log({ errors });
                return (
                  <Form>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 ">
                      <FormField
                        label="First name"
                        icons={[mdiAccount, mdiMail]}
                        errors={errors.firstName}
                        isTouched={touched.firstName}
                        help={errors.firstName}>
                        <Field
                          type="text"
                          name="firstName"
                          placeholder="First name"
                        />
                      </FormField>
                      <FormField
                        label="Last name"
                        icons={[mdiAccount, mdiMail]}
                        errors={errors.lastName}
                        isTouched={touched.lastName}
                        help={errors.lastName}>
                        <Field
                          type="text"
                          name="lastName"
                          placeholder="Last name"
                        />
                      </FormField>
                    </div>

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
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
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
                      <FormField
                        label="Password"
                        icons={[mdiLock, mdiLock]}
                        errors={errors.confirmPassword}
                        isTouched={touched.confirmPassword}
                        help={errors.confirmPassword}>
                        <Field
                          type="password"
                          name="confirmPassword"
                          placeholder="Confirm Password"
                          // hasError={!!errors.confirmPassword}
                          // error={errors.confirmPassword}
                        />
                      </FormField>
                    </div>

                    <FormField
                      label="Mobile number"
                      labelFor="phone"
                      icons={[mdiPhone, mdiMail]}
                      errors={errors.mobileNumber}
                      isTouched={touched.mobileNumber}
                      help={errors.mobileNumber}>
                      <Field
                        name="mobileNumber"
                        type="text"
                        placeholder="Mobile Number"
                        id="phone"
                      />
                    </FormField>

                    <FormField label="Gender" labelFor="color">
                      <Field name="gender" id="color" component="select">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </Field>
                    </FormField>
                    <FormField
                      label="Role"
                      isTouched={touched.role}
                      help={errors.role}>
                      <FormCheckRadioGroup>
                        <FormCheckRadio type="radio" label="Admin">
                          <Field type="radio" name="role" value="admin" />
                        </FormCheckRadio>
                        <FormCheckRadio type="radio" label="Member">
                          <Field type="radio" name="role" value="member" />
                        </FormCheckRadio>
                      </FormCheckRadioGroup>
                    </FormField>

                    <Buttons>
                      <Button type="submit" color="info" label="Submit" />
                    </Buttons>
                  </Form>
                );
              }}
            </Formik>
          </CardBox>
        </SectionMain>
      </div>
    </>
  );
};

export default FormsPage;
