using DAO;
using Microsoft.AspNetCore.Mvc;


[ApiController]
[Route("[controller]")]
public class EmployeeController : ControllerBase
{
    private readonly ILogger<EmployeeController> _logger;
    private readonly IEmployeeRepository _repository;

    public EmployeeController(ILogger<EmployeeController> logger, IEmployeeRepository repository)
    {
        _logger = logger;
        _repository = repository;
    }

    [HttpGet]
    public async Task<IEnumerable<EmployeeVM>> Get([FromQuery] EmployeeFilteer filter)
    {
        var employees = await _repository.Search(filter.Id,
            filter.FirstName, filter.LastName, filter.Patronymic,
            filter.BirthDateFrom, filter.BirthDateTo, filter.Email,
            filter.SalaryFrom, filter.SalaryTo, filter.SortBy, filter.SortDirection);
        return employees.Select(x => x.ToVm());
    }

    [HttpGet("{id}")]
    public async Task<EmployeeVM?> Get([FromRoute] int id)
    {
        var employee = await _repository.Get(id);
        if (employee == null)
            return null;

        return employee.ToVm();
    }

    [HttpPost]
    public async Task<ActionResult<EmployeeVM>> Insert([FromBody] EmployeeVM employee)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var dto = employee.ToDto();
        _repository.Insert(dto);
        await _repository.Commit();
        return Ok(dto);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<EmployeeVM>> Update([FromRoute] int id, [FromBody] EmployeeVM employee)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var dto = employee.ToDto();
        _repository.Update(dto);
        await _repository.Commit();
        return Ok(dto);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<EmployeeVM>> Delete([FromRoute] int id)
    {
        await _repository.Delete(id);
        return Ok();
    }
}