import TextField from 'material-ui/TextField'
import createComponent from 'redux-form-material-ui/lib/createComponent'
import mapError from 'redux-form-material-ui/lib/mapError'

// https://github.com/erikras/redux-form-material-ui/issues/12
export default createComponent(
  TextField,
  ({
    input: { onChange, ...inputProps },
    active, context, asyncValidating, dirty, invalid, pristine, valid, visited,
    ...props
  }) => ({
    ...mapError(props),
    ...inputProps,
    onChange: (event, index, value) => onChange(value)
  }))

