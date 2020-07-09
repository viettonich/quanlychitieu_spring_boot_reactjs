import axios from 'axios'
const BASE_API_URL = 'http://localhost:8080'
const CONSUMPTION_API_URL = `${BASE_API_URL}/api/consumptions`

class ConsumptionService {

    retrieveAllConsumption() {
        //console.log('executed service')
        return axios.get(`${CONSUMPTION_API_URL}`);
    }

    retrieveConsumption(id) {
        //console.log('executed service')
        return axios.get(`${CONSUMPTION_API_URL}/${id}`);
    }

    findByDate(date) {
        //console.log('executed service')
        return axios.get(`${CONSUMPTION_API_URL}/date-create/${date}`);
    }

    findByMonth(year, month) {
        //console.log('executed service')
        return axios.get(`${CONSUMPTION_API_URL}/date-create?year=${year}&month=${month}`);
    }

    totalAmount(year, month) {
        //console.log('executed service')
        return axios.get(`${CONSUMPTION_API_URL}/total-amount?year=${year}&month=${month}`);
    }

    deleteConsumption(id) {
        //console.log('executed service')
        return axios.delete(`${CONSUMPTION_API_URL}/${id}`);
    }

    updateConsumption(id, consumption) {
        //console.log('executed service')
        return axios.put(`${CONSUMPTION_API_URL}/${id}`, consumption);
    }

    createConsumption(consumption) {
        //console.log('executed service')
        return axios.post(`${CONSUMPTION_API_URL}/`, consumption);
    }

    statisticAmountDayInMonth(){
        return axios.get(`${CONSUMPTION_API_URL}/report`);
    }
}

export default new ConsumptionService()