using Microsoft.Practices.Unity;
using TrillionBitsPortal.ResourceTracker.DataAccess;
using TrillionBitsPortal.ResourceTracker.Interfaces;

namespace TrillionBits.ResourceTracker
{
    public class RTUnityMapper
    {
        private static IUnityContainer _container;

        public static void RegisterComponents(IUnityContainer container)
        {
            _container = container;
            
            container.RegisterType<IDepartment, DepartmentDataAccess>(new ContainerControlledLifetimeManager());
            container.RegisterType<ICompany, CompanyDataAccess>(new ContainerControlledLifetimeManager());
            container.RegisterType<IEmployee, EmployeeDataAccess>(new ContainerControlledLifetimeManager());
            container.RegisterType<INoticeBoard, NoticeBoardDataAccess>(new ContainerControlledLifetimeManager());
            container.RegisterType<IEmployeeLeave, EmployeeLeaveDataAccess>(new ContainerControlledLifetimeManager());
            container.RegisterType<IAttendance, AttendanceDataAccess>(new ContainerControlledLifetimeManager());
            container.RegisterType<IUserCredential, UserCredentialDataAccess>(new ContainerControlledLifetimeManager());
            container.RegisterType<IEmployeeTask, EmployeeTaskDataAccess>(new ContainerControlledLifetimeManager());

        }

        public static T GetInstance<T>()
        {
            try
            {
                return _container.Resolve<T>();
            }
            catch (ResolutionFailedException exception)
            {
            }
            return default(T);
        }
    }
}
