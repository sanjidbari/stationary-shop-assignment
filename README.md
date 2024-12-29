
# Stationery Shop - B4A2V5

## Overview
The Stationery Shop application is built using Express.js and TypeScript, with MongoDB as the database. It helps manage a stationery shop's products and orders. It allows users to perform CRUD operations on products and place orders, manage inventory, and calculate total revenue. The app ensures data integrity using Mongoose schema validation.

## Features

### Stationery Product Management
- **Create a Product**: Add new stationery products to the store.
- **Get All Products**: Fetch a list of all stationery products.
- **Get a Specific Product**: Retrieve detailed information about a specific product by ID.
- **Update a Product**: Modify an existing product's details (price, quantity).
- **Delete a Product**: Remove a product from the store.

### Order Management
- **Place an Order**: Create orders for customers by specifying product, quantity, and total price.
- **Inventory Management**: Automatically reduces the product quantity when an order is placed. If stock reaches zero, the product is marked as out of stock.
- **Revenue Calculation**: Calculate the total revenue generated from all orders using MongoDB aggregation.

## Project Setup

### Prerequisites
- Node.js (v16 or later)
- MongoDB (either local installation or cloud-based instance like MongoDB Atlas)
- TypeScript (for better development experience)

### 1. Clone the Repository
```bash
git clone https://github.com/sanjidbari/stationary-shop-assignment.git
```

### 2. Install Dependencies
Navigate to the project directory and run:
```bash
cd stationery-shop
npm install
```

### 3. Set Up MongoDB
Ensure you have a running MongoDB instance. If you're using MongoDB Atlas, create a cluster and obtain the connection URI.

Create a `.env` file in the root of the project and add your MongoDB URI:
```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/stationery-shop?retryWrites=true&w=majority  # Or your MongoDB Atlas URI
PORT=5000  # You can change the port if needed
```

### 4. Start the Application
Once the dependencies are installed and MongoDB is connected, you can start the application:
```bash
npm run dev
```
This will start the server in development mode. The API will be accessible at `http://localhost:5000`.

## API Endpoints

### 1. Create a Stationery Product
**Endpoint**: `POST /api/products`  
**Request Body**:
```json
{
  "name": "Notebook",
  "brand": "Moleskine",
  "price": 15,
  "category": "Office Supplies",
  "description": "A high-quality notebook for professionals.",
  "quantity": 200,
  "inStock": true
}
```
**Response**:
```json
{
  "message": "Product created successfully",
  "success": true,
  "data": {
    "_id": "648a45e5f0123c45678d9012",
    "name": "Notebook",
    "brand": "Moleskine",
    "price": 15,
    "category": "Office Supplies",
    "description": "A high-quality notebook for professionals.",
    "quantity": 200,
    "inStock": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z"
  }
}
```

### 2. Get All Stationery Products
**Endpoint**: `GET /api/products`  
**Query Parameter**: `searchTerm` (optional) - Search products by name, brand, or category.  
**Response**:
```json
{
  "message": "Products retrieved successfully",
  "status": true,
  "data": [
    {
      "_id": "648a45e5f0123c45678d9012",
      "name": "Notebook",
      "brand": "Moleskine",
      "price": 15,
      "category": "Office Supplies",
      "description": "A high-quality notebook for professionals.",
      "quantity": 200,
      "inStock": true,
      "createdAt": "2024-11-19T10:23:45.123Z",
      "updatedAt": "2024-11-19T10:23:45.123Z"
    }
    // Additional products here...
  ]
}
```

### 3. Get a Specific Stationery Product
**Endpoint**: `GET /api/products/:productId`  
**Response**:
```json
{
  "message": "Product retrieved successfully",
  "status": true,
  "data": {
    "_id": "648a45e5f0123c45678d9012",
    "name": "Notebook",
    "brand": "Moleskine",
    "price": 15,
    "category": "Office Supplies",
    "description": "A high-quality notebook for professionals.",
    "quantity": 200,
    "inStock": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z"
  }
}
```

### 4. Update a Stationery Product
**Endpoint**: `PUT /api/products/:productId`  
**Request Body**:
```json
{
  "price": 18,
  "quantity": 180
}
```
**Response**:
```json
{
  "message": "Product updated successfully",
  "status": true,
  "data": {
    "_id": "648a45e5f0123c45678d9012",
    "name": "Notebook",
    "brand": "Moleskine",
    "price": 18,
    "category": "Office Supplies",
    "description": "A high-quality notebook for professionals.",
    "quantity": 180,
    "inStock": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T11:00:00.000Z"
  }
}
```

### 5. Delete a Stationery Product
**Endpoint**: `DELETE /api/products/:productId`  
**Response**:
```json
{
  "message": "Product deleted successfully",
  "status": true,
  "data": {}
}
```

### 6. Place an Order
**Endpoint**: `POST /api/orders`  
**Request Body**:
```json
{
  "email": "customer@example.com",
  "product": "648a45e5f0123c45678d9012",
  "quantity": 2,
  "totalPrice": 36
}
```
**Response**:
```json
{
  "message": "Order created successfully",
  "status": true,
  "data": {
    "_id": "648b45f5e1234b56789a6789",
    "email": "customer@example.com",
    "product": "648a45e5f0123c45678d9012",
    "quantity": 2,
    "totalPrice": 36,
    "createdAt": "2024-11-19T12:00:00.000Z",
    "updatedAt": "2024-11-19T12:00:00.000Z"
  }
}
```

### 7. Calculate Revenue from Orders
**Endpoint**: `GET /api/orders/revenue`  
**Response**:
```json
{
  "message": "Revenue calculated successfully",
  "status": true,
  "data": {
    "totalRevenue": 720
  }
}
```

## Testing the Application
For testing, you can use Postman or Insomnia to interact with the API. Ensure MongoDB is running locally or connected to an Atlas cluster. Use the provided endpoints to test product creation, order placement, and revenue calculation.

## Contribution
1. Fork this repository.
2. Create a feature branch:
```bash
git checkout -b feature/your-feature-name
```
3. Commit your changes:
```bash
git commit -am 'Add new feature'
```
4. Push to the branch:
```bash
git push origin feature/your-feature-name
```
5. Create a new Pull Request.
