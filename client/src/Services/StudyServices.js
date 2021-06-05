const StudyServices = {
    getStudies: () => {
        return {
            url: `http://localhost:8080/api/studies`
        }
    },
    createStudy: (obj) => {
        return {
            method:'post',
            url:`http://localhost:8080/api/studies`,
            data:obj
        }
    },
    updateStudy:(id, study)=>{
        return {
            method: 'put',
            url:`http://localhost:8080/api/studies/${id}`,
            data: study
        }
    },
    deleteStudy:(id)=>{
        return {
            method: 'delete',
            url: `http://localhost:8080/api/studies/${id}`
        }
    }
}

export default StudyServices