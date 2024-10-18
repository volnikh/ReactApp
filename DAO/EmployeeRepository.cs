using DAO.Entities;
using Microsoft.EntityFrameworkCore;

namespace DAO
{
    public interface IEmployeeRepository
    {
        Task<Employee?> Get(int id);

        Task<IEnumerable<Employee>> Search(int? id, string? firstName, string? lastName, string? patronymic,
            DateTime? birthDateFrom, DateTime? birthDateTo, string? email, decimal? salaryFrom, decimal? salaryTo,
            string? sortBy, string? sortDirection);

        int Insert(Employee employee);
        void Update(Employee employee);
        Task Delete(int id);

        Task<int> Commit();
    }

    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly AppDBContext _dbContext;

        public EmployeeRepository(AppDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Task<int> Commit()
        {
            return _dbContext.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            await _dbContext.Employees.Where(x => x.Id == id).ExecuteDeleteAsync();
        }

        public async Task<Employee?> Get(int id)
        {
            return await _dbContext.Employees.FirstAsync(x => x.Id == id);
        }

        public int Insert(Employee employee)
        {
            _dbContext.Add(employee);
            return employee.Id;
        }

        public async Task<IEnumerable<Employee>> Search(int? id, string? firstName, string? lastName, string? patronymic,
            DateTime? birthDateFrom, DateTime? birthDateTo, string? email, decimal? salaryFrom, decimal? salaryTo,
            string? sortBy, string? sortDirection)
        {
            var result = _dbContext.Employees as IQueryable<Employee>;
            if (id != null)
                result = result.Where(x => x.Id == id);

            if (firstName != null)
                result = result.Where(x => x.FirstName.StartsWith(firstName));

            if (lastName != null)
                result = result.Where(x => x.LastName.StartsWith(lastName));

            if (patronymic != null)
                result = result.Where(x => x.Patronymic.StartsWith(patronymic));

            if (birthDateFrom != null)
                result = result.Where(x => x.BirthDate >= birthDateFrom);

            if (birthDateTo != null)
                result = result.Where(x => x.BirthDate <= birthDateTo);

            if (email != null)
                result = result.Where(x => x.Email.StartsWith(email));

            if (salaryFrom != null)
                result = result.Where(x => x.Salary >= salaryFrom);

            if (salaryTo != null)
                result = result.Where(x => x.Salary <= salaryTo);

            if (!string.IsNullOrEmpty(sortBy))
            {
                result = Sort(result, sortBy, string.IsNullOrEmpty(sortDirection) ? "ASC" : sortDirection);
            }

            return await result.ToListAsync();
        }

        public void Update(Employee employee)
        {
            _dbContext.Attach(employee);
            _dbContext.Entry(employee).State = EntityState.Modified;
        }

        private IQueryable<Employee> Sort(IQueryable<Employee> query, string column, string direction)
        {
            const string asc = "ASC";
            const string desc = "DESC";
            string[] availableDirection = [asc, desc];
            var uppreDirection = direction.ToUpper();
            if (!availableDirection.Contains(uppreDirection))
                return query;

            switch (column.ToUpper())
            {
                case "ID":
                    query = direction == asc ? query.OrderBy(x => x.Id) : query.OrderByDescending(x => x.Id);
                    break;
                case "FIRSTNAME":
                    query = direction == asc ? query.OrderBy(x => x.FirstName) : query.OrderByDescending(x => x.FirstName);
                    break;
                case "LASTNAME":
                    query = direction == asc ? query.OrderBy(x => x.LastName) : query.OrderByDescending(x => x.LastName);
                    break;
                case "PATRONYMIC":
                    query = direction == asc ? query.OrderBy(x => x.Patronymic) : query.OrderByDescending(x => x.Patronymic);
                    break;
                case "BIRTHDATE":
                    query = direction == asc ? query.OrderBy(x => x.BirthDate) : query.OrderByDescending(x => x.BirthDate);
                    break;
                case "EMAIL":
                    query = direction == asc ? query.OrderBy(x => x.Email) : query.OrderByDescending(x => x.Email);
                    break;
                case "SALARY":
                    query = direction == asc ? query.OrderBy(x => x.Salary) : query.OrderByDescending(x => x.Salary);
                    break;
                case "LASTMODIFYDATE":
                    query = direction == asc ? query.OrderBy(x => x.LastModifyDate) : query.OrderByDescending(x => x.LastModifyDate);
                    break;
                default:
                    break;
            }

            return query;
        }
    }
}