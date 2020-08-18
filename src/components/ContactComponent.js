import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import PhoneIcon from '@material-ui/icons/Phone';
import PrintIcon from '@material-ui/icons/Print';
import EmailIcon from '@material-ui/icons/Email';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: '10px 0',
        width: '100%'
      }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function Contact(props) {
    const classes = useStyles();

    const [formState, setFormState] = useState({
        firstname: '',
        lastname: '',
        telnum: 0,
        email: '',
        agree: false,
        contactType: 'Tel.',
        message: ''
    });
    
    const [errors,setErrors] = useState({
        firstname: '',
        lastname: '',
        telnum: '',
        email: ''
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log('Form Value is: ', JSON.stringify(formState));
        props.postFeedback(formState);
        setFormState({
            firstname: '',
            lastname: '',
            telnum: 0,
            email: '',
            agree: false,
            contactType: 'Tel.',
            message: ''
        });
        setErrors({
            firstname: '',
            lastname: '',
            telnum: '',
            email: ''
        });
    }

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        validate(name, value);
        console.log('errors: ', JSON.stringify(errors));
        setFormState({ ...formState, [name]: value });
    };

    function validate (name, value) {

        // console.log('validate: ', name, value);

        switch (name) {
            case 'firstname':
                if (value.length < 3)
                    setErrors({...errors, [name]:'First Name should be >= 3 characters'});
                else if (value.length > 10)
                    setErrors({...errors, [name]:'First Name should be <= 10 characters'});
                else
                    setErrors({...errors, [name]:''});
                return;

            case 'lastname':
                if (value.length < 3)
                    setErrors({...errors, [name]:'Last Name should be >= 3 characters'});
                else if (value.length > 10)
                    setErrors({...errors, [name]:'Last Name should be <= 10 characters'});
                else
                    setErrors({...errors, [name]:''});
                return;

            case 'telnum':
                const reg = /^\d+$/;
                if (!reg.test(value))
                    setErrors({...errors, [name]:'Tel. Number should contain only numbers'});
                else
                    setErrors({...errors, [name]:''});
                return;

            case 'email':
                if(value.split('').filter(x => x === '@').length !== 1)
                    setErrors({...errors, [name]:'Email should contain a @'});
                else
                    setErrors({...errors, [name]:''});
                return;

            default:
                return;
        }
    }

    return(
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" component={RouterLink} to="/">
                    Home
                    </Link>
                    <Typography color="textPrimary">Contact Us</Typography>
                </Breadcrumbs>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h4" align='left' component="h4">
                Location Information
                </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="h6" align='left' component="h6">
                Our Address
                </Typography>
                <address>
                121, Clear Water Bay Road<br /> Clear Water Bay, Kowloon<br /> HONG KONG<br />
                <PhoneIcon fontSize='small' />: +852 1234 5678<br />
                <PrintIcon fontSize='small' />: +852 8765 4321<br />
                <EmailIcon fontSize='small' />:
                <a href="mailto:confusion@food.net">confusion@food.net</a>
                </address>
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="h6" align='left' component="h6">
                Map of our Location
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <ButtonGroup variant="contained" color="inherit">
                    <Button startIcon={<PhoneIcon />} href="tel:+85212345678">Call</Button>
                    <Button startIcon={<WhatsAppIcon />} href="tel:+85212345678">WhatsApp</Button>
                    <Button startIcon={<EmailIcon />} href="mailto:confusion@food.net">Email</Button>
                </ButtonGroup>
            </Grid>
            <Grid item xs={12}>
                <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField label="First Name" variant="outlined" name="firstname" value={formState.firstname} onChange={handleInputChange}
                        error={errors.firstname.length > 0} helperText={errors.firstname} /> 
                    <TextField label="Last Name" variant="outlined" name="lastname" value={formState.lastname} onChange={handleInputChange}
                        error={errors.lastname.length > 0} helperText={errors.lastname} />
                    <TextField type="telnum" label="Tel. Number" variant="outlined" name="telnum" value={formState.telnum} onChange={handleInputChange}
                        error={errors.telnum.length > 0} helperText={errors.telnum} />
                    <TextField type="email" label="Email" variant="outlined" name="email" value={formState.email} onChange={handleInputChange}
                        error={errors.email.length > 0} helperText={errors.email} />
                    <FormGroup row>
                        <FormControlLabel
                            control={
                            <Switch checked={formState.agree} onChange={handleInputChange}
                                name="agree" color="primary"
                            />
                            }
                            label="May We Contact You?"
                        />
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-label">Contact Type</InputLabel>
                            <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            name="contactType"
                            value={formState.contactType}
                            onChange={handleInputChange}
                            label="Contact Type"
                            >
                                <MenuItem value='None'><em>None</em></MenuItem>
                                <MenuItem value={'Tel.'}>Tel.</MenuItem>
                                <MenuItem value={'Email'}>Email</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField multiline rows={12} label="Your Feedback" variant="outlined" name="message" value={formState.message} onChange={handleInputChange} />
                    </FormGroup>
                    <Button type="submit"
                     disabled={errors.firstname.length > 0 || errors.lastname.length > 0
                     || errors.telnum.length > 0  || errors.email.length > 0}
                     variant="contained" color="primary">
                    Submit
                    </Button>
                </form>
            </Grid>
        </Grid>
    );
}
