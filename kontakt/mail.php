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
// hier kann man zusätzliche Formularfelder anlegen

$empfaenger = "jimmy.molnit@gmail.com"; // Empfänger Email
$betreff = "Anfrage";
$nachricht = "Vorname: " . $vorname . "\n" . "Nachname: " . $nachname . "\n" . "Telefon: " . $tel . "\n" . "Email: " . $email . "\n" . "Nachricht: " . $nachricht;
// erweitern, wenn nötig
$header = array(
'MIME-Version' => '1.0',
'Content-type' => 'text/plain; charset=utf-8',
'From' => 'info@hjimmymolnit.github.io', // Hier muss die eigene Domain vermerkt werden
'Reply-To' => $email,
'X-Mailer' => 'PHP/' . phpversion()
);

mail($empfaenger, $betreff, $nachricht, $header);