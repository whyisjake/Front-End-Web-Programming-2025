<?php
// Check if form was submitted
if ($_POST) {
  // Sanitize and get form data
  $name = htmlspecialchars($_POST['name'] ?? '');
  $email = htmlspecialchars($_POST['email'] ?? '');
  $subject = htmlspecialchars($_POST['subject'] ?? '');
  $message = htmlspecialchars($_POST['message'] ?? '');
  $contactMethod = htmlspecialchars($_POST['contact-method'] ?? '');
  $phone = htmlspecialchars($_POST['phone'] ?? '');
  $inquiryType = htmlspecialchars($_POST['inquiry-type'] ?? '');
  $newsletter = isset($_POST['newsletter']) ? 'Yes' : 'No';
  $bestTime = htmlspecialchars($_POST['best-time'] ?? '');
  $preferredDate = htmlspecialchars($_POST['preferred-date'] ?? '');
  $website = htmlspecialchars($_POST['website'] ?? '');
  $priority = htmlspecialchars($_POST['priority'] ?? '');
  $budget = htmlspecialchars($_POST['budget'] ?? '');
  $colorPreference = htmlspecialchars($_POST['color-preference'] ?? '');
  $formSource = htmlspecialchars($_POST['form-source'] ?? '');

  // Handle services checkboxes (array)
  $services = isset($_POST['services']) ? $_POST['services'] : [];
  // Ensure services is always an array
  if (!is_array($services)) {
    $services = [$services];
  }
  $servicesList = implode(', ', array_map('htmlspecialchars', $services));

  // Display the submitted data
  echo "<h2>Form Submission Received</h2>";
  echo "<p><strong>Name:</strong> " . $name . "</p>";
  echo "<p><strong>Email:</strong> " . $email . "</p>";
  echo "<p><strong>Subject:</strong> " . $subject . "</p>";
  echo "<p><strong>Message:</strong> " . nl2br($message) . "</p>";
  echo "<p><strong>Preferred Contact Method:</strong> " . $contactMethod . "</p>";

  if (!empty($phone)) {
    echo "<p><strong>Phone Number:</strong> " . $phone . "</p>";
  }

  echo "<p><strong>Inquiry Type:</strong> " . $inquiryType . "</p>";
  echo "<p><strong>Newsletter Subscription:</strong> " . $newsletter . "</p>";

  if (!empty($bestTime)) {
    echo "<p><strong>Best Time to Contact:</strong> " . $bestTime . "</p>";
  }

  if (!empty($preferredDate)) {
    echo "<p><strong>Preferred Contact Date:</strong> " . $preferredDate . "</p>";
  }

  if (!empty($website)) {
    echo "<p><strong>Website/Portfolio:</strong> " . $website . "</p>";
  }

  echo "<p><strong>Priority Level:</strong> " . $priority . "/5</p>";

  if (!empty($budget)) {
    echo "<p><strong>Budget Range:</strong> $" . number_format($budget) . "</p>";
  }

  echo "<p><strong>Brand Color:</strong> " . $colorPreference . "</p>";

  if (!empty($servicesList)) {
    echo "<p><strong>Services Needed:</strong> " . $servicesList . "</p>";
  }

  echo "<a href='contact.html'>Back to Contact Form</a>";
} else {
  // Redirect to contact form if accessed directly
  header("Location: contact.html");
  exit();
}
