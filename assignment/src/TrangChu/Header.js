import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import {
  Link as Link2,
  useHistory 
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
    textAlign: 'left',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
   
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const { sections, title } = props;
  
  const goLogin = ()=> {
    
  }


  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Button size="small">Subscribe</Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          {title}
        </Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <Button variant="outlined" size="small"  onClick={props.openLogin}>
         login
        </Button>
        
      </Toolbar>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
        {sections.map((section) => (
          
           
              <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            className={classes.toolbarLink}
          >
             <Link2 to={section.url} style={{ textDecoration: 'none' , color : 'black' }} >
            {section.title}
            </Link2>
          </Link>
        
         
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};