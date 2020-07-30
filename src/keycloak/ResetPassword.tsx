import React, {useState} from "react";

export default function ResetPassword() {

    const [password, setPassword] = useState<string>("");
    const [passwordConfirm, setPasswordConfirm] = useState<string>("");
    const [matching, setMatching] = useState<boolean>(true);
    return <div>
        <h1 data-testid="reset-password-header">Passwort zurücksetzen</h1>
        <div className="form-group">
            <label htmlFor="passwordInput">Passwort</label>
            <input data-testid="password-input" type="password" className="form-control" id="passwordInput" placeholder="Passwort"
                   value={password} onChange={event1 => setPassword(event1.target.value)}
            />
        </div>
        <div className="form-group">
            <label htmlFor="passwordInput">Passwort bestätigen</label>
            <input data-testid="password-confirm-input" type="password" className="form-control" id="passwordInput"
                   placeholder="Passwort bestätigen"
                   value={passwordConfirm} onChange={event1 => setPasswordConfirm(event1.target.value)}
                   onBlur={() => {
                       setMatching(password === passwordConfirm)
                   }}/>
            {!matching && <div data-testid="password-confirm-input-error">Keine Übereinstimmung</div>}
        </div>
        <div className="form-check">
            <input type="checkbox" className="form-check-input" id="temporaryPassword"
                   data-testid="temporary-password-checkbox"/>
            <label data-testid="temporary-password-checkbox-label" className="form-check-label" htmlFor="activeInput">Temporäres
                Passwort</label>
        </div>
    </div>
}