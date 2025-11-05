import api from "../api/axiosIntercepter"
const getProductById = async   (id)=> {
    return await api.get(`/products/${id}`).then((res) => res.data);
}

const getAllProducts = async () => {
    return await api.get('/products').then((res) => res.data);
}
export  {getAllProducts , getProductById};