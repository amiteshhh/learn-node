export let productController = {
    findAll: findAll,
    findOne: findOne,
    findAllReviews: findAllReviews,
    insertOne: insertOne,
}

let products = [{ id: 1, name: 'es8' }, { id: 2, name: 'Babel' }];
let reviews = [{ id: 1, productId: 1, reviews: ['Sample Review 1', 'Sample Review 2'] }];//sample review would be complex object in real scenario

function findAll(req, res) {
    res.json(products);
}

function findOne(req, res) {
    let id = Number(req.params.id);
    let product = products.find(item => item.id === id);
    res.json(product || null);
}

function findAllReviews(req, res) {
    let id = Number(req.params.id);
    let productReview = reviews.find(review => review.productId === id);
    res.json(productReview ? productReview.reviews : null);
}

function insertOne(req, res) {
    let product = req.body;
    product.id = Date.now();//for demo only
    products.push(product);
    res.json(product);
}