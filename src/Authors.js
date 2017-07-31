import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Authors extends Component {
  static PropTypes = {

  }

  state = {
    authors: {}
  }

  componentDidMount() {
    this.setState({authors: this.props.authors})
  }

	render () {
    const { authors } = this.state

		return (
      <ol>
      </ol>
		)
	}
}

export default Authors