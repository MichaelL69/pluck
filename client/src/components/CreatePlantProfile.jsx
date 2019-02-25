import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import API_URL from '../../../config'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
import config from '../../../config';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

const currencies = [
  {
    value: 'Strawberries',
    label: 'Strawberries',
  },
  {
    value: 'Oranges',
    label: 'Oranges',
  },
  {
    value: 'Figs',
    label: 'Figs',
  },
  {
    value: 'Tomatoes',
    label: 'Tomatoes',
  },
  {
    value: 'Squash',
    label: 'Squash',
  },
  {
    value: 'Rosemary',
    label: 'Rosemary',
  },
  {
    value: 'Snap Peas',
    label: 'Snap Peas',
  },
  {
    value: 'Apples',
    label: 'Apples',
  },
  {
    value: 'Basil',
    label: 'Basil',
  },
  {
    value: 'Peaches',
    label: 'Peaches',
  },
];

class PlantProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      description: '',
      image: '',
      loggedIn: false,
      currency: 'Select',
      
      // do we need user id?
      // multiline: "Controlled",
    };
    this.getPlantType = this.getPlantType.bind(this);
    this.fileSelectHandler = this.fileSelectHandler.bind(this);
    this.submitPlant = this.submitPlant.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this)
    this.setState = this.setState.bind(this)
    // this.fileUploadHandler = this.fileUploadHandler.bind(this);
  }

  componentDidMount() {
    this.setState({type: this.state.currency})
  }

  // function that sets state via onchange
  // allows us to grab the plant type and description
  onChange(event) {
    // find which field is being used
    if (event.target.id === 'type') {
      // set corresponding state to the value entered into that field
      // console.log(this.props.parentState.loggedIn);
      this.setState({
        type: event.target.value,
      });
    } else if (event.target.id === 'description') {
      this.setState({
        description: event.target.value,
      });
    }
  }

  getPlantType() {   
    axios.get(`/plant/category?category=${this.state.currency}`)
      .then((res) => {
        console.log(res);
        const plantImage = res.data[0];
        this.setState({ image: plantImage });
      });
  }

  handleChange(name) { 

    return (event) => {
      this.setState({
        [name]: event.target.value,
      });
    };
  }


  ////////////////// THESE FUNCTIONS ARE USED TO ENABLE USER IMAGE UPLOAD ////////////////
  ///// which does not currently work /////////////

  // function allows users to upload image
  fileSelectHandler(event) {
    // console.log(btoa(event.target.files[0]));
    const currentImage = event.target.files[0];

    this.setState({
      image: currentImage,
    });
  }

  // function upload image to our server
  // fileUploadHandler() {
  //   const fd = new FormData();
  //   fd.append('image', this.state.image, this.state.image.name);

  //   const fr = new FileReader();
  //   const file = this.state.image;
  //   // fr.readAsBinaryString(file);
  //   // fr.readAsDataURL(file); //base64

  //   const params = {
  //     image: fr.readAsBinaryString(file), // this needs to be binary, base64 data, or a url
  //     // type: 'application/file',
  //     headers: {
  //       Authorization: `Client-ID ${config.clientId} Bearer ${config.imgurKey}`, // this is correct
  //     },
  //   };

  //   // post request to imgur
  //   // goal: upload a user image and get back a url
  //   axios.post('https://api.imgur.com/3/image', params)
  //     .then((res) => {
  //       console.log(res.data.link);

  //       // set state to image url
  //       this.setState({
  //         image: res.data.link,
  //       });
  //     })
  //     .catch((err) => { console.log(err); });
  // }

  ////////////////////////////////////////////////////////////////////////////


  // function when submit button is pressed
  submitPlant() {

    const { type, description, image } = this.state;
    // this.getPlantType()
    // change state to redirect to myProfile
    
    this.setState({
      redirect: true,
    });

    // get current user info

    // send post req to server to save new plant info in plants table
    // save plant info to database
    // add plant to users profile page
    // need to send through userId, type, description, address, zipcode, image
    axios.post('/plant/profile', { type, description, image })
      .then((res) => { console.log(res); })
      .catch((err) => { console.log(err); });
  }

  render() {
    const { classes } = this.props;
    const { redirect } = this.state;
  
    // if (this.state.loggedIn === false) {
    //   return <Redirect to="/userLogin" />;
    // }

    
    if (redirect === true) {
      return <Redirect to={{ pathname: '/myProfile', state: { parentState: this.state } }} />; // trying to hand down props through redirect
    }


    return (
      <div className="zip-body">
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="outlined-select-currency"
            select
            label="Select"
            className={classes.textField}
            value={this.state.currency}
            onChange={this.handleChange('currency')} 
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            helperText="Please select your Plant Type"
            margin="normal"
            variant="outlined"
          >
            {currencies.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </form>
        <form className={classes.container} noValidate autoComplete="off">

          <TextField
            id="description"
            label="description"
            multiline
            rows="4"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            onChange={this.onChange}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
          >
          </TextField>
        </form>
        {/* <div>
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
            // onChange={this.fileSelectHandler}
          />
          <label htmlFor="contained-button-file">
            <Button
              variant="contained"
              component="span"
              type="file"
              className={classes.button}
            >
                    Upload Plant Image
            </Button>
          </label>
        </div> */}
        <Button
          variant="contained"
          className={classes.button}
          onClick={this.submitPlant}
          // onClick={this.fileUploadHandler}
        >
                Submit
        </Button>
      </div>
    );
  }
}

// PlantProfile.propTypes = {
//     classes: PropTypes.object.isRequired
// };

export default withStyles(styles)(PlantProfile);
