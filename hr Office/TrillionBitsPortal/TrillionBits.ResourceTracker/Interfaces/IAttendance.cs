using TrillionBitsPortal.Common.Models;
using System;
using System.Collections.Generic;
using TrillionBitsPortal.ResourceTracker.Models;

namespace TrillionBitsPortal.ResourceTracker.Interfaces
{
    public interface IAttendance
    {
        ResponseModel CheckIn(AttendanceEntryModel model);
        ResponseModel AddAttendanceAsLeave(AttendanceEntryModel model);
        ResponseModel CheckOut(AttendanceEntryModel model);
        ResponseModel SaveCheckPoint(UserMovementLogModel model);
        List<AttendanceModel> GetAttendanceFeed(int companyId,DateTime date);
        List<AttendanceModel> GetAttendance(int companyId, DateTime startDate, DateTime endDate);
        List<AttendanceModel> GetAttendance(string userId, int companyId, DateTime startDate, DateTime endDate);
        List<UserMovementLogModel> GetMovementDetails(string userId, DateTime date);
        AttendanceModel GetMyTodayAttendance(string userId, DateTime date);

    }
}
