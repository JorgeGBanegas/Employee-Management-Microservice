# Usa la imagen base de Node.js con la versión específica
FROM node:18

# Establece el directorio de trabajo en /usr/src/app
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia todo el contenido del directorio actual al directorio de trabajo
COPY . .

# Expone el puerto en el que tu aplicación escucha
EXPOSE 8002

# Comando para iniciar la aplicación
CMD ["npm", "run", "start"]
