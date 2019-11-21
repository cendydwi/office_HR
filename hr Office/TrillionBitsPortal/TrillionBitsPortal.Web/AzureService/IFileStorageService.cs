using TrillionBitsPortal.Common;
using System.IO;

namespace TrillionBitsPortal.Web.AzureService
{
    public interface IFileStorageService
    {
        void Upload(Stream stream, string blobName, AzureStorageContainerType type);
        void Delete(string blobName, AzureStorageContainerType type);
        bool BlobExistsOnCloud(AzureStorageContainerType type, string blobName);
    }
}
