/**
 Render the ejs templates, used while sending emails
 */
import path from "path";
import fs from "fs";
import ejs from "ejs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const viewsFolderPath = "../../view";

export function renderTemplate(templateName: string, data: object): string {
  const templatePath = path.resolve(
    __dirname,
    viewsFolderPath,
    `${templateName}.ejs`
  );

  const template = fs.readFileSync(templatePath, "utf-8");

  return ejs.render(template, data);
}
