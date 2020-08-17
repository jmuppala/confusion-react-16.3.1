import React from 'react';
import Grid from '@material-ui/core/Grid';
import PhoneIcon from '@material-ui/icons/Phone';
import PrintIcon from '@material-ui/icons/Print';
import EmailIcon from '@material-ui/icons/Email';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';

export default function Contact(props) {
    return(
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h4" align='left' component="h4">
                Location Information
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
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
        </Grid>
    );
}
