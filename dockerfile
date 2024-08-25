# Usar una imagen base de Nginx
FROM nginx:alpine

# Copiar los archivos de la aplicación Angular a la carpeta predeterminada de Nginx
COPY ./dist/my-hub-semillero-mega/browser /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80