import { makeStyles, Typography } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useEffect, useState } from "react";
import { Form, useForm } from "../Components/useForm";
import InputControl from "../Components/Controls/InputControl";
import DatePickerControl from "../Components/Controls/DatePickerControl";
import ButtonControl from "../Components/Controls/ButtonControl";
import useFetch from "../Components/useFetch";
import PatientServices from "../Services/PatientServices";

/**
 * @author
 * @function StudyForm
 **/

const useStyles = makeStyles((theme) => ({
  header: {
    padding: theme.spacing(1),
  },
  content: {
    paddingTop: theme.spacing(1),
  },
  alert: {
    fontSize: "1rem",
  },
  alertDanger: {
    color: "red",
  },
}));

const initialFValues = {
  id: 0,
  name: "",
  description: "",
  patientId: "",
};

const StudyForm = (props) => {
  const classes = useStyles();
  const { title, addOrEdit, errMsg = null, rowForEdit } = props;
  const [response, , isLoading] = useFetch(PatientServices.getAllPatients());
  const [patients, setPatients] = useState([]);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("name" in fieldValues) {
      temp.name = fieldValues.name ? "" : "This field is required";
    }
    if ("description" in fieldValues) {
      temp.description =
        fieldValues.description.length > 200 ? "Maximum limit 200 character" : "";
    }
    if ("patientId" in fieldValues) {   
      temp.patientId = fieldValues.patientId ? patients.findIndex(i=>i.patientId===fieldValues.patientId) > -1 ? "" : "Patient ID is not valid" : "This field is required";
    }
    setErrors({ ...temp });

    if (fieldValues === values) {
      return Object.values(temp).every((x) => x === "");
    }
  };

  const { values, setValues, handleInputChange, errors, setErrors, resetForm } =
    useForm(initialFValues, true, validate);

  useEffect(() => {
    if (!isLoading && response) {
      setPatients(response);
    }
  }, [response, isLoading]);

  useEffect(() => {
    if (rowForEdit) {
      console.log(rowForEdit)
      setValues(rowForEdit);
    }
  }, [rowForEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addOrEdit(values, resetForm);
    }
  };

  return (
    <div>
      <div className={classes.header}>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
      </div>
      <hr></hr>
      <div className={classes.content}>
        <Form onSubmit={handleSubmit}>
          <InputControl
            name="name"
            label="Name"
            value={values.name}
            onChange={handleInputChange}
            error={errors.name}            
          />
          <InputControl
            name="description"
            label="Description"
            value={values.description}
            onChange={handleInputChange}
            error={errors.description}
          />
          <Autocomplete
            id="patientId"
            options={patients.map((item) => item.patientId)}
            onChange={(e,v)=>{handleInputChange({target:{name:'patientId', value:v}})}}
            value={values.patientId}
            renderInput={(params) => (
              <InputControl
                {...params} 
                name="patientId"
                label="Person Code"
                value={values.patientId}
                onChange={handleInputChange}
                error={errors.patientId}
              />
            )}
          />

          <div>
            <ButtonControl type="submit" text="Submit" />
            {!rowForEdit && (
              <ButtonControl text="Reset" color="default" onClick={resetForm} />
            )}
          </div>
        </Form>
        {errMsg && (
          <div className="form-group">
            <div
              className={`${classes.alert} ${classes.alertDanger}`}
              role="alert"
            >
              Error: {errMsg}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyForm;
