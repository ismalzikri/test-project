import { extend } from 'vee-validate'
import { regex, required, alpha, email, integer } from 'vee-validate/dist/rules'

extend('regex', regex)

extend('required', {
  ...required,
  message: 'This field is required'
})

extend('alpha', {
  ...alpha,
  message: 'This field must only contain alphabetic characters'
})

extend('email', {
  ...email,
  message: 'Please enter a valid email address'
})

extend('integer', {
  ...integer,
  message: 'Please enter valid number'
})