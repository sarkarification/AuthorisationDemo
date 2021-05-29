import { useContext, useRef, useState } from 'react';
import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';
import { useHistory } from 'react-router-dom';

const ProfileForm = () => {
  const authCtx = useContext(AuthContext);
  const newPasswordInput = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const submitHandler = event =>{
    event.preventDefault();
    const enteredNewPassword = newPasswordInput.current.value;
    //addValidation
    setIsLoading(true);
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=[API]',
    {
      method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.token,
        password: enteredNewPassword,
        returnSecureToken: false
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      setIsLoading(false);
      // if(response.ok){
      //   console.log(response.json())
      // }
      // else{

      // }
      history.replace('/');
    })
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input ref={newPasswordInput} type='password' minLength="7" id='new-password' />
      </div>
      <div className={classes.action}>
        {isLoading && <p>Loading</p>}
        {!isLoading && <button>Change Password</button>}
      </div>
    </form>
  );
}

export default ProfileForm;
