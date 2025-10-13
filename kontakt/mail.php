<?php
$vorname = $_POST['vorname'];
$vorname = wordwrap($vorname, 70);

$nachname = $_POST['nachname'];
$nachname = wordwrap($nachname, 70);

$email = $_POST['email'];
$email = wordwrap($email, 70);

$tel = $_POST['telefon'];
$tel = wordwrap($tel, 70);

$nachricht = $_POST['nachricht'];
$nachricht = wordwrap($nachricht, 70);
// Her kan du oprette yderligere formularfelter

$empfaenger = "familien@jgmolnit.dk"; // Modtager e-mail
$betreff = "Forespørgelse";
$nachricht = "Fornavn: " . $vorname . "\n" . "Efternavn: " . $nachname . "\n" . "Telefon: " . $tel . "\n" . "Email: " . $email . "\n" . "Besked: " . $nachricht;
// udvide om nødvendigt
$header = array(
'MIME-Version' => '1.0',
'Content-type' => 'text/plain; charset=utf-8',
'From' => 'info@jgmolnit.dk', // Dit eget domæne skal angives her
'Reply-To' => $email,
'X-Mailer' => 'PHP/' . phpversion()
);

mail($empfaenger, $betreff, $nachricht, $header);