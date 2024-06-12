const express = require('express');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 8080;

// Middleware para parsear datos binarios
app.use(express.raw({ type: 'application/octet-stream', limit: '10mb' }));

// Ruta POST para recibir y procesar información
app.post('/data', async (req, res) => {
    try {
        const receivedData = req.body;

        // Convertir los datos binarios en una imagen utilizando sharp
        const imageBuffer = await sharp(receivedData, {
            raw: {
                width: 40, // Cambia esto al ancho correcto de tu imagen
                height: 30, // Cambia esto a la altura correcta de tu imagen
                channels: 2 // Cambia esto al número correcto de canales
            }
        })
        .toFormat('jpeg')
        .toBuffer();

        // Guardar la imagen en el sistema de archivos
        const imagePath = path.join('C:\\Users\\fuque\\Downloads\\project', 'received_image.jpg');
        fs.writeFileSync(imagePath, imageBuffer);

        console.log(`Datos recibidos: ${receivedData.length} bytes`);
        res.sendFile(imagePath); // Devolver la imagen procesada
    } catch (error) {
        console.error('Error al procesar la imagen:', error);
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// Iniciar el servidor y escuchar en todas las interfaces
app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor escuchando en http://0.0.0.0:${port}`);
});
