CREATE DATABASE BBDD_Manzanas_Cuidado
    DEFAULT CHARACTER SET = 'utf8mb4';

USE BBDD_Manzanas_Cuidado;

-- Tabla TipoDocumento
CREATE TABLE Tipo_Documento(
    TiD_ID INT(5) PRIMARY KEY AUTO_INCREMENT,
    TiD_Nombre VARCHAR(10)
);

-- Tabla Manzana
CREATE TABLE Manzana(
    Man_ID INT(5) PRIMARY KEY AUTO_INCREMENT,
    Man_Nombre VARCHAR(30)
);

-- Tabla Servicio
CREATE TABLE Servicio(
    Ser_ID INT(5) PRIMARY KEY AUTO_INCREMENT,
    Ser_Nombre VARCHAR(30),
    Ser_Descripcion VARCHAR(80)
);

-- Tabla intermedia que relaciona los servicios que contiene cada manzana
CREATE TABLE Manzana_Servicio(
    MaS INT(5) PRIMARY KEY AUTO_INCREMENT,
    Man_ID INT(5),
    Ser_ID INT(5),
    FOREIGN KEY (Man_ID) REFERENCES Manzana(Man_ID),
    FOREIGN KEY (Ser_ID) REFERENCES Servicio(Ser_ID)
);

-- Tabla Usuario
CREATE TABLE Usuario(
    Usu_ID INT(5) PRIMARY KEY AUTO_INCREMENT,
    TiD_ID INT(5),
    Usu_Documento VARCHAR(20),
    Usu_Nombre VARCHAR(20),
    Usu_Contrasena VARCHAR(30),
    Usu_Email VARCHAR(30),
    Man_ID INT(5),  
    FOREIGN KEY (TiD_ID) REFERENCES Tipo_Documento(TiD_ID),
    FOREIGN KEY (Man_ID) REFERENCES Manzana(Man_ID)
);

-- Nueva tabla intermedia para asociar Usuarios y Servicios con Fecha
CREATE TABLE Usuario_Servicio(
    UsuSer_ID INT(5) PRIMARY KEY AUTO_INCREMENT,
    Usu_ID INT(5),
    Ser_ID INT(5),
    Fecha DATE,
    FOREIGN KEY (Usu_ID) REFERENCES Usuario(Usu_ID),
    FOREIGN KEY (Ser_ID) REFERENCES Servicio(Ser_ID)
);


-- Consulta modificada para obtener los servicios de una solicitud específica
SELECT s.Ser_ID, s.Ser_Nombre, s.Ser_Descripcion, us.Fecha
FROM Servicio s
JOIN Usuario_Servicio us ON s.Ser_ID = us.Ser_ID
JOIN Usuario u ON u.Usu_ID = us.Usu_ID
WHERE u.Usu_ID = 1;


SELECT s.Ser_ID, s.Ser_Nombre, s.Ser_Descripcion 
FROM Servicio s 
JOIN Manzana_Servicio ms ON s.Ser_ID = ms.Ser_ID 
JOIN Manzana m ON m.Man_ID = ms.Man_ID 
WHERE m.Man_ID = ?