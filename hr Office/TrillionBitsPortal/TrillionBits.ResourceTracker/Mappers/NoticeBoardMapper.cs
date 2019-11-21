using TrillionBitsPortal.Common;
using System;
using System.Collections.Generic;
using System.Data.Common;
using TrillionBitsPortal.ResourceTracker.Models;

namespace TrillionBitsPortal.ResourceTracker.Mappers
{
    public static class NoticeBoardMapper
    {
        public static List<NoticeBoard> ToNoticeBoardModel( DbDataReader readers )
        {
            if ( readers==null )
                return null;
            var models = new List<NoticeBoard>();
            while ( readers.Read() )
            {
                var model = new NoticeBoard
                {
                    Id=Convert.ToString( readers["Id"] ) ,
                    Details=Convert.IsDBNull( readers["Details"] ) ? string.Empty : Convert.ToString( readers["Details"] ) ,
                    PostingDate=Convert.IsDBNull( readers["PostingDate"] ) ? string.Empty : Convert.ToDateTime( readers["PostingDate"] ).ToString() ,
                    ImageFileName=Convert.IsDBNull( readers["ImageFileName"] ) ? string.Empty : Convert.ToString( readers["ImageFileName"] ) ,
                    CreatedBy=Convert.IsDBNull( readers["CreatedBy"] ) ? string.Empty : Convert.ToString( readers["CreatedBy"] ) ,
                    CreateDate=Convert.IsDBNull( readers["CreateDate"] ) ? string.Empty : Convert.ToDateTime( readers["CreateDate"] ).ToString(Constants.DateLongFormat) ,
                };
                models.Add( model );
            }
            return models;
        }

    }
}
