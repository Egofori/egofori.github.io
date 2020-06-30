import React from "react";
import profile_image from "../img/profile_image.png";
import "../style/styles.css";

function Body() {
  return (
    <div>
      <div className="user-profile-div">
        <div className="inner-user-profile-div">
          <div className="profile-picture">
            <img src={profile_image} alt="profile_image" />
          </div>
        </div>
      </div>
      <div className="form-div">
        <form>
          <table>
            <tr>
              <td className="labels">First name:</td>
              <td>
                <input type="text" />
              </td>
            </tr>
            <tr>
              <td className="labels">Last name:</td>
              <td>
                <input type="text" />
              </td>
            </tr>
            <tr>
              <td className="labels">Email:</td>
              <td>
                <input type="text" />
              </td>
            </tr>
            <tr>
              <td className="labels">Phone:</td>
              <td>
                <input type="text" />
              </td>
            </tr>
            <tr>
              <td className="labels">Level:</td>
              <td>
                <input type="text" />
              </td>
            </tr>
            <tr>
              <td className="labels">Password:</td>
              <td>
                <input type="text" />
              </td>
            </tr>
          </table>
          <br />
          <input type="submit" value="add" />
        </form>
      </div>
    </div>
  );
}

export default Body;
