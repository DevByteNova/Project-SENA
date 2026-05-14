<?php
// backend/src/routes/api.php (O la ruta donde decidas ponerlo)

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Verificar si es una petición POST y si la acción es 'registro'
$action = $_GET['action'] ?? '';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $action === 'registro') {
    
    // ⚠️ CRÍTICO: Leer el JSON enviado por JavaScript
    $jsonContenido = file_get_contents("php://input");
    $datos = json_decode($jsonContenido, true);

    // Mapear las variables desde el JSON decodificado
    $tipoUsuario = $datos['tipoUsuario'] ?? null;
    $usuario     = $datos['usuario'] ?? null;
    $email       = $datos['email'] ?? null;
    $clave       = $datos['password'] ?? null;

    // Validación en el Backend (Por seguridad)
    if (!$tipoUsuario || !$usuario || !$email || !$clave) {
        echo json_encode(["success" => false, "message" => "Datos incompletos en el servidor."]);
        exit;
    }

    // --- CONEXIÓN A BASE DE DATOS ---
    $host = "localhost";
    $dbname = "el_nombre_de_tu_bd"; // <-- Pon aquí el nombre real de tu BD
    $username = "root";
    $password = "";

    try {
        $conexion = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
        $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Insertar en tu tabla (Verifica que los nombres de las columnas coincidan)
        $sql = "INSERT INTO usuarios (tipo_cuenta, nombre_usuario, correo, contrasena) 
                VALUES (:tipo, :usuario, :email, :clave)";
        
        $stmt = $conexion->prepare($sql);

        // Encriptar contraseña
        $claveEncriptada = password_hash($clave, PASSWORD_BCRYPT);

        $stmt->bindParam(':tipo', $tipoUsuario);
        $stmt->bindParam(':usuario', $usuario);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':clave', $claveEncriptada);

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "¡Usuario registrado correctamente!"]);
        } else {
            echo json_encode(["success" => false, "message" => "No se pudo guardar en la base de datos."]);
        }

    } catch (PDOException $e) {
        echo json_encode(["success" => false, "message" => "Error de BD: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Acción no permitida."]);
}
?><?php
// backend/src/routes/api.php (O la ruta donde decidas ponerlo)

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Verificar si es una petición POST y si la acción es 'registro'
$action = $_GET['action'] ?? '';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $action === 'registro') {
    
    // ⚠️ CRÍTICO: Leer el JSON enviado por JavaScript
    $jsonContenido = file_get_contents("php://input");
    $datos = json_decode($jsonContenido, true);

    // Mapear las variables desde el JSON decodificado
    $tipoUsuario = $datos['tipoUsuario'] ?? null;
    $usuario     = $datos['usuario'] ?? null;
    $email       = $datos['email'] ?? null;
    $clave       = $datos['password'] ?? null;

    // Validación en el Backend (Por seguridad)
    if (!$tipoUsuario || !$usuario || !$email || !$clave) {
        echo json_encode(["success" => false, "message" => "Datos incompletos en el servidor."]);
        exit;
    }

    // --- CONEXIÓN A BASE DE DATOS ---
    $host = "localhost";
    $dbname = "el_nombre_de_tu_bd"; // <-- Pon aquí el nombre real de tu BD
    $username = "root";
    $password = "";

    try {
        $conexion = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
        $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Insertar en tu tabla (Verifica que los nombres de las columnas coincidan)
        $sql = "INSERT INTO usuarios (tipo_cuenta, nombre_usuario, correo, contrasena) 
                VALUES (:tipo, :usuario, :email, :clave)";
        
        $stmt = $conexion->prepare($sql);

        // Encriptar contraseña
        $claveEncriptada = password_hash($clave, PASSWORD_BCRYPT);

        $stmt->bindParam(':tipo', $tipoUsuario);
        $stmt->bindParam(':usuario', $usuario);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':clave', $claveEncriptada);

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "¡Usuario registrado correctamente!"]);
        } else {
            echo json_encode(["success" => false, "message" => "No se pudo guardar en la base de datos."]);
        }

    } catch (PDOException $e) {
        echo json_encode(["success" => false, "message" => "Error de BD: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Acción no permitida."]);
}
?>