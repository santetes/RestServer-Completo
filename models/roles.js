const { Schema, model } = require('mongoose');

const roleSchema = Schema({
    role: {
        type: String,
        require: [true, 'El role es obligatorio'],
    },
});

module.exports = model('Role', roleSchema);
