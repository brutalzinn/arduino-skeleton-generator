import { promises as fs } from 'fs';
import path from 'path';
import { ConfigText } from './interfaces';
export async function ReadData(filename : string) : Promise<string> {
    const fileContents = await fs.readFile(filename, 'utf8');
    return fileContents
}
export function WriteData(configText: ConfigText) : string{
  let text = configText.text
  for (let item of configText.keyConfigs){
    text = text.replaceAll("["+ item.name +"]", item.value);
  }
  return text
}