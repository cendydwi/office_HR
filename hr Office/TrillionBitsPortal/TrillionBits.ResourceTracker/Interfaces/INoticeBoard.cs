using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TrillionBitsPortal.ResourceTracker.Models;

namespace TrillionBitsPortal.ResourceTracker.Interfaces
{
    public interface INoticeBoard
    {
        List<NoticeBoard> GetNoticeBoardByCompanyId(int companyId);
        
        NoticeBoard GetNoticeBoardById(string noticeId);
        NoticeDepartmentVIewModel CreateNoticeBoard(NoticeDepartmentVIewModel model);
    }
}
