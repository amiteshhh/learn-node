export let userController = {
    findAll: findAll,
}

function findAll(req, res) {
    res.json([{ id: 1, name: 'Amitesh kumar' }]);
}

