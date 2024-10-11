USE BBDD_Manzanas_Cuidado;

-- Insertar datos en la tabla Manzana
INSERT INTO Manzana (Man_Nombre) VALUES
('Puente Aranda'),
('Suba'),
('Fontibón'),
('San Cristobal'),
('Kennedy');

-- Insertar datos en la tabla Solicitud
INSERT INTO Solicitud (Sol_Establecimiento) VALUES
('Establecimiento 1'),
('Establecimiento 2'),
('Establecimiento 3'),
('Establecimiento 4'),
('Establecimiento 5');

-- Insertar datos en la tabla Servicio
INSERT INTO Servicio (Ser_Nombre, Ser_Descripcion) VALUES
('Servicio 1', 'Descripción del Servicio 1'),
('Servicio 2', 'Descripción del Servicio 2'),
('Servicio 3', 'Descripción del Servicio 3'),
('Servicio 4', 'Descripción del Servicio 4'),
('Servicio 5', 'Descripción del Servicio 5');

-- Insertar datos en la tabla Manzana_Servicio
INSERT INTO Manzana_Servicio (Man_ID, Ser_ID) VALUES
(1, 1),
(1, 2),
(2, 3),
(3, 4),
(4, 5);

-- Insertar datos en la tabla Usuario
INSERT INTO Usuario (Usu_Tipo_Documento, Usu_Nombre_Usuario, Usu_Contrasena, Usu_Nombre, Usu_Telefono, Usu_Email, Man_ID, Sol_ID) VALUES
('Cedula de Extranjeria', 'usuario1', 'pass1', 'Juan Pérez', '123456789', 'juan@example.com', 1, 1),
('Cedula de Ciudadana', 'usuario2', 'pass2', 'Ana Gómez', '987654321', 'ana@example.com', 2, 2),
('Cedula de Extranjeria', 'usuario3', 'pass3', 'Luis Martínez', '456789123', 'luis@example.com', 3, 3),
('Cedula de Ciudadana', 'usuario4', 'pass4', 'María López', '321654987', 'maria@example.com', 4, 4),
('Cedula de Extranjeria', 'usuario5', 'pass5', 'Carlos Sánchez', '789456123', 'carlos@example.com', 5, 5);

