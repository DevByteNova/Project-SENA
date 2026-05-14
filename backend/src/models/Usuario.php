<?php

class Usuario {
    private $conn;
    private $table = 'usuarios';

    public function __construct($db) {
        $this->conn = $db;
    }

    public function registrar($usuario, $email, $password, $tipo_usuario = 'cliente') {
        try {
            // Verificar si el usuario ya existe
            if ($this->usuarioExiste($usuario, $email)) {
                return [
                    'success' => false,
                    'message' => 'El usuario o email ya está registrado'
                ];
            }

            // Hash de la contraseña
            $password_hash = password_hash($password, PASSWORD_BCRYPT);

            // Insertar usuario
            $query = "INSERT INTO " . $this->table . " 
                      (usuario, email, password_hash, is_active) 
                      VALUES (:usuario, :email, :password_hash, 1)";

            $stmt = $this->conn->prepare($query);

            // Bind valores
            $stmt->bindParam(':usuario', $usuario);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':password_hash', $password_hash);

            if ($stmt->execute()) {
                $usuario_id = $this->conn->lastInsertId();

                // Si es cliente, crear cliente en tabla clientes
                if ($tipo_usuario === 'cliente') {
                    $this->crearClienteAsociado($usuario_id, $usuario);
                }

                return [
                    'success' => true,
                    'message' => 'Registro exitoso. Por favor inicia sesión',
                    'usuario_id' => $usuario_id
                ];
            } else {
                return [
                    'success' => false,
                    'message' => 'Error al registrar el usuario'
                ];
            }
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error: ' . $e->getMessage()
            ];
        }
    }

    private function usuarioExiste($usuario, $email) {
        $query = "SELECT * FROM " . $this->table . " 
                  WHERE usuario = :usuario OR email = :email";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':usuario', $usuario);
        $stmt->bindParam(':email', $email);
        $stmt->execute();

        return $stmt->rowCount() > 0;
    }

    private function crearClienteAsociado($usuario_id, $nombre) {
        try {
            $query_cliente = "INSERT INTO clientes (NOMBRE) VALUES (:nombre)";
            $stmt_cliente = $this->conn->prepare($query_cliente);
            $stmt_cliente->bindParam(':nombre', $nombre);
            $stmt_cliente->execute();

            $cliente_id = $this->conn->lastInsertId();

            // Asociar cliente con usuario
            $query_update = "UPDATE " . $this->table . " 
                           SET ID_CLIENTE = :cliente_id 
                           WHERE id = :usuario_id";
            $stmt_update = $this->conn->prepare($query_update);
            $stmt_update->bindParam(':cliente_id', $cliente_id);
            $stmt_update->bindParam(':usuario_id', $usuario_id);
            $stmt_update->execute();
        } catch (Exception $e) {
            // Log error but don't fail registration
            error_log("Error creating associated client: " . $e->getMessage());
        }
    }

    public function obtenerPorEmail($email) {
        $query = "SELECT * FROM " . $this->table . " WHERE email = :email";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':email', $email);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function obtenerPorId($id) {
        $query = "SELECT * FROM " . $this->table . " WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
?>
