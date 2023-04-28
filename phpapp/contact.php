<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="../css/styles.css" />
  <link rel="stylesheet" href="../css/contact.css" />
  <script src="https://smtpjs.com/v3/smtp.js"></script>
  <title>Contact us</title>
</head>

<body>
  <?php include 'menu.php'; ?>
  <div class="contact-us">
    <div class="contact-title">Contact us</div>
    <div class="pad-top align-center content-div">
      <div class="pad-top-2">
        <form onsubmit="return validateForm()" method="POST" id="contact-form" action="contact-email.php">
          <div class="form-div">
            <div class="left-div">
              <input type="text" name="firstName" placeholder="First Name" required autocomplete="off" id="firstName" />
            </div>
            <div>
              <input type="text" name="lastName" placeholder="Last Name" required autocomplete="off" />
            </div>
          </div>
          <div class="form-div second-row">
            <div class="left-div">
              <input name="phoneNumber" placeholder="Phone Number(optional)" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type="number" maxlength="10" autocomplete="off" onfocus="hide()" />
            </div>
            <div>
              <input type="email" name="email" placeholder="Email" required autocomplete="off" id="email" />
            </div>
          </div>
          <div class="pad-top-2" style="color:red; display:none" id="phone-warn">Please check the phone number! </div>
          <div class="pad-top-2">
            <textarea name="query" placeholder="Enter your comments" required></textarea>
          </div>

          <div class="pad-top-2">
            <input type="submit" class="submit-btn" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  </div>
  <script src="../scripts/script.js"></script>
  <script>
    function validateForm() {
      let phones = document.getElementsByName('phoneNumber');
      let phone = phones[0].value;
      if (phone.toString().length == 0 || phone.toString().length == 10) {
        alert('Your details were sent successfully!');
        return true;
      } else {
        document.getElementById("phone-warn").style.display = 'block';
        return false;
      }
    }

    function hide() {
      document.getElementById("phone-warn").style.display = 'none';
    }
  </script>
</body>

</html>