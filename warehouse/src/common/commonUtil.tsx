import axios from "axios";
import constantsUtils from "./constantsUtil";
const noImageFound = require("../assets/images/No-image-found.jpg");
export default class commonUtil {
  public static convertModelToFormData(
    model: any,
    form?: FormData,
    namespace = ""
  ): FormData {
    let formData = form || new FormData();
    let formKey;

    for (let propertyName in model) {
      if (!model.hasOwnProperty(propertyName) || !model[propertyName]) continue;
      let formKey = namespace ? `${namespace}[${propertyName}]` : propertyName;
      if (model[propertyName] instanceof Date)
        formData.append(formKey, model[propertyName].toISOString());
      else if (model[propertyName] instanceof Array) {
        model[propertyName].forEach((element: any, index: number) => {
          const tempFormKey = `${formKey}[${index}]`;
          this.convertModelToFormData(element, formData, tempFormKey);
        });
      } else if (
        typeof model[propertyName] === "object" &&
        !(model[propertyName] instanceof File)
      )
        this.convertModelToFormData(model[propertyName], formData, formKey);
      else formData.append(formKey, model[propertyName].toString());
    }
    return formData;
  }
  public static getPreviewOrDefaultImage(imageUrl: string) {
    if (imageUrl) {
      let pre = constantsUtils.fileUrl + imageUrl;
      return pre;
    } else {
      return noImageFound;
    }
  }
}
export function handleError(err: any) {
  // check if error is an axios error
  if (axios.isAxiosError(err)) {
    // console.log(err.response?.data)
    if (!err?.response) {
      alert("No Server Response");
    } else if (err.response?.status === 400) {
      alert("Missing Username or Password");
    } else if (err.response?.status === 401) {
      alert("Unauthorized");
    } else {
      alert("An error occured.");
    }
    console.error(err);
  }
}
