import
{
    GetTrackingByUserIdAndTodayDate, GetMyTodayAttendance,
    GetMovementDetails
} from '../../../services/EmployeeTrackService';

export const getEmpInfo = async () =>
{
    try
    {
        const aItemUserId = this.props.aItem.UserId;
        await GetMyTodayAttendance(aItemUserId)
            .then(res =>
            {
                console.log(res.result, "getEmpInfo");
                this.setState({ EmployeeName: res.result.EmployeeName, });
                this.setState({ DepartmentName: res.result.DepartmentName, });
                this.setState({ Designation: res.result.Designation, });
                this.setState({ CheckInTimeVw: res.result.CheckInTimeVw, });
                this.setState({ CheckOutTimeVw: res.result.CheckOutTimeVw, });
                this.setState({ OfficeStayHour: res.result.OfficeStayHour, });
                this.setState({ IsCheckedIn: res.result.IsCheckedIn, });
                this.setState({ IsCheckedOut: res.result.IsCheckedOut, });
                this.setState({ Status: res.result.Status, });
            })
            .catch(() =>
            {
                console.log("error occured");
            });

    } catch (error)
    {
        console.log(error);
    }
}

