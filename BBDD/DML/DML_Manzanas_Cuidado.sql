USE BBDD_Manzanas_Cuidado;

-- Insertar datos en la tabla Tipo_Documento
INSERT INTO Tipo_Documento(TiD_Nombre) VALUES
('Cédula de ciudadanía'),
('Cédula de extranjería'),
('Pasaporte');

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

-- Insertar datos en la tabla intermedia Manzana_Servicio
INSERT INTO Manzana_Servicio (Man_ID, Ser_ID) VALUES
(1, 1),   
(1, 3),   
(2, 2),  
(2, 5),   
(3, 1),  
(3, 4),   
(4, 2),   
(4, 3),   
(5, 4),   
(5, 5);   

-- Insertar datos en la tabla Solicitud
INSERT INTO Solicitud (Sol_Establecimiento, Sol_Fecha, Ser_ID) VALUES
('Centro Comunitario Puente Aranda', '2024-01-15', 1),
('Centro Comunitario Suba', '2024-02-20', 2),
('Centro Comunitario Fontibón', '2024-03-10', 3),
('Centro Comunitario San Cristobal', '2024-04-05', 4),
('Centro Comunitario Kennedy', '2024-05-18', 5);

-- Insertar datos en la tabla Usuario
INSERT INTO Usuario (TiD_ID, Usu_Documento, Usu_Nombre, Usu_Contrasena, Usu_Email, Sol_ID, Man_ID) VALUES
(1, '123456789', 'Ana Gómez', 'password123', 'ana.gomez@example.com', 1, 1),
(2, 'A98765432', 'John Smith', 'password456', 'john.smith@example.com', 2, 2),
(3, 'E76543210', 'Laura Martínez', 'password789', 'laura.martinez@example.com', 3, 3),
(1, '234567890', 'Carlos Pérez', 'passwordabc', 'carlos.perez@example.com', 4, 4),
(2, 'B87654321', 'Sofía Rodríguez', 'passworddef', 'sofia.rodriguez@example.com', 5, 5);


SELECT * FROM USUARIO