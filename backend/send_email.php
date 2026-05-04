<?php
// Configurações e Cabeçalhos CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Permite apenas requisições POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Método não permitido."]);
    exit;
}

// Configuração do Destinatário
$to = "anderson.jorge33@gmail.com";

// Higienização e Validação dos inputs
function sanitize_input($data) {
    if (is_null($data)) return "";
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    // Prevenção extra contra Email Header Injection quebrando linhas
    $data = str_replace(array("\r", "\n", "%0a", "%0d"), ' ', $data);
    return $data;
}

// Especial para a mensagem, preservamos quebras de linha natural
function sanitize_message($data) {
    if (is_null($data)) return "";
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

$nome = sanitize_input($_POST["name"] ?? "");
$email = sanitize_input($_POST["email"] ?? "");
$telefone = sanitize_input($_POST["phone"] ?? "");
$assunto = sanitize_input($_POST["subject"] ?? "");
$mensagem = sanitize_message($_POST["message"] ?? "");

// Verifica se os campos obrigatórios estão preenchidos
if (empty($nome) || empty($email) || empty($telefone) || empty($assunto) || empty($mensagem)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Por favor, preencha todos os campos obrigatórios."]);
    exit;
}

// Validação de E-mail
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Por favor, insira um e-mail válido."]);
    exit;
}

// Construção do e-mail
$email_subject = "Nova Mensagem via Landing Page (Alpha Dive) - $assunto";
$email_body = "Você recebeu uma nova mensagem através do formulário de contato do site Alpha Dive.\n\n";
$email_body .= "Detalhes do Contato:\n";
$email_body .= "------------------------\n";
$email_body .= "Nome original: $nome\n";
$email_body .= "E-mail fornecido: $email\n";
$email_body .= "Telefone: $telefone\n";
$email_body .= "Assunto: $assunto\n\n";
$email_body .= "Mensagem Escrita:\n";
$email_body .= "------------------------\n";
$email_body .= "$mensagem\n";
$email_body .= "\n------------------------\n";
$email_body .= "E-mail disparado automaticamente pelo sistema.";

// Headers de envio. Em muitos servidores Hostinger, o 'From' PRECISA 
// estar associado a um e-mail válido do seu domínio criado na provedora para envio funcionar
// por exemplo: lead@seudominio.com.br. Aqui adotamos um genérico. 
$headers = "From: webmaster@alphadive.com.br" . "\r\n";
$headers .= "Reply-To: $email" . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8" . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Disparo
if (mail($to, $email_subject, $email_body, $headers)) {
    http_response_code(200);
    echo json_encode(["status" => "success", "message" => "E-mail enviado com sucesso!"]);
} else {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Erro na Hostinger ao enviar o e-mail via mail(). Verifique as portas ou permissões."]);
}
?>
