// ../services/API.js

const BASE_URL = 'http://localhost:3001';

export async function postLogin(email, password) {
    const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    return data;
}

export async function postRegister(name, email, password) {
    const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
    });
    const data = await response.json();
    return data;
}

export async function postAddProduct(formData) {
    const response = await fetch(`${BASE_URL}/addProduct`, {
        method: 'POST',
        body: formData, // Note: No need to set headers for FormData
    });
    const data = await response.json();
    return data;
}

export async function getProducts(shopOwnerId) {
    const response = await fetch(`${BASE_URL}/products?shopOwnerId=${shopOwnerId}`, {
        method: 'GET',
    });
    const data = await response.json();
    return data;
}
export async function getALLProducts() {
    const response = await fetch(`${BASE_URL}/productsall`, {
        method: 'GET',
    });
    const data = await response.json();
    return data;
}




export async function getProductById(id) {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
        method: 'GET',
    });
    const data = await response.json();
    return data;
}

export async function postPurchaseProduct(purchaseData) {
    const response = await fetch(`${BASE_URL}/purchaseProduct`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(purchaseData),
    });
    const data = await response.json();
    return data;
}
export async function updateProduct(id, formData) {
    const response = await fetch(`${BASE_URL}/updateProduct/${id}`, {
        method: 'PUT',
        body: formData,
    });
    const data = await response.json();
    return data;
}
export async function getTransactions() {
    const response = await fetch(`${BASE_URL}/transactions`, {
        method: 'GET',
    });
    const data = await response.json();
    return data;
}
export async function getCountProducts() {
    const response = await fetch(`${BASE_URL}/countProducts`, {
        method: 'GET',
    });
    const data = await response.json();
    return data;
}
export async function deleteProduct(id) {
    const response = await fetch(`${BASE_URL}/deleteProduct/${id}`, {
        method: 'DELETE',
    });
    const data = await response.json();
    return data;
}
export async function getCountTransactionsByUser(userId) {
    const response = await fetch(`${BASE_URL}/countTransactionsByUser/${userId}`, {
        method: 'GET',
    });
    const data = await response.json();
    return data;
}

export async function getCountClaimsByUser(userId) {
    const response = await fetch(`${BASE_URL}/countClaimsByUser/${userId}`, {
        method: 'GET',
    });
    const data = await response.json();
    return data;
}
export async function postAddInsuranceContract(insuranceData) {
    const response = await fetch(`${BASE_URL}/addInsuranceContract`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(insuranceData),
    });
    const data = await response.json();
    return data;
}
export async function createInsuranceContractType(contractData) {
    const response = await fetch(`${BASE_URL}/createInsuranceContractType`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contractData),
    });
    const data = await response.json();
    return data;
}

export async function getInsuranceContractTypes(userID) {
    const response = await fetch(`${BASE_URL}/getInsuranceContractTypes`, {
        method: 'GET',
    });
    const data = await response.json();
    return data;
}
export async function getPurchasedProducts(userID) {
    const response = await fetch(`${BASE_URL}/purchasedProducts/${userID}`, {
        method: 'GET',
    });
    const data = await response.json();
    return data;
}

export async function submitClaim(claimData) {
    const response = await fetch(`${BASE_URL}/submitClaim`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(claimData),
    });
    const data = await response.json();
    return data;
}
export async function getClaims(userID) {
    const response = await fetch(`${BASE_URL}/claims/${userID}`, {
        method: 'GET',
    });
    const data = await response.json();
    return data;
}
export async function getTransactionsByShopOwner(shopOwnerId) {
    const response = await fetch(`${BASE_URL}/transactionsByShopOwner/${shopOwnerId}`, {
        method: 'GET',
    });
    const data = await response.json();
    return data;
}