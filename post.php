<?

$to='Mk@vskompozit.ru';


$name = isset($_POST['user_name']) ? strip_tags($_POST['user_name']) : '';
$phone = isset($_POST['user_phone']) ? strip_tags($_POST['user_phone']) : '';
$theme = isset($_POST['theme']) ? strip_tags($_POST['theme']) : '';
$comment = isset($_POST['comment']) ? strip_tags($_POST['comment']) : '';

$theme = 'Заявка с сайта vskompozit.ru - ' . $theme;

if (isset($_POST['theme'])) {

	$hdr="From: vskompozit.ru\nMIME-Version: 1.0\nContent-Type:text/plain;charset=\"utf-8\"";


	$message .= "$theme\n\n";
	$message .= "$name\n";
	$message .= "$phone\n\n";
	$message .= "$comment\n";


	$subject = "$theme";

	if (mail($to, "=?utf-8?B?".base64_encode($subject)."?=", $message, $hdr)) {
		print_r('<h3>Спасибо за заявку!</h3><p>Мы с Вами свяжемся в ближайшее время!</p>');
	}
	else {
		print_r('<h3>Ваше сообщение не отправлено.</h3><p>Попробуйте отправить данные еще раз.</p>');
	}
}

?>
