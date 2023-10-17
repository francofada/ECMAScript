class ProductManager {
    constructor() {
        this.products = [];
        this.productIdCounter = 1;
    }

    addProduct(product) {
        if (this.isProductValid(product)) {
            product.id = this.productIdCounter++;
            this.products.push(product);
            console.log("Producto agregado con éxito.");
        }
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find((p) => p.id === id);
        if (product) {
            return product;
        } else {
            console.error("Producto no encontrado");
        }
    }

    isProductValid(product) {
        const { title, description, price, thumbnail, code, stock } = product;
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error("Todos los campos son obligatorios.");
            return false;
        }

        if (this.products.some((p) => p.code === code)) {
            console.error("El campo 'code' ya existe en otro producto.");
            return false;
        }

        return true;
    }
}

const manager = new ProductManager();
const productForm = document.getElementById("productForm");
const productTable = document.getElementById("productTable");

function addProduct() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const price = parseFloat(document.getElementById("price").value);
    const thumbnail = document.getElementById("thumbnail").value;
    const code = document.getElementById("code").value;
    const stock = parseInt(document.getElementById("stock").value);

    const product = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
    };

    manager.addProduct(product);
    updateProductTable();
    productForm.reset();
}

function updateProductTable() {
    const products = manager.getProducts();
    const tbody = productTable.querySelector("tbody");
    tbody.innerHTML = "";

    products.forEach((product) => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${product.id}</td>
        <td>${product.title}</td>
        <td>${product.description}</td>
        <td>${product.price}</td>
        <td>${product.thumbnail}</td>
        <td>${product.code}</td>
        <td>${product.stock}</td>
        `;
        tbody.appendChild(row);
    });
}