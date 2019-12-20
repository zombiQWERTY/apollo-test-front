import React from 'react'
import { Form } from 'react-bootstrap'
import { FieldProps } from 'formik'

export const renderField = (ownProps: {}) => (props: FieldProps) => <Form.Control {...props.field} {...ownProps} />
export const renderFieldCheckbox = (ownProps: {}) => (props: FieldProps) => <Form.Check {...props.field} {...ownProps} />
