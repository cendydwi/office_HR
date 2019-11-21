using System.IO;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System.Configuration;
using System;
using TrillionBitsPortal.Common;

namespace TrillionBitsPortal.Web.AzureService
{
    public class AzureStorageService : IFileStorageService
    {
       
        //http://www.c-sharpcorner.com/article/upload-download-and-delete-blob-files-in-azure-storage/
        public void Upload(Stream stream, string blobName, AzureStorageContainerType type)
        {
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(ConfigurationManager.AppSettings[Constants.AzureBlobConnectionName]);


            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
            CloudBlobContainer container = blobClient.GetContainerReference(type.ToString());
            CloudBlockBlob blockBlob = container.GetBlockBlobReference(blobName);

            switch (Path.GetExtension(blobName))
            {
                case ".doc":
                    blockBlob.Properties.ContentType = "application/msword";
                    break;
                case ".docx":
                    blockBlob.Properties.ContentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
                    break;
                case ".xls":
                    blockBlob.Properties.ContentType = "application/vnd.ms-excel";
                    break;
                case ".xlsx":
                    blockBlob.Properties.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                    break;
                case ".ppt":
                    blockBlob.Properties.ContentType = "application/vnd.ms-powerpoint";
                    break;
                case ".pptx":
                    blockBlob.Properties.ContentType = "application/vnd.openxmlformats-officedocument.presentationml.presentation";
                    break;

                case ".pdf":
                    blockBlob.Properties.ContentType = "application/pdf";
                    break;
                case ".png":
                    blockBlob.Properties.ContentType = "image/png";
                    break;
                case ".jpg":
                case ".jpeg":
                    blockBlob.Properties.ContentType = "image/jpg";
                    break;
                case ".mp4":
                    blockBlob.Properties.ContentType = "video/mp4";
                    break;
            }

            blockBlob.UploadFromStream(stream);
        }

        public void Delete(string blobName, AzureStorageContainerType type)
        {
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(ConfigurationManager.AppSettings[Constants.AzureBlobConnectionName]);
            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
            CloudBlobContainer container = blobClient.GetContainerReference(type.ToString());
            CloudBlockBlob blockBlob = container.GetBlockBlobReference(blobName);
            blockBlob.Delete();
        }

        public bool BlobExistsOnCloud(AzureStorageContainerType type, string blobName)
        {
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(ConfigurationManager.AppSettings[Constants.AzureBlobConnectionName]);
            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
            return blobClient.GetContainerReference(type.ToString()).GetBlockBlobReference(blobName).Exists();
        }

    }
}