import { httpService } from "@/services/httpService/http.service";
import { AxiosResponse } from "axios";

interface SendEmailResponse {
  status: number;
  message: string;
}

export const ContactService = {
  sendEmail: async (
    data: Record<string, string>,
  ): Promise<AxiosResponse<SendEmailResponse>> => {
    const response = await httpService.post("/api/contact", data);

    return response;
  },
};
