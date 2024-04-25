import React from "react";

function LoginFirst() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>You need to login first</h2>
      <p>Please <a href="/login">login</a> to access this page.</p>
    </div>
  );
}

export default LoginFirst;
