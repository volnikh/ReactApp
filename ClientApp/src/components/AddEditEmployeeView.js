export default function AddEditEmployeeView(handleChange) {
    return (
        <>
            <form className="form-horizontal" ref={formRef}>
                <div className="form-group">
                    <div className="col-sm-10">
                        <input type="hidden" name="employee-id"/>
                        <label htmlFor="employee-first-name">First name</label>
                        <input type="string" className="form-control" name="firstName" id="employee-first-name" onChange={handleChange} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-10">
                        <label htmlFor="employee-last-name">Last name</label>
                        <input type="string" className="form-control" name="lastName" id="employee-last-name" onChange={handleChange} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-10">
                        <label htmlFor="employee-patronymic">Patronymic(optional)</label>
                        <input type="string" className="form-control" name="patronymic" id="employee-patronymic" onChange={handleChange} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-10">
                        <label htmlFor="employee-birth-date">Birth date </label>
                        <input type="date" className="form-control" name="birthDate" id="employee-birth-date" onChange={handleChange} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-10">
                        <label htmlFor="employee-email">Email address</label>
                        <input type="email" className="form-control" nam="email" id="employee-email" onChange={handleChange} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-10">
                        <label htmlFor="employee-salary">Salary</label>
                        <input type="number" className="form-control" name="salary" id="employee-salary" onChange={handleChange} />
                    </div>
                </div>
            </form>
            <button type="button" className="btn btn-primary me-2" onClick={saveEmployee}>Save</button>
            <button type="button" className="btn btn-primary" onClick={handleCancleClick}>Cancel</button>
        </>
    )
}