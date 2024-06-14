import { Box, useToast } from "@chakra-ui/react";
import { UploadUserDocuments } from "./UploadUserDocuments";
import { useMutation, useQuery } from "react-query";
import { getSettingsData, postDoc } from "../../../api/Settings";

export const Documents = () => {
  const toast = useToast();

  const documentsQuery = useQuery(['getSettingsData', 'documents'], () => getSettingsData({ documents: true }))
  const documentsData = documentsQuery?.data?.data?.data;
  const documentDetail = documentsData?.[0];

  const toDateFormat = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };


  const { mutate, isLoading } = useMutation(postDoc,
    {
      onSuccess: (res) => {
        documentsQuery.refetch()
      },
      onError: (err) => {
        return toast({
          description: `${err?.response?.data?.message || "please check your network connection"}`,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      },
    }
  );

  const handleDocument = (data) => {
    mutate({
      document_update: true,
      document: data.map((item) => item.replace("data:", "").replace(/^.+,/, "")),
      // document_type: "International Passport",
      // id_number: "3456789",
      // exp_date: "4567",
    });
  };

  return (
    <UploadUserDocuments
      noNeedForType
      displayText={
        documentsQuery?.isLoading ? 'Loading...' : isLoading ? 'Uploading...' : documentDetail ? `Uploaded: ${toDateFormat(documentDetail?.created_at)}` : 'Choose file to upload'
      }
      handleDocument={handleDocument}
    />
  );
};
export default Documents;
