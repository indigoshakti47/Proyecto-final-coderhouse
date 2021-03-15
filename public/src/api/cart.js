export async function getCartApi() {
  const url = 'http://localhost:8080/api/carrito/listar/1'
  
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }

  try {
    const response = await fetch(url, params);
    if (response.status === 200){
      return response.json();
    }
    return response.text();
  } catch (err) {
    return err;
  }
}

export async function deleteCartProductApi(id) {
  const url = 'http://localhost:8080/api/carrito/borrar/' + id
  
  const params = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    }
  }

  try {
    const response = await fetch(url, params);
      return response.json();
    
  } catch (err) {
    return err;
  }
}
export async function addCartProductApi(id) {
  const url = 'http://localhost:8080/api/carrito/agregar/' + id
  
  const params = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    }
  }

  try {
    const response = await fetch(url, params);
      return response.json();
    
  } catch (err) {
    return err;
  }
}