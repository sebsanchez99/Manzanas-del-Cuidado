-- Active: 1726703214074@@127.0.0.1@3306
CREATE DATABASE BBDD_Manzanas_Cuidado
    DEFAULT CHARACTER SET = 'utf8mb4';

USE BBDD_Manzanas_Cuidado;

-- Tabla Manzana
CREATE TABLE Manzana(
    Man_ID INT(5) PRIMARY KEY AUTO_INCREMENT,
    Man_Nombre VARCHAR(30)
);

-- Tabla Solicitud
CREATE TABLE Solicitud(
    Sol_ID INT(5) PRIMARY KEY AUTO_INCREMENT,
    Sol_Establecimiento VARCHAR(30)
);

-- Tabla Servicio
CREATE TABLE Servicio(
    Ser_ID INT(5) PRIMARY KEY AUTO_INCREMENT,
    Ser_Nombre VARCHAR(30),
    Ser_Descripcion VARCHAR(80)
);

-- Tabla intermedia Manzana_Servicio
CREATE TABLE Manzana_Servicio(
    MaS_ID INT(5) PRIMARY KEY AUTO_INCREMENT,
    Man_ID INT(5),
    Ser_ID INT(5),
    FOREIGN KEY(Man_ID) REFERENCES Manzana(Man_ID),
    FOREIGN KEY(Ser_ID) REFERENCES Servicio(Ser_ID)
);

-- Tabla Usuario
CREATE TABLE Usuario(
    Usu_ID INT(5) PRIMARY KEY AUTO_INCREMENT,
    Usu_Tipo_Documento VARCHAR(20),
    Usu_Nombre VARCHAR(20),
    Usu_Nombre_Usuario VARCHAR(15),
    Usu_Contrasena VARCHAR(30),
    Usu_Telefono VARCHAR(20),
    Usu_Email VARCHAR(30),
    Man_ID INT(5),
    Sol_ID INT(5),
    FOREIGN KEY(Man_ID) REFERENCES Manzana(Man_ID),
    FOREIGN KEY(Sol_ID) REFERENCES Solicitud(Sol_ID)
);
