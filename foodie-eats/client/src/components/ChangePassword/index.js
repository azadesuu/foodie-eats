import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../api";

function ChangePassword() {
  return (
    <div className="edit-form">
        <div className="form-control-profile">
        <label>current password</label>
        <input
            type="password"
            name="change-currentpw"
            id="change-currentpw"
            // value={}
        />
        </div>
        <div className="form-control-profile">
        <label>new password </label>
        <input
            type="password"
            name="change-newpw"
            id="change-newpw"
            // value={}
        />
        </div>
        <div className="form-control-profile">
        <label>confirm new password </label>
        <input
            type="password"
            name="change-connewpw"
            id="change-connewpw"
            // value={}
        />
        </div>
        <a className="edit-profile-done" >CONFIRM</a>
    </div>
  )
}

export default ChangePassword;