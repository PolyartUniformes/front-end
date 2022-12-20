import { post } from "../../../../../../services/api";
import { uploadFile } from "../../lista/functions/handleUpload";

async function handleCreation(element: any, file: File | null | undefined) {
  console.log(element);

  if (!element.sub_code) {
    return alert("Campos com * são obrigatórios!");
  }

  let image = await uploadFile(file);

  if (image.error) {
    return alert(image.message);
  }

  const path = image.path;

  const response = await post("ordem-de-corte/create/", { element, path });

  return alert(await response.json());
}

export { handleCreation };
