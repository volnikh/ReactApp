import React, { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

export const ADD_MODE = "Add";
export const EDIT_MODE = "Edit";

export default function AddEmployee({ mode, method }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [employee, setData] = useState({});

    const formRef = new useRef();
    useEffect(() => {
        const fetchData = async () => {
            if (mode === ADD_MODE)
                return {};

            const response = await fetch(`/Employee/${id}`);
            const result = await response.json();
            result.birthDate = result.birthDate.split("T")[0];
            setData(result);
        }
        fetchData();
    }, [id, mode]);


    const handleChange = (e) => {
        setData((prev) => {
            return {
                ...employee,
                [e.target.name]: e.target.value
            }
        });
    };

    const saveEmployee = async function () {
        try {

            const url = mode === ADD_MODE ? "/Employee" : `/Employee/${employee.id}`;
            const result = await fetch(url,
                {
                    method: method,
                    body: JSON.stringify(employee),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (result.status === 200) {
                //reseting form inputs to make it possible to add several employee wihtout cleaning form manually
                formRef.current.reset();
                navigate("/")
            }
            else if (result.status === "400") {

            }
            else {
                console.log("Failed to add new employee with!");
            }
        }
        catch (error) {
        }
    };

    const handleCancleClick = function () {
        navigate("/employees")
    };

    return (
        <>
            <form className="form-horizontal" ref={formRef}>
                <div className="form-group">
                    <div className="col-sm-10">
                        <label htmlFor="employee-first-name">First name</label>
                        <input type="string" className="form-control" name="firstName" id="employee-first-name" onChange={handleChange} defaultValue={employee.firstName} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-10">
                        <label htmlFor="employee-last-name">Last name</label>
                        <input type="string" className="form-control" name="lastName" id="employee-last-name" onChange={handleChange} defaultValue={employee.lastName} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-10">
                        <label htmlFor="employee-patronymic">Patronymic(optional)</label>
                        <input type="string" className="form-control" name="patronymic" id="employee-patronymic" onChange={handleChange} defaultValue={employee.patronymic} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-10">
                        <label htmlFor="employee-birth-date">Birth date </label>
                        <input type="date" className="form-control" name="birthDate" id="employee-birth-date" onChange={handleChange} defaultValue={employee.birthDate} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-10">
                        <label htmlFor="employee-email">Email address</label>
                        <input type="email" className="form-control" name="email" id="employee-email" onChange={handleChange} defaultValue={employee.email} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-10">
                        <label htmlFor="employee-salary">Salary</label>
                        <input type="number" className="form-control" name="salary" id="employee-salary" onChange={handleChange} defaultValue={employee.salary} />
                    </div>
                </div>
            </form>
            <button type="button" className="btn btn-primary me-2" onClick={saveEmployee}>Save</button>
            <button type="button" className="btn btn-primary" onClick={handleCancleClick}>Cancel</button>
        </>
    )
}