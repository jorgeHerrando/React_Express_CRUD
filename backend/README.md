---
# Proyecto backend para iboo agency
---

Para empezar a usarlo:

# Instalar dependencias:

    npm i

# Abrir DB en el puerto 8889 0 3306

    cambiar puerto en archivo config/config.json
    crear DB con el nombre de DB, nombre usuario y contraseña detallados en config/config.json

# Migrar la DB

    npx sequelize db:migrate

# Poblar la DB para empezar con algo de data

    npx sequelize-cli db:seed:all

# Levantar el puerto

    npm run dev
