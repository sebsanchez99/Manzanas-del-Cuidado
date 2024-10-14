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

-- Tabla intermedia Solicitud
CREATE TABLE Solicitud(
    Sol_ID INT(5) PRIMARY KEY AUTO_INCREMENT,
    Sol_Establecimiento VARCHAR(30),
    Sol_Fecha DATE,
    Man_ID INT(5),
    Ser_ID INT(5),
    FOREIGN KEY(Man_ID) REFERENCES Manzana(Man_ID),
    FOREIGN KEY(Ser_ID) REFERENCES Servicio(Ser_ID)
);

-- Tabla Usuario
CREATE TABLE Usuario(
    Usu_ID INT(5) PRIMARY KEY AUTO_INCREMENT,
    TiD_ID INT(5),
    Usu_Documento VARCHAR(20),
    Usu_Nombre VARCHAR(20),
    Usu_Contrasena VARCHAR(30),
    Usu_Telefono VARCHAR(20),
    Usu_Email VARCHAR(30),
    Sol_ID INT(5),
    FOREIGN KEY(TiD_ID) REFERENCES Tipo_Documento(TiD_ID),
    FOREIGN KEY(Sol_ID) REFERENCES Solicitud(Sol_ID)
);
