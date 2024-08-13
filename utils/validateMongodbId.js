const mongoose = require('mongoose');
const validateMongoDbId = (id => {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid) throw new Error('Essse ID não é valido ou não existe!')
});

module.exports = validateMongoDbId;