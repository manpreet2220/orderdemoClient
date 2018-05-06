import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
class Login extends React.Component {
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <TextField
                        hintText="Username"
                        errorText="This field is required"
                    /><br />
                    <TextField
                        hintText="Password"
                        errorText="Password is required"
                        type="password"
                    /><br />
                    <RaisedButton label="Submit" primary={true}/>
                </div>
            </MuiThemeProvider>

        );
    }
}

export default Login;