import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardHeader from '@material-ui/core/es/CardHeader/CardHeader'
import Button from '@material-ui/core/Button'
import strings from '../assets/strings'

const styles = {
  card: {
    width: '100%',
    height: '100%'
  }
}

function AddNodeForm (props) {
  const { classes } = props
  return (
    <Card className={classes.card}>
      <CardHeader title={strings.addNewNode} />
      <CardActions>
        <Button variant='contained' className={classes.button} onClick={props.onAdd}>{strings.add}</Button>
      </CardActions>
    </Card>
  )
}

AddNodeForm.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AddNodeForm)
