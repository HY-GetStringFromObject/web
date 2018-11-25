import React, {Component} from 'react'
import {Form, reduxForm, Field, submit} from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import Dialog from '@material-ui/core/Dialog/Dialog'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import { postSegment, getPolyline } from '../../redux/actions'

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    label={label}
    {...input}
    {...custom}
  />
)

class SegmentForm extends Component {
  constructor (props) {
    super(props)

    this._submit = this._submit.bind(this)
  }

  async _submit ({name}) {
    const segment = await this.props.postSegment(name)
    await this.props.getPolyline(segment)
    this.props.onClose()
  }

  render () {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onClose}
        fullWidth
      >
        <DialogTitle>
          Create Segment
        </DialogTitle>
        <DialogContent>
          <Form
            onSubmit={this.props.handleSubmit(this._submit)}
          >
            <Field
              name='name'
              component={renderTextField}
              label='Name'
              fullWidth
            />
          </Form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.submitForm}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

const SegmentFormForm = reduxForm({
  form: 'SegmentForm',
  destroyOnUnmount: true
})(SegmentForm)

function mapStateToProps () {
  return {}
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    submitForm: () => submit('SegmentForm'),
    postSegment,
    getPolyline
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SegmentFormForm)
