const { Schema, model } = require('mongoose');

const categoriaSchema = Schema({
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
});

//Este método sobreescrito sirve para quitar propiedades del objeto original usuario. Por ejemplo, la versión y la contraseña no la queremos en el objeto devuelto al convertirlo a JSON
categoriaSchema.methods.toJSON = function () {
    const { __v, estado, ...categoria } = this.toObject(); //Con este truco se puede eliminar claves y valores de un objeto
    return categoria;
};

module.exports = model('Categoria', categoriaSchema);
