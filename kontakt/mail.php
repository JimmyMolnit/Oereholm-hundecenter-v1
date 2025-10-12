<?php
$fornavn = $_POST['fornavn'];
$fornavn = wordwrap($fornavn, 70);

$efternavn = $_POST['efternavn'];
$efternavn = wordwrap($efternavn, 70);

$email = $_POST['email'];
$email = wordwrap($email, 70);

$tel = $_POST['telefon'];
$tel = wordwrap($tel, 70);

$besked = $_POST['besked'];
$besked = wordwrap($besked, 70);
// Her kan du oprette yderligere formularfelter

$modtager = "jimmy.molnit@gmail.com"; // Modtager Email
$reference = "Forespørgsel";
$besked = "Fornavn: " . $fornavn . "\n" . "Efternavn: " . $efternavn . "\n" . "Telefon: " . $tel . "\n" . "Email: " . $email . "\n" . "Besked: " . $besked;
// udvide om nødvendigt
$header = array(
'MIME-Version' => '1.0',
'Content-type' => 'text/plain; charset=utf-8',
'From' => 'info@jgmolnit.dk' // Dit eget domæne skal angives her
'Reply-To' => $email,
'X-Mailer' => 'PHP/' . phpversion(8.4)
);

mail($modtager, $reference, $besked, $header);