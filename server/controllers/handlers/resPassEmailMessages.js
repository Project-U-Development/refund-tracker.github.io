function resPassEmailMessage(url) {
   return {
      html: `<h3>Hello</h3>
      <p>You recently requested to reset your password for your Refund Tracker account.</p>
      <p> If you did not ask to change your password, then you can ignore this email and your password will not be changed.</p>
      <p>Otherwise,use the link below to reset it.</p><br>      
      <p>Reset password link: <a href='${url}'>Reset password</a></p><br>
      <p>The link will remain active for 10 minutes.</p>`,
      text: `Hello
      You recently requested to reset your password for your Refund Tracker account.
      If you did not ask to change your password, then you can ignore this email and your password will not be changed.
      Otherwise,use the link below to reset it.     
      Reset password link: ${url}
      The link will remain active for 10 minutes.`
   }
}

module.exports = { resPassEmailMessage }