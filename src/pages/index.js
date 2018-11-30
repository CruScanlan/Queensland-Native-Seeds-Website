/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'gatsby';
import Layout from '../components/layout';

const styles = theme => ({
    root: {
        textAlign: 'center',
        paddingTop: theme.spacing.unit * 20,
        marginBottom: '1000px'
    },
});

class Index extends React.Component {
  state = {
    open: false,
  };

  render() {
    const { classes } = this.props;

    return (
      <Layout>
          <div className={classes.root}>
              Test
          </div>
      </Layout>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Index);
