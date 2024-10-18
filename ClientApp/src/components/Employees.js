import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EMPLOYEE_GRID_FILTER_KEY = "employee-grid-filter";

export default function Employees() {
    const navigate = useNavigate();
    const [filter, setFilter] = useState(() => {
        const filter = localStorage.getItem(EMPLOYEE_GRID_FILTER_KEY);
        if (!filter) {
            return {}
        }
        return JSON.parse(filter);
    });
    const [tempFilter, setTempFilter] = useState(() => {
        const data = localStorage.getItem(EMPLOYEE_GRID_FILTER_KEY);
        if (!data) {
            return {}
        }
        return JSON.parse(data);
    });

    const [employees, setData] = useState([]);

    const handleFilterChange = (e) => {
        setTempFilter((prev) => {
            return {
                ...tempFilter,
                [e.target.name]: e.target.value
            };
        });
    };

    const handleFilterKeyPress = (e) => {
        if (e.key === "Enter") {
            setFilter(tempFilter);
            localStorage.setItem(EMPLOYEE_GRID_FILTER_KEY, JSON.stringify(filter));
        }
    };

    const fetchData = useCallback(() => {
        async function Fetch() {
            const { _timestamp, ...filterToSend } = filter;
            var query = new URLSearchParams(filterToSend).toString();
            const response = await fetch(`/Employee?${query}`, {
                method: "GET"
            });
            const data = await response.json();
            setData(data);
        }
        Fetch()
    }, [filter]);

    useEffect(() => {
        fetchData()
    }, [fetchData]);

    function handleAddEmployeeClick() {
        navigate("employee");
    }

    function handleEditClick(id) {
        navigate(`employee/${id}`)
    }

    async function handleDeleteClick(id) {
        try {
            const result = await fetch(`/Employee/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(result.status);
            if (result.status === 200) {
                setFilter((prev) => {
                    return {
                        ...prev,
                        _timstamp: Date.now()
                    }
                })
            }
            else {
                console.log("Failed to delete employee!");
            }
        }
        catch (error) {

        }
    }

    function handleSortClick(e) {
        e.stopPropagation();
        const sortBy = e.target.getAttribute("name");
        const newFilter = { ...filter }
        if (filter.hasOwnProperty("sortBy") && sortBy === filter.sortBy) {
            if (newFilter.sortDirection === "ASC")
                newFilter.sortDirection = "DESC";
            else
                newFilter.sortDirection = "ASC";
        }
        else {
            newFilter.sortBy = sortBy;
            newFilter.sortDirection = "ASC";
        }

        setFilter(newFilter);
    }

    return (
        <>
            <button id="add-employee" onClick={handleAddEmployeeClick}>Add</button>
            <table className='table table-striped' aria-labelledby="tabelLabel" style={{ whiteSpace: "nowrap" }}>
                <thead>
                    <tr onClick={handleSortClick}>
                        <th name="id">Id</th>
                        <th name="firstName">First name</th>
                        <th name="lastName">Last name</th>
                        <th name="patronymic">Patronymic</th>
                        <th name="birthDate" >Birth date</th>
                        <th name="email" >E-mail</th>
                        <th name="salary">Salary</th>
                        <th name="lastModifyDate" >Last modify date</th>
                    </tr>
                    <tr>
                        <th>
                            <input id="id-filter" type="number" name="id" value={tempFilter.id} onChange={handleFilterChange} onKeyDown={handleFilterKeyPress} />
                        </th>
                        <th>
                            <input id="firstname-filter" type="text" name="firstName" value={tempFilter.firstName} onChange={handleFilterChange} onKeyDown={handleFilterKeyPress} />
                        </th>
                        <th>
                            <input id="lastname-filter" type="text" name="lastName" value={tempFilter.lastName} onChange={handleFilterChange} onKeyDown={handleFilterKeyPress} />
                        </th>
                        <th>
                            <input id="patronymic-filter" type="text" name="patronymic" value={tempFilter.patronymic} onChange={handleFilterChange} onKeyDown={handleFilterKeyPress} />
                        </th>
                        <th>
                            <input id="birthdate-from-filter" type="date" name="birthDateFrom" value={tempFilter.birthDateFrom} onChange={handleFilterChange} onKeyDown={handleFilterKeyPress} />
                            <input id="birthdate-to-filter" type="date" name="birthDateTo" value={tempFilter.birthDateTo} onChange={handleFilterChange} onKeyDown={handleFilterKeyPress} />
                        </th>
                        <th>
                            <input id="email-filter" type="text" name="email" value={tempFilter.email} onChange={handleFilterChange} onKeyDown={handleFilterKeyPress} />
                        </th>
                        <th>
                            <input id="salary-from-filter" type="number" name="salaryFrom" value={tempFilter.salaryFrom} onChange={handleFilterChange} onKeyDown={handleFilterKeyPress} />
                            <input id="salary-to-filter" type="number" name="salaryTo" value={tempFilter.salaryTo} onChange={handleFilterChange} onKeyDown={handleFilterKeyPress} />
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee =>
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.patronymic}</td>
                            <td>{new Date(employee.birthDate).toLocaleDateString()}</td>
                            <td>{employee.email}</td>
                            <td>{employee.salary}</td>
                            <td>{employee.lastModifyDate}</td>
                            <td>
                                <button onClick={() => handleEditClick(employee.id)}>Edit</button>
                                <button onClick={() => handleDeleteClick(employee.id)}>Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
}
