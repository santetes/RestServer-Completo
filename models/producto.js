const { Schema, model } = require('mongoose');

const productoSchema = Schema({
    nombre: {
        type: String,
        require: [true, 'El nombre es obligatorio'],
        unique: true,
    },
    estado: {
        type: Boolean,
        default: true,
        require: [true, 'El estado es obligatorio'],
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: [true, 'El usuario es obligatorio'],
    },
    precio: {
        type: Number,
        default: 0,
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        require: [true, 'La categoria es obligatoria'],
    },
    descripcion: {
        type: String,
    },
    disponible: {
        type: Boolean,
        default: true,
    },
});

//Este método sobreescrito sirve para quitar propiedades del objeto original usuario. Por ejemplo, la versión y la contraseña no la queremos en el objeto devuelto al convertirlo a JSON
productoSchema.methods.toJSON = function () {
    const { __v, estado, ...producto } = this.toObject(); //Con este truco se puede eliminar claves y valores de un objeto
    return producto;
};

module.exports = model('Producto', productoSchema);
