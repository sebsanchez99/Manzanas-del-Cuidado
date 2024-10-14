USE BBDD_Manzanas_Cuidado;

-- Insertar datos en tabla Tipo_Documento
INSERT INTO Tipo_Documento(TiD_Nombre) VALUES
('Cédula de ciudadanía'),
('Pasaporte'),
('Cédula de extranjería')

-- Insertar datos en la tabla Manzana
INSERT INTO Manzana (Man_Nombre) VALUES
('Puente Aranda'),
('Suba'),
('Fontibón'),
('San Cristobal'),
('Kennedy');

-- Insertar datos en la tabla Servicio
INSERT INTO Servicio (Ser_Nombre, Ser_Descripcion) VALUES
('Estudios', 'Oportunidad de estudiar y mejorar sus conocimientos'),
('Emprendimiento', 'Apoyo para emprender nuevos negocios y proyectos'),
('Asesoría Jurídica', 'Orientación y asesoría legal para las cuidadoras'),
('Lavandería Comunitaria', 'Servicio gratuito para lavar la ropa de las cuidadoras y sus familias'),
('Asesoría Psicológica', 'Atención y apoyo psicológico para el bienestar mental');

-- Insertar datos en la tabla Solicitud
INSERT INTO Solicitud (Sol_Establecimiento, Sol_Fecha, Man_ID, Ser_ID) VALUES
('Centro Comunitario Puente Aranda', '2024-01-15', 1, 1),
('Centro Comunitario Suba', '2024-02-20', 2, 2),
('Centro Comunitario Fontibón', '2024-03-10', 3, 3),
('Centro Comunitario San Cristobal', '2024-04-05', 4, 4),
('Centro Comunitario Kennedy', '2024-05-18', 5, 5);

-- Insertar datos en la tabla Usuario
INSERT INTO Usuario (TiD_ID, Usu_Documento, Usu_Nombre, Usu_Contrasena, Usu_Telefono, Usu_Email, Sol_ID) VALUES
(1, '123456789', 'Ana Gómez', 'password123', '3001234567', 'ana.gomez@example.com', 1),
(2, 'A98765432', 'John Smith', 'password456', '3019876543', 'john.smith@example.com', 2),
(3, 'E76543210', 'Laura Martínez', 'password789', '3027654321', 'laura.martinez@example.com', 3),
(1, '234567890', 'Carlos Pérez', 'passwordabc', '3002345678', 'carlos.perez@example.com', 4),
(2, 'B87654321', 'Sofía Rodríguez', 'passworddef', '3018765432', 'sofia.rodriguez@example.com', 5);
