import React from 'react'
import { compose } from 'ramda'
import { Card, Button, Form, Row, Col } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import * as Yup from 'yup'
import { withFormik, FormikProps, Form as FormikForm, Field } from 'formik'
import { graphql, ChildProps } from 'react-apollo'

import { CustomCard } from '../../components/CustomCard'
import { CenteredWrapper } from '../../components/CenteredWrapper'
import { renderField } from './utils'
import { history } from '../../history'
import * as mutations from '../../apollo/mutations'

interface OwnProps {
  login?: (variables: mutations.LoginVariables) => Promise<mutations.LoginResponse>
  auth?: (variables: mutations.AuthVariables) => {}
}

type Props = OwnProps & FormikProps<mutations.LoginRequestData>

const LoginFormComponent = ({ isSubmitting, isValid }: Props) => (
  <CenteredWrapper>
    <CustomCard>
      <Card.Body>
        <NavLink to="">
          <Button variant="outline-primary" className="float-right">
            Register
          </Button>
        </NavLink>
        <Card.Title className="mb-4 mt-1">Login (for errors see console)</Card.Title>
        <hr />
        <FormikForm>
          <Form.Group>
            <Field name="email" render={renderField({ placeholder: 'Email', type: 'text' })} />
          </Form.Group>
          <Form.Group>
            <Field name="password" render={renderField({ placeholder: 'Password (minlength: 8)', type: 'password' })} />
          </Form.Group>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Button variant="primary" block={true} type="submit" disabled={!isValid && isSubmitting}>
                  Login
                </Button>
              </Form.Group>
            </Col>
            <Col md={6} className="text-right">
              <NavLink to="" className="small">
                Forgot password?
              </NavLink>
            </Col>
          </Row>
        </FormikForm>
      </Card.Body>
    </CustomCard>
  </CenteredWrapper>
)

export const LoginForm = compose(
  graphql<OwnProps, mutations.LoginResponse>(mutations.LOGIN_MUTATION, { name: 'login' }),
  graphql<OwnProps, {}>(mutations.AUTH_MUTATION, { name: 'auth' }),
  withFormik<ChildProps<OwnProps>, mutations.LoginRequestData>({
    mapPropsToValues: () => ({
      email: '',
      password: ''
    }),
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .min(8)
        .matches(/^\S+$/)
        .required()
    }),
    handleSubmit: (payload: mutations.LoginRequestData, { props, setSubmitting, setErrors }) => {
      const { email, password } = payload

      props.login &&
        props
          .login({ variables: { email, password } })
          .then((response: mutations.LoginResponse) => {
            window.localStorage.setItem('accessToken', response.data.login.accessToken)
            props.auth && props.auth({ variables: { status: true } })
            history.push('/')
          })
          .catch((error: Error) => {
            console.log(error)
            setSubmitting(false)
            setErrors({ email: 'email errored', password: 'password errored' })
          })
    }
  })
)(LoginFormComponent)
