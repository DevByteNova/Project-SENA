-- --------------------------------------------------------
-- Creación de la base de datos
-- --------------------------------------------------------
CREATE DATABASE IF NOT EXISTS `pijamas` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `pijamas`;

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `clientes`
-- --------------------------------------------------------
CREATE TABLE `clientes` (
  `ID_CLIENTE` int(11) NOT NULL AUTO_INCREMENT,
  `NOMBRE` varchar(100) DEFAULT NULL,
  `APELLIDOS` varchar(100) DEFAULT NULL,
  `DIRECCION` text DEFAULT NULL,
  `TELEFONO` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`ID_CLIENTE`),
  UNIQUE KEY `ID_CLIENTE_UNIQUE` (`ID_CLIENTE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `vendedor`
-- --------------------------------------------------------
CREATE TABLE `vendedor` (
  `ID_VENDEDOR` int(11) NOT NULL AUTO_INCREMENT,
  `NOMBRE` varchar(100) DEFAULT NULL,
  `DIRECCION` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID_VENDEDOR`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `productos`
-- --------------------------------------------------------
CREATE TABLE `productos` (
  `ID_PRODUCTO` int(11) NOT NULL AUTO_INCREMENT,
  `DESCRIPCION` varchar(250) DEFAULT NULL,
  `PRECIO` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`ID_PRODUCTO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `facturas`
-- --------------------------------------------------------
CREATE TABLE `facturas` (
  `ID_FACTURA` int(11) NOT NULL AUTO_INCREMENT,
  `FECHA` date DEFAULT NULL,
  `ID_CLIENTE` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID_FACTURA`),
  KEY `fk_cliente_factura_idx` (`ID_CLIENTE`),
  CONSTRAINT `fk_cliente_factura` FOREIGN KEY (`ID_CLIENTE`) REFERENCES `clientes` (`ID_CLIENTE`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `usuarios`
-- --------------------------------------------------------
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `ID_CLIENTE` int(11) DEFAULT NULL,
  `ID_VENDEDOR` int(11) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuario_UNIQUE` (`usuario`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `fk_usu_cliente_idx` (`ID_CLIENTE`),
  KEY `fk_usu_vendedor_idx` (`ID_VENDEDOR`),
  CONSTRAINT `fk_usu_cliente` FOREIGN KEY (`ID_CLIENTE`) REFERENCES `clientes` (`ID_CLIENTE`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_usu_vendedor` FOREIGN KEY (`ID_VENDEDOR`) REFERENCES `vendedor` (`ID_VENDEDOR`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `ventas`
-- --------------------------------------------------------
CREATE TABLE `ventas` (
  `ID_VENTAS` int(11) NOT NULL AUTO_INCREMENT,
  `ID_FACTURA` int(11) DEFAULT NULL,
  `ID_PRODUCTO` int(11) DEFAULT NULL,
  `ID_VENDEDOR` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID_VENTAS`),
  KEY `fk_factura_venta_idx` (`ID_FACTURA`),
  KEY `fk_producto_venta_idx` (`ID_PRODUCTO`),
  KEY `fk_vendedor_venta_idx` (`ID_VENDEDOR`),
  CONSTRAINT `fk_factura_venta` FOREIGN KEY (`ID_FACTURA`) REFERENCES `facturas` (`ID_FACTURA`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_producto_venta` FOREIGN KEY (`ID_PRODUCTO`) REFERENCES `productos` (`ID_PRODUCTO`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_vendedor_venta` FOREIGN KEY (`ID_VENDEDOR`) REFERENCES `vendedor` (`ID_VENDEDOR`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;