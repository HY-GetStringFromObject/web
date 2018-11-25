import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'

const styles = {
  card: {
    width: '100%',
    height: '100%'
  }
}

function resetRoute (props) {
  const { classes } = props
  return (
    <Card className={classes.card}>
      <CardContent>
        Reset Route?
      </CardContent>
      <CardActions>
        <Button variant='contained' className={classes.button} onClick={props.onReset}>
          Yes
        </Button>
      </CardActions>
    </Card>
  )
}

resetRoute.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(resetRoute)
