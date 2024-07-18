import { ADMIN_SECRET_PASSWORD } from '../config/config.js';
import bcryptHelper from '../helpers/bcrypt/bcrypt.helper.js';
import { Categoria, Producto, Usuario } from '../lib/connection.js';
import { categorias } from '../mocks/data.js';

export const loadUserAdmin = async () => {
  try {
    const users = await Usuario.findAll({});
    if (users.length === 0) {
      const passwordHashed = await bcryptHelper.hashPassword(
        ADMIN_SECRET_PASSWORD
      );
      await Usuario.create({
        nombre: 'Leyn',
        apellido: 'Barrera',
        sexo: 'male',
        rol: 'admin',
        email: 'nyellove1998@gmail.com',
        contraseña: passwordHashed,
        cedula: '0952577393',
        fecha_nacimiento: '05/11/1998',
      });
    }

    const categorriesDB = await Categoria.findAll({});
    if (categorriesDB.length === 0) {
      for (let categoria of categorias) {
        const { productos, ...currentCategoria } = categoria;
        const newCategory = await Categoria.create(currentCategoria);
        if (productos) {
          for (let producto of productos) {
            await Producto.create({
              ...producto,
              CategoryId: newCategory.id,
            });
          }
        }
      }
    }
  } catch (error) {
    console.log(error.message);
    throw new Error('Error al guardar usuario');
  }
};
