import axios from 'axios'
const BASE_API_URL = 'http://localhost:8080'
const CATEGORY_API_URL = `${BASE_API_URL}/api/categories`

class CategoryService {

    retrieveAllCategory() {
        //console.log('executed service')
        return axios.get(`${CATEGORY_API_URL}`);
    }

    retrieveCategory(id) {
        //console.log('executed service')
        return axios.get(`${CATEGORY_API_URL}/${id}`);
    }

    deleteCategory(id) {
        //console.log('executed service')
        return axios.delete(`${CATEGORY_API_URL}/${id}`);
    }

    updateCategory(id, category) {
        //console.log('executed service')
        return axios.put(`${CATEGORY_API_URL}/${id}`, category);
    }

    createCategory(category) {
        //console.log('executed service')
        return axios.post(`${CATEGORY_API_URL}/`, category);
    }
}

export default new CategoryService()