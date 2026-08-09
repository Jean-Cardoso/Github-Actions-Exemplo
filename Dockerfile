# Imagem do nginx que serve o site estático
FROM nginx:alpine

# Copia o site (pasta src/) para o diretório servido pelo nginx
COPY src/ /usr/share/nginx/html/
