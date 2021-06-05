import {
    Box,
    IconButton,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    withStyles,
  } from "@material-ui/core";
  import { blue, indigo } from "@material-ui/core/colors";
  import React, { useEffect, useState } from "react";
  import StudyServices from "../Services/StudyServices";
  import useFetch from "../Components/useFetch";
  import Modal from "../Components/Modal";
  import PatientForm from "./PatientForm";
  import moment from "moment";
  import ButtonControl from "../Components/Controls/ButtonControl";
  import { Add, Delete, Edit } from "@material-ui/icons";
  import axios from "axios";
  import ConfirmDialog from "../Components/ConfirmDialog";
import StudyForm from "./StudyForm";
  

/**
* @author
* @function Study
**/

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: indigo[800],
      color: theme.palette.getContrastText(indigo[800]),
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  
  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });

const Study = (props) => {
    const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [response, error, isLoading] = useFetch(
    StudyServices.getStudies()
  );

  const [openModal, setOpenModal] = useState(false)
  const [formTitle, setFormTitle] = useState('New Study')
  const [rowForEdit, setRowForEdit] = useState()
  const [errMsg, setErrMsg] = useState()

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
  })

  useEffect(() => {
    if (!isLoading) {      
      setRows(response.map(study=>{return {...study, patientId:study.patient.patientId}}))      
    }
  }, [isLoading, response]);

  const updateRows = (newRow, deleted = false) => {
    if (deleted) {
      setRows(rows.filter((row) => row.id !== newRow.id))
    } else if (rows.filter((item) => item.id === newRow.id).length === 0) {     
      setRows([newRow, ...rows])
    } else {
      setRows((state) => {
        return rows.map((row) => {
          if (row.id === newRow.id) {
            return { ...newRow }
          }
          return row
        }).sort((a,b)=> {
          console.log(a, b)
          return moment(b.lastModifiedDate) - moment(a.lastModifiedDate)
        })
      })
    }
  }

  const confirmDelete = (item) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Are you sure to delete the study?',
      subTitle: "You can't undo this operation",
      onConfirm: () => onDelete(item),
    })
  }

  const onDelete = (item) => {
    setConfirmDialog({ ...confirmDialog, isOpen: false })    
    axios(StudyServices.deleteStudy(item.id))
      .then((res) => {
        if (res.status === 200) {          
          updateRows(item, true)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const addNewRow = () => {
    setFormTitle('New Study')
    setRowForEdit(null)
    setErrMsg(null)
    setOpenModal(true)
  }

  const openForEdit = (item) => {
    setRowForEdit(item)
    setFormTitle('Edit Study')
    setErrMsg(null)
    setOpenModal(true)
  }

  const addOrEdit = (row, resetForm) => {    
    let service = StudyServices.updateStudy(row.id, row)
    if (row.id === 0) {
      service = StudyServices.createStudy(row)      
    }
    axios(service)
      .then((res) => {
        console.log(res)
        if (res.status === 200) {               
          const newRow = res.data
          newRow.patientId = newRow.patient.patientId             
          updateRows(newRow)
          setRowForEdit(null)
          resetForm()
          setOpenModal(false)
        }
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        setErrMsg(resMessage)
      })
  }
  return(
    <>
      <Typography variant='h6'>
        Study
      </Typography>
      <Modal openModal={openModal} setOpenModal={setOpenModal}>
        <StudyForm
          title={formTitle}
          addOrEdit={addOrEdit}
          errMsg={errMsg}
          rowForEdit={rowForEdit}
        />
      </Modal>
      
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left" />
              <StyledTableCell align="left" >Person Code</StyledTableCell>
              <StyledTableCell align="left" >Full Name</StyledTableCell>              
              <StyledTableCell align="left" >Date of Birth</StyledTableCell>
              <StyledTableCell align="left" >Study</StyledTableCell>
              <StyledTableCell align="left" >Last Modified Datetime</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row,i) => (
              <StyledTableRow key={i}>
                <StyledTableCell align="left"  scope="row">
                  <IconButton
                      aria-label="edit"
                      onClick={() =>
                        openForEdit(row)
                      }
                      title="Edit"
                    >
                      <Edit htmlColor={blue['A400']} />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() =>
                        confirmDelete(row)
                      }
                      title="Delete"
                    >
                      <Delete color="secondary" />
                    </IconButton>
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.patient.patientId}
                </StyledTableCell>
                <StyledTableCell align="left" >{row.patient.firstName} {row.patient.lastName}</StyledTableCell>                
                <StyledTableCell align="left" >
                  {moment(row.patient.dateOfBirth).format('DD MMM, YYYY')}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {moment(row.lastModifiedDate).format('DD MMM, YYYY HH:mm')}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box m={2} style={{ display: 'flex', justifyContent: 'space-between' }}>
        <ButtonControl
          text="Create New"
          onClick={addNewRow}
          startIcon={<Add />}
        />
      </Box>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
   )

 }

export default Study