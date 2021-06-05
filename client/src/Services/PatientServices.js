const PatientServices = {
    getAllPatients: () => {
        return {
            url:`http://localhost:8080/api/patients`
        }
    },
    createPatient:(obj)=>{
        return {
            method:'post',
            url:`http://localhost:8080/api/patients`,
            data:obj
        }
    },
    updatePatient:(id, patient)=>{
        return {
            method: 'put',
            url:`http://localhost:8080/api/patients/${id}`,
            data: patient
        }
    },
    deletePatient:(id)=>{
        return {
            method: 'delete',
            url: `http://localhost:8080/api/patients/${id}`
        }
    }
}

export default PatientServices